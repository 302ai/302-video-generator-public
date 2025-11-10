import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

import type { ImageGeneratorSchemaType } from "@/services/image-generator/image-generator.schema";
import { imageGeneratorSchema } from "@/services/image-generator/image-generator.schema";
import { imageGeneratorFormAtom } from "@/stores/slices/image-generator.store";
import { createScopedLogger } from "@/utils";

export const logger = createScopedLogger("useImageGeneratorForm");

export function useImageGeneratorForm() {
  const t = useTranslations();

  const [storedFormState, setStoredFormState] = useAtom(imageGeneratorFormAtom);

  const {
    register,
    setValue: setValueForm,
    watch,
    formState: { errors, isValid },
    setError,
  } = useForm<Partial<ImageGeneratorSchemaType>>({
    values: storedFormState as Partial<ImageGeneratorSchemaType>,
    resolver: zodResolver(imageGeneratorSchema.partial()),
    mode: "onChange",
    criteriaMode: "all",
    defaultValues: storedFormState as Partial<ImageGeneratorSchemaType>,
  });

  const validateForm = (formData: Partial<ImageGeneratorSchemaType>) => {
    const validationResult = imageGeneratorSchema.partial().safeParse(formData);

    if (!validationResult.success) {
      const formattedErrors = validationResult.error.issues.map((issue) => ({
        path: issue.path,
        message: issue.message,
      }));

      logger.debug(
        "Formatted validation errors:",
        JSON.stringify(formattedErrors, null, 2)
      );

      // Set errors
      formattedErrors.forEach((error) => {
        const field = error.path[error.path.length - 1];
        if (typeof field === "string") {
          setError(field as keyof ImageGeneratorSchemaType, {
            type: "custom",
            message: t(`errors.${error.path[0].toString()}`),
          });
        }
      });

      // Focus on first error
      if (formattedErrors.length > 0) {
        const firstError = formattedErrors[0];
        const firstErrorField = firstError.path[firstError.path.length - 1];
        if (typeof firstErrorField === "string") {
          const errorElement = document.querySelector(
            `[name="${firstErrorField}"]`
          );
          logger.debug("First error field:", firstErrorField);
          if (errorElement instanceof HTMLElement) {
            errorElement.focus();
          }
        }
      }

      return;
    }
  };

  const setValue = (name: keyof ImageGeneratorSchemaType, value: any) => {
    setValueForm(name, value);
    setStoredFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
    logger.debug(name, value);
  };

  return {
    register,
    setValue,
    watch,
    errors,
    validateForm,
    isValid,
  };
}
