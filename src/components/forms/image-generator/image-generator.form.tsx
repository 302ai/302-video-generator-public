"use client";

import { useEffect, useState } from "react";

import { useAtomValue } from "jotai";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { ImageModelSelect } from "@/components/business/image-generator/image-model-select";
import { LdrsLoader } from "@/components/business/ldrs-loader";
import FormGenerator from "@/components/common/form-generator";
import { LoaderRenderer } from "@/components/common/loader-renderer";
import { Button } from "@/components/ui/button";
import { IMAGE_MODEL_LIST } from "@/constants/image-models";
import { useImageGeneratorForm } from "@/hooks/image-generator/image-generator.hook";
import { useCreateImageTask } from "@/hooks/image-generator/use-image-task-polling";
import {
  imageGeneratorFormAtom,
  isImageGeneratorFormValidAtom,
} from "@/stores/slices/image-generator.store";
import { createScopedLogger } from "@/utils";

const logger = createScopedLogger("ImageGeneratorForm");

export function ImageGeneratorForm() {
  const t = useTranslations();
  const { register, setValue, watch, errors } = useImageGeneratorForm();

  const createTask = useCreateImageTask();

  const imageGeneratorForm = useAtomValue(imageGeneratorFormAtom);

  // Get form validation state
  const isFormValid = useAtomValue(isImageGeneratorFormValidAtom);

  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const handleGenerateImage = async () => {
    if (!isFormValid) {
      logger.warn("表单验证失败或未找到表单数据");
      return;
    }

    try {
      logger.debug("开始创建视频任务", {
        modelId: imageGeneratorForm.model,
        formData: imageGeneratorForm,
      });
      toast.info(t("toast.video_task_creating"));

      setIsGeneratingImage(true);

      await createTask.mutateAsync({
        model: imageGeneratorForm.model!,
        params: imageGeneratorForm,
      });

      logger.info("视频任务创建成功", { modelId: imageGeneratorForm.model });
      toast.success(t("toast.video_task_created_successfully"));
    } catch (error) {
      logger.error("视频任务创建失败", error);
      toast.error(t("toast.video_task_created_failed"));
    } finally {
      setIsGeneratingImage(false);
    }
  };

  useEffect(() => {
    setValue("model", IMAGE_MODEL_LIST[0].id);
    setValue("aspect_ratio", "1:1");
  }, []);

  return (
    <div className="flex flex-col gap-y-6">
      <form className="flex flex-col gap-y-6">
        <FormGenerator
          key="prompt"
          id="prompt"
          name="prompt"
          inputType="textarea"
          label={t("image_generator_prompt")}
          placeholder={t("image_generator_prompt_placeholder")}
          textareaConfig={{
            wrapperClassName: "h-[200px]",
          }}
          watch={watch}
          register={register}
          setValue={setValue}
          errors={errors}
        />

        <ImageModelSelect
          value={imageGeneratorForm.model!}
          onChange={(value) => setValue("model", value)}
          placeholder={t("image_generator_model_placeholder")}
        />

        <FormGenerator
          key="aspect_ratio"
          id="aspect_ratio"
          name="aspect_ratio"
          inputType="select"
          label={t("image_generator_aspect_ratio")}
          placeholder={t("image_generator_aspect_ratio_placeholder")}
          options={[
            { value: "1:1", label: "1:1", id: "1:1" },
            { value: "16:9", label: "16:9", id: "16:9" },
            { value: "9:16", label: "9:16", id: "9:16" },
            { value: "4:3", label: "4:3", id: "4:3" },
            { value: "3:4", label: "3:4", id: "3:4" },
          ]}
          watch={watch}
          register={register}
          setValue={setValue}
          errors={errors}
        />
      </form>

      <Button
        className="w-full"
        onClick={handleGenerateImage}
        disabled={!isFormValid || isGeneratingImage}
      >
        <LoaderRenderer
          status={
            isGeneratingImage
              ? "generating_image"
              : isFormValid
                ? "ready"
                : "not_ready"
          }
          statuses={{
            ready: { icon: null, text: t("btn.ready_to_generate") },
            not_ready: { icon: null, text: t("btn.ready_to_generate") },
            generating_image: {
              icon: <LdrsLoader type="ring" size={12} speed={2} />,
              text: t("btn.generating_image"),
            },
          }}
        />
      </Button>
    </div>
  );
}
