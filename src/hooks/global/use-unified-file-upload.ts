import { useCallback, useReducer, useRef } from "react";

import { env } from "@/env";
import { appConfigAtom, languageAtom, store } from "@/stores";
import { langToCountry } from "@/utils/302";

interface FileValidationResult {
  isValid: boolean;
  error?: {
    code: string;
    message: string;
  };
}

interface FileValidationConfig {
  maxFileSize?: number;
  acceptedTypes?: Record<string, string[]>;
  maxFiles?: number;
  customValidators?: Array<(file: File) => Promise<FileValidationResult>>;
}

interface UploadResponse {
  code: number;
  data: string;
  message: string;
}

interface UploadConfig {
  endpoint?: string;
  retryConfig?: {
    maxRetries?: number;
    retryDelay?: number;
  };
}

interface UseUnifiedFileUploadOptions {
  onFileSelect?: (file: File[]) => void;
  onUploadStart?: (file: File[]) => void;
  onUploadProgress?: (progress: number) => void;
  onFileProgress?: (filename: string, progress: number) => void;
  onUploadSuccess?: (data: any) => void;
  onUploadError?: (error: any) => void;
  onUploadComplete?: () => void;
  autoUpload?: boolean;
  validationConfig?: FileValidationConfig;
  uploadConfig?: UploadConfig;
}

interface UploadFile {
  url: string;
  type: string;
  name: string;
  size: number;
  base64: string;
  metadata?: Record<string, unknown>;
}

type UploadState = {
  selectedFiles: File[];
  uploadedFiles: UploadFile[];
  fileProgresses: Record<string, number>;
  isUploading: boolean;
  isComplete: boolean;
  error: string | null;
  retryQueue: File[];
};

type UploadAction =
  | { type: "SELECT_FILES"; payload: File[] }
  | { type: "SET_PROGRESS"; payload: { fileName: string; progress: number } }
  | { type: "UPLOAD_START" }
  | { type: "UPLOAD_SUCCESS"; payload: UploadFile[] }
  | { type: "UPLOAD_ERROR"; payload: string }
  | { type: "UPLOAD_COMPLETE" }
  | { type: "REMOVE_FILE"; payload: number }
  | { type: "RESET" }
  | { type: "ADD_TO_RETRY_QUEUE"; payload: File }
  | { type: "REMOVE_FROM_RETRY_QUEUE"; payload: File };

const initialState: UploadState = {
  selectedFiles: [],
  uploadedFiles: [],
  fileProgresses: {},
  isUploading: false,
  isComplete: false,
  error: null,
  retryQueue: [],
};

function uploadReducer(state: UploadState, action: UploadAction): UploadState {
  switch (action.type) {
    case "SELECT_FILES":
      return {
        ...state,
        selectedFiles: [...state.selectedFiles, ...action.payload],
        error: null,
      };
    case "SET_PROGRESS":
      return {
        ...state,
        fileProgresses: {
          ...state.fileProgresses,
          [action.payload.fileName]: action.payload.progress,
        },
      };
    case "UPLOAD_START":
      return {
        ...state,
        isUploading: true,
        error: null,
        fileProgresses: {},
      };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        uploadedFiles: [...state.uploadedFiles, ...action.payload],
        isComplete: true,
      };
    case "UPLOAD_ERROR":
      return {
        ...state,
        error: action.payload,
        isUploading: false,
      };
    case "UPLOAD_COMPLETE":
      return {
        ...state,
        isUploading: false,
      };
    case "REMOVE_FILE":
      return {
        ...state,
        selectedFiles: state.selectedFiles.filter(
          (_, i) => i !== action.payload
        ),
        fileProgresses: Object.fromEntries(
          Object.entries(state.fileProgresses).filter(
            ([name]) => name !== state.selectedFiles[action.payload].name
          )
        ),
      };
    case "RESET":
      return initialState;
    case "ADD_TO_RETRY_QUEUE":
      return {
        ...state,
        retryQueue: [...state.retryQueue, action.payload],
      };
    case "REMOVE_FROM_RETRY_QUEUE":
      return {
        ...state,
        retryQueue: state.retryQueue.filter((file) => file !== action.payload),
      };
    default:
      return state;
  }
}

export function useUnifiedFileUpload({
  onFileSelect,
  onUploadStart,
  onUploadProgress,
  onFileProgress,
  onUploadSuccess,
  onUploadError,
  onUploadComplete,
  autoUpload,
  validationConfig,
  uploadConfig,
}: UseUnifiedFileUploadOptions = {}) {
  const xhrListRef = useRef<XMLHttpRequest[]>([]);
  const [state, dispatch] = useReducer(uploadReducer, initialState);

  // Validate a single file
  const validateFile = async (file: File) => {
    // Check file size
    if (
      validationConfig?.maxFileSize &&
      file.size > validationConfig.maxFileSize
    ) {
      return {
        isValid: false,
        error: {
          code: "FILE_TOO_LARGE",
          message: `File size exceeds maximum limit of ${validationConfig.maxFileSize} bytes`,
        },
      };
    }

    // Check file type
    if (validationConfig?.acceptedTypes) {
      const fileType = file.type;
      const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";
      let isValidType = false;

      for (const [type, extensions] of Object.entries(
        validationConfig.acceptedTypes
      )) {
        if (fileType.startsWith(type) || extensions.includes(fileExtension)) {
          isValidType = true;
          break;
        }
      }

      if (!isValidType) {
        return {
          isValid: false,
          error: {
            code: "INVALID_FILE_TYPE",
            message: "File type not supported",
          },
        };
      }
    }

    // Run custom validators
    if (validationConfig?.customValidators) {
      for (const validator of validationConfig.customValidators) {
        const result = await validator(file);
        if (!result.isValid) {
          return result;
        }
      }
    }

    return { isValid: true };
  };

  // Calculate total upload progress
  const uploadProgress =
    state.selectedFiles.length > 0
      ? Object.values(state.fileProgresses).reduce(
          (sum, progress) => sum + progress,
          0
        ) / state.selectedFiles.length
      : 0;

  const uploadFile = async (file: File): Promise<UploadFile> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result as string;

        const xhr = new XMLHttpRequest();
        xhrListRef.current.push(xhr);

        const formData = new FormData();
        formData.append("file", file);

        const { apiKey } = store.get(appConfigAtom);
        const uiLanguage = store.get(languageAtom);

        // Track upload progress
        xhr.upload.addEventListener("progress", (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded * 100) / event.total);
            dispatch({
              type: "SET_PROGRESS",
              payload: { fileName: file.name, progress },
            });
            onFileProgress?.(file.name, progress);
            onUploadProgress?.(uploadProgress);
          }
        });

        // Handle successful upload
        xhr.addEventListener("load", () => {
          if (xhr.status === 200) {
            try {
              const response = JSON.parse(xhr.responseText) as UploadResponse;
              if (response.code !== 200) {
                reject(new Error(response.message));
                return;
              }

              const uploadedFile = {
                url: response.data,
                type: file.type.startsWith("image/") ? "image" : "file",
                name: file.name,
                size: file.size,
                base64: base64,
              };

              resolve(uploadedFile);
            } catch {
              reject(new Error("Invalid response format"));
            }
          } else {
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        });

        // Handle upload errors
        xhr.addEventListener("error", () => {
          reject(new Error("Network error occurred"));
        });

        xhr.addEventListener("abort", () => {
          reject(new Error("Upload aborted"));
        });

        xhr.addEventListener("loadend", () => {
          xhrListRef.current = xhrListRef.current.filter((x) => x !== xhr);
        });

        const endpoint =
          uploadConfig?.endpoint ||
          `${env.NEXT_PUBLIC_API_URL}/302/upload-file`;
        if (!endpoint) {
          reject(new Error("Upload URL is not configured"));
          return;
        }

        xhr.open("POST", endpoint);

        // 设置请求头
        if (apiKey) {
          xhr.setRequestHeader("Authorization", `Bearer ${apiKey}`);
        }
        if (uiLanguage) {
          xhr.setRequestHeader("Lang", langToCountry(uiLanguage));
        }

        xhr.send(formData);
      };

      reader.onerror = () => {
        reject(new Error("Failed to read file"));
      };
    });
  };

  const upload = async (files: File[]) => {
    dispatch({ type: "UPLOAD_START" });
    onUploadStart?.(files);

    try {
      // Upload files with retry logic
      const uploadedFiles: UploadFile[] = [];
      for (const file of files) {
        let retries = 0;
        const maxRetries = uploadConfig?.retryConfig?.maxRetries ?? 3;
        const retryDelay = uploadConfig?.retryConfig?.retryDelay ?? 1000;

        while (retries < maxRetries) {
          try {
            const uploadedFile = await uploadFile(file);
            uploadedFiles.push(uploadedFile);
            break;
          } catch (error) {
            retries++;
            if (retries >= maxRetries) {
              throw error;
            }
            retries++;
            await new Promise((resolve) =>
              setTimeout(resolve, retryDelay * retries)
            );
          }
        }
      }

      dispatch({ type: "UPLOAD_SUCCESS", payload: uploadedFiles });
      onUploadSuccess?.(uploadedFiles);

      return uploadedFiles;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Upload failed");
      dispatch({ type: "UPLOAD_ERROR", payload: error.message });
      onUploadError?.(error);
      throw error;
    } finally {
      dispatch({ type: "UPLOAD_COMPLETE" });
      onUploadComplete?.();
    }
  };

  const handleFileSelect = async (files: File | File[]) => {
    try {
      const fileArray = Array.isArray(files) ? files : [files];

      // Check max files limit
      if (
        validationConfig?.maxFiles &&
        fileArray.length > validationConfig.maxFiles
      ) {
        throw new Error(
          `Maximum number of files (${validationConfig.maxFiles}) exceeded`
        );
      }

      // Validate each file
      for (const file of fileArray) {
        const validationResult = await validateFile(file);
        if (!validationResult.isValid) {
          throw new Error(
            validationResult.error?.message || "File validation failed"
          );
        }
      }

      dispatch({ type: "SELECT_FILES", payload: fileArray });
      onFileSelect?.(fileArray);

      if (autoUpload) {
        await upload(fileArray);
      }
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error("File selection failed");
      dispatch({ type: "UPLOAD_ERROR", payload: error.message });
      onUploadError?.(error);
    }
  };

  const abortUpload = useCallback(() => {
    xhrListRef.current.forEach((xhr) => xhr.abort());
    xhrListRef.current = [];
    dispatch({ type: "UPLOAD_ERROR", payload: "Upload cancelled" });
    onUploadError?.(new Error("Upload cancelled"));
  }, [onUploadError]);

  const resetFiles = useCallback(() => {
    dispatch({ type: "RESET" });
    onFileSelect?.([]);
  }, [onFileSelect]);

  const removeFile = useCallback(
    (index: number) => {
      dispatch({ type: "REMOVE_FILE", payload: index });
      onFileSelect?.(state.selectedFiles.filter((_, i) => i !== index));
    },
    [state.selectedFiles, onFileSelect]
  );

  return {
    selectedFiles: state.selectedFiles,
    uploadedFiles: state.uploadedFiles,
    uploadProgress,
    fileProgresses: state.fileProgresses,
    isUploading: state.isUploading,
    isComplete: state.isComplete,
    error: state.error,
    handleFileSelect,
    upload,
    abortUpload,
    resetFiles,
    removeFile,
  };
}
