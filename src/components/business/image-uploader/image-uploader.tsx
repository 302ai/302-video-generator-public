"use client";

import { useCallback, useEffect, useState } from "react";

import { ImageUp, Loader2, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/global/use-mobile";
import { useUnifiedFileUpload } from "@/hooks/global/use-unified-file-upload";
import { cn, convertToPng } from "@/lib/utils";
import { createScopedLogger } from "@/utils/logger";

import { ImageGenerator } from "../image-generator/image-generator";
import { ImageUploaderDock } from "./image-uploader-dock";

const logger = createScopedLogger("ImageUploader");

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

interface ImageUploaderProps {
  onUpload: (imageUrl: string) => void;
  onRemove: () => void;
  uploadedImageUrl: string;
  label?: string;
  placeholder?: string;
}

export function ImageUploader({
  onUpload,
  onRemove,
  uploadedImageUrl,
  label,
  placeholder,
}: ImageUploaderProps) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const { upload, isUploading } = useUnifiedFileUpload();

  const handleImageUpload = useCallback(
    async (file: File) => {
      if (!file.type.startsWith("image/")) {
        toast.error(t("image_uploader.error.invalid_file_type"));
        logger.error("Invalid file type. Please upload an image file.");
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast.error(t("image_uploader.error.file_too_large"));
        logger.error(
          `File size ${file.size} exceeds limit of ${MAX_FILE_SIZE}`
        );
        return;
      }

      try {
        const fileToUpload =
          file.type !== "image/png" ? await convertToPng(file) : file;
        const [uploadedFile] = await upload([fileToUpload]);
        onUpload(uploadedFile.url);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";

        toast.error(t("image_uploader.error.upload_failed"));
        logger.error("Upload failed:", errorMessage);
      }
    },
    [t, upload, onUpload]
  );

  const handleReupload = useCallback(() => {
    const fileInput = document.querySelector(
      'input[type="file"][accept="image/*"].hidden'
    ) as HTMLInputElement | null;
    if (fileInput) {
      fileInput.click();
    }
  }, []);

  const handlePaste = useCallback(
    (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) {
            handleImageUpload(file);
            break;
          }
        }
      }
    },
    [handleImageUpload]
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleImageUpload(file);
      event.target.value = "";
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) {
      handleImageUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleGenerate = () => {
    setOpen(true);
  };

  const handleImageSelect = (imageUrl: string) => {
    onUpload(imageUrl);
    setOpen(false);
  };

  useEffect(() => {
    document.addEventListener("paste", handlePaste);
    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, [handlePaste]);

  return (
    <>
      <div className="flex flex-col gap-y-2">
        <Label>{label || t("image_uploader.label")}</Label>
        <div
          className={cn(
            "group border-border bg-muted relative flex max-h-[400px] min-h-[300px] items-center justify-center rounded-lg border border-dashed p-2",
            uploadedImageUrl
              ? "border-primary"
              : "hover:border-primary transition-all duration-100"
          )}
        >
          {uploadedImageUrl ? (
            <>
              <img
                className="h-full w-full object-contain"
                src={uploadedImageUrl}
                alt="Image"
              />

              <ImageUploaderDock
                onUpload={handleReupload}
                onGenerate={handleGenerate}
                onRemove={onRemove}
                className={cn(
                  "absolute opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                  isMobile ? "opacity-100" : ""
                )}
              />
            </>
          ) : (
            <>
              {isUploading ? (
                <Loader2 className="text-primary size-8 animate-spin" />
              ) : (
                <div
                  className="relative flex h-full w-full items-center justify-center"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 cursor-pointer opacity-0"
                    title=""
                    multiple={false}
                  />
                  <div className="text-muted-foreground flex flex-col items-center justify-center space-y-2 text-sm">
                    <ImageUp className="size-8" />
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-center">
                        {placeholder || t("image_uploader.placeholder")}
                        <br />
                        {t("image_uploader.or")}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="link"
                    className="text-primary absolute top-[180px] z-10 h-5 cursor-pointer hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleGenerate();
                    }}
                  >
                    <Sparkles className="h-4 w-4" />
                    {t("ai-generate")}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          title=""
          multiple={false}
        />
      </div>

      <ImageGenerator
        open={open}
        onOpenChange={setOpen}
        onImageSelect={handleImageSelect}
      />
    </>
  );
}
