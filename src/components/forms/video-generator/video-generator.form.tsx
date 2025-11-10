"use client";

import { useAtom, useAtomValue } from "jotai";
import { useTranslations } from "next-intl";
import { match, P } from "ts-pattern";

import { ImageUploader } from "@/components/business/image-uploader/image-uploader";
import { T2VExamples } from "@/components/business/left-panel/t2v-examples";
import FormGenerator from "@/components/common/form-generator";
import { VIDEO_HIGGSFIELD_MOTION_OPTION_MAP } from "@/constants/pixverse-motions";
import { useVideoGeneratorForm } from "@/hooks/video-generator/video-generator.hook";
import type { VideoGeneratorSchemaType } from "@/services/video-generator/video-generator.schema";
import { videoGeneratorFormAtom } from "@/stores";
import { uiStoreAtom } from "@/stores/slices/ui.store";
import { getVideoModelByNameAtom } from "@/stores/slices/video-model.store";

type FormFieldType = keyof VideoGeneratorSchemaType;

/**
 * Model-specific constraints guide:
 *
 * vidu-1.5:
 *   - Duration 8s: Only supports 720p resolution
 *   - Duration 4s: Supports all resolutions (360p, 720p, 1080p)
 *   - Resolution 360p/1080p: Cannot use Duration 8s
 *
 * To add constraints for a new model:
 * 1. Add a new .with() pattern in the duration field match statement
 * 2. Add a new .with() pattern in the resolution field match statement
 * 3. Follow the same structure: { model: "model-name", ... }
 */
export function VideoGeneratorForm() {
  const t = useTranslations();
  const [uiStore] = useAtom(uiStoreAtom);
  const [videoGeneratorFormState] = useAtom(videoGeneratorFormAtom);
  const getModelByName = useAtomValue(getVideoModelByNameAtom);
  const { watch, register, setValue, errors } = useVideoGeneratorForm();

  // Get current model parameters
  const currentModel =
    uiStore.activeTab === "t2v" ? uiStore.t2vVideoModel : uiStore.i2vVideoModel;

  const modelParameters = getModelByName(currentModel)?.parameters || [];

  return (
    <form className="flex flex-col gap-y-6">
      {/* Render all parameters dynamically */}
      {modelParameters.map((param) => {
        const fieldName = param.name as FormFieldType & "image";

        if (uiStore.activeTab === "i2v") {
          if (fieldName === "image") {
            for (let i = 1; i <= param.max_num || i <= 4; i++) {
              const field = `image${i}`;
              const isOnlyOne = i === 1 || i === param.max_num;
              return (
                <ImageUploader
                  label={t(`${isOnlyOne ? "only_image" : field}.label`)}
                  key={field}
                  onUpload={(imageUrl) =>
                    setValue(field as FormFieldType, imageUrl)
                  }
                  uploadedImageUrl={
                    videoGeneratorFormState[
                      field as "image1" | "image2" | "image3" | "image4"
                    ] ?? ""
                  }
                  onRemove={() => setValue(field as FormFieldType, "")}
                />
              );
            }
          }

          // // Handle image field with ImageUploader
          // if (fieldName === "image1") {
          //   return (
          //     <ImageUploader
          //       label={t("image1.label")}
          //       key={fieldName}
          //       onUpload={(imageUrl) => setValue("image1", imageUrl)}
          //       uploadedImageUrl={videoGeneratorFormState.image1 ?? ""}
          //       onRemove={() => setValue("image1", "")}
          //     />
          //   );
          // }

          // if (fieldName === "image2") {
          //   return (
          //     <ImageUploader
          //       label={t("image2.label")}
          //       key={fieldName}
          //       onUpload={(imageUrl) => setValue("image2", imageUrl)}
          //       uploadedImageUrl={videoGeneratorFormState.image2 ?? ""}
          //       onRemove={() => setValue("image2", "")}
          //     />
          //   );
          // }

          // if (fieldName === "image3") {
          //   return (
          //     <ImageUploader
          //       label={t("image3.label")}
          //       key={fieldName}
          //       onUpload={(imageUrl) => setValue("image3", imageUrl)}
          //       uploadedImageUrl={videoGeneratorFormState.image3 ?? ""}
          //       onRemove={() => setValue("image3", "")}
          //     />
          //   );
          // }

          // if (fieldName === "image4") {
          //   return (
          //     <ImageUploader
          //       label={t("image4.label")}
          //       key={fieldName}
          //       onUpload={(imageUrl) => setValue("image4", imageUrl)}
          //       uploadedImageUrl={videoGeneratorFormState.image4 ?? ""}
          //       onRemove={() => setValue("image4", "")}
          //     />
          //   );
          // }

          if (fieldName === "end_image") {
            return (
              <ImageUploader
                key={fieldName}
                label={t("end_image.placeholder")}
                onUpload={(imageUrl) => setValue("end_image", imageUrl)}
                uploadedImageUrl={videoGeneratorFormState.end_image ?? ""}
                onRemove={() => setValue("end_image", "")}
              />
            );
          }
        }

        if (fieldName === "prompt") {
          return (
            <div className="space-y-3" key={fieldName}>
              <FormGenerator
                key={fieldName}
                id={fieldName}
                name={fieldName}
                inputType="textarea"
                label={t("prompt.label")}
                placeholder={t("prompt.placeholder")}
                textareaConfig={{
                  wrapperClassName: "h-[200px]",
                }}
                watch={watch}
                register={register}
                setValue={setValue}
                errors={errors}
              />
              {uiStore.activeTab === "t2v" && <T2VExamples />}
            </div>
          );
        }

        if (fieldName === "negative_prompt") {
          return (
            <FormGenerator
              key={fieldName}
              id={fieldName}
              name={fieldName}
              inputType="textarea"
              label={t("negative_prompt.label")}
              placeholder={t("negative_prompt.placeholder")}
              textareaConfig={{
                wrapperClassName: "h-[200px]",
              }}
              watch={watch}
              register={register}
              setValue={setValue}
              errors={errors}
            />
          );
        }

        if (fieldName === "lip_sync_tts_content") {
          return (
            <FormGenerator
              key={fieldName}
              id={fieldName}
              name={fieldName}
              inputType="textarea"
              label={t("lip_sync_tts_content.label")}
              placeholder={t("lip_sync_tts_content.placeholder")}
              textareaConfig={{
                wrapperClassName: "h-[200px]",
              }}
              watch={watch}
              register={register}
              setValue={setValue}
              errors={errors}
            />
          );
        }

        if (fieldName === "duration") {
          let durationOptions = param.range?.list?.options?.map((option) => ({
            value: `${option}`,
            label: `${option}`,
            id: `${option}`,
            disabled: false,
          }));

          const currentResolution = String(watch("resolution"));

          // Apply model-specific constraints
          durationOptions = match({
            model: currentModel,
            resolution: currentResolution,
          })
            .with(
              {
                model: "vidu-1.5",
                resolution: P.when((res) => res === "360p" || res === "1080p"),
              },
              () =>
                durationOptions?.map((opt) => ({
                  ...opt,
                  disabled: opt.value === "8",
                })) || durationOptions
            )
            .with(
              {
                model: "vidu-2.0",
                resolution: P.when((res) => res === "360p" || res === "1080p"),
              },
              () =>
                durationOptions?.map((opt) => ({
                  ...opt,
                  disabled: opt.value === "8",
                })) || durationOptions
            )
            .otherwise(() => durationOptions);

          return (
            <FormGenerator
              key={fieldName}
              id={fieldName}
              name={fieldName}
              inputType="select"
              label={t("duration.label")}
              placeholder={t("duration.placeholder")}
              options={durationOptions}
              watch={watch}
              defaultValue={durationOptions?.[0]?.value}
              register={register}
              setValue={setValue}
              errors={errors}
            />
          );
        }

        if (fieldName === "resolution") {
          // Base resolution options from model parameters
          let resolutionOptions = param.range?.list?.options?.map((option) => ({
            value: `${option}`,
            label: `${option}`,
            id: `${option}`,
            disabled: false,
          }));

          const duration = String(watch("duration"));

          // Apply model-specific constraints
          resolutionOptions = match({ model: currentModel, duration })
            .with(
              { model: "vidu-1.5", duration: "8" },
              () =>
                resolutionOptions?.map((opt) => ({
                  ...opt,
                  disabled: opt.value !== "720p",
                })) || resolutionOptions
            )
            .with(
              { model: "vidu-1.5", duration: "4" },
              () =>
                resolutionOptions?.map((opt) => ({
                  ...opt,
                  disabled: false,
                })) || resolutionOptions
            )
            .with(
              { model: "vidu-2.0", duration: "8" },
              () =>
                resolutionOptions?.map((opt) => ({
                  ...opt,
                  disabled: opt.value !== "720p",
                })) || resolutionOptions
            )
            .with(
              { model: "vidu-2.0", duration: "4" },
              () =>
                resolutionOptions?.map((opt) => ({
                  ...opt,
                  disabled: false,
                })) || resolutionOptions
            )
            .otherwise(() => resolutionOptions);

          return (
            <FormGenerator
              key={fieldName}
              id={fieldName}
              name={fieldName}
              inputType="select"
              label={t("resolution.label")}
              placeholder={t("resolution.placeholder")}
              options={resolutionOptions}
              defaultValue={resolutionOptions?.[0]?.value}
              watch={watch}
              register={register}
              setValue={setValue}
              errors={errors}
            />
          );
        }

        if (fieldName === "aspect_ratio") {
          const aspectRatioOptions = param.range?.list?.options?.map(
            (option) => ({
              value: `${option}`,
              label: `${option}`,
              id: `${option}`,
            })
          );
          return (
            <FormGenerator
              key={fieldName}
              id={fieldName}
              name={fieldName}
              inputType="select"
              label={t("aspect_ratio.label")}
              placeholder={t("aspect_ratio.placeholder")}
              options={aspectRatioOptions}
              defaultValue={aspectRatioOptions?.[0]?.value}
              watch={watch}
              register={register}
              setValue={setValue}
              errors={errors}
            />
          );
        }

        if (fieldName === "fps") {
          const fpsOptions = param.range?.list?.options?.map((option) => ({
            value: `${option}`,
            label: `${option}`,
            id: `${option}`,
          }));
          return (
            <FormGenerator
              key={fieldName}
              id={fieldName}
              name={fieldName}
              inputType="select"
              label={t("fps.label")}
              placeholder={t("fps.placeholder")}
              options={fpsOptions}
              defaultValue={fpsOptions?.[0]?.value}
              watch={watch}
              register={register}
              setValue={setValue}
              errors={errors}
            />
          );
        }

        if (fieldName === "mode") {
          const modeOptions = param.range?.list?.options?.map((option) => ({
            value: `${option}`,
            label: `${option}`,
            id: `${option}`,
          }));
          return (
            <FormGenerator
              key={fieldName}
              id={fieldName}
              name={fieldName}
              inputType="select"
              label={t("mode.label")}
              placeholder={t("mode.placeholder")}
              options={modeOptions}
              defaultValue={modeOptions?.[0]?.value}
              watch={watch}
              register={register}
              setValue={setValue}
              errors={errors}
            />
          );
        }

        if (fieldName === "effect_scene") {
          const effectSceneOptions = param.range?.list?.options?.map(
            (option) => ({
              value: `${option}`,
              label: `${option}`,
              id: `${option}`,
            })
          );
          return (
            <FormGenerator
              key={fieldName}
              id={fieldName}
              name={fieldName}
              inputType="select"
              label={t("effect_scene.label")}
              placeholder={t("effect_scene.placeholder")}
              options={effectSceneOptions}
              defaultValue={effectSceneOptions?.[0]?.value}
              watch={watch}
              register={register}
              setValue={setValue}
              errors={errors}
            />
          );
        }

        if (fieldName === "quality") {
          const qualityOptions = param.range?.list?.options?.map((option) => ({
            value: `${option}`,
            label: `${option}`,
            id: `${option}`,
          }));
          return (
            <FormGenerator
              key={fieldName}
              id={fieldName}
              name={fieldName}
              inputType="select"
              label={t("quality.label")}
              placeholder={t("quality.placeholder")}
              options={qualityOptions}
              defaultValue={qualityOptions?.[0]?.value}
              watch={watch}
              register={register}
              setValue={setValue}
              errors={errors}
            />
          );
        }

        if (fieldName === "size") {
          const sizeOptions = param.range?.list?.options?.map((option) => ({
            value: `${option}`,
            label: `${option}`,
            id: `${option}`,
          }));
          return (
            <FormGenerator
              key={fieldName}
              id={fieldName}
              name={fieldName}
              inputType="select"
              label={t("size.label")}
              placeholder={t("size.placeholder")}
              options={sizeOptions}
              defaultValue={sizeOptions?.[0]?.value}
              watch={watch}
              register={register}
              setValue={setValue}
              errors={errors}
            />
          );
        }

        if (fieldName === "pikaffect") {
          const pikaffectOptions = param.range?.list?.options?.map(
            (option) => ({
              value: `${option}`,
              label: `${option}`,
              id: `${option}`,
            })
          );
          return (
            <FormGenerator
              key={fieldName}
              id={fieldName}
              name={fieldName}
              inputType="select"
              label={t("pikaffect.label")}
              placeholder={t("pikaffect.placeholder")}
              options={pikaffectOptions}
              defaultValue={pikaffectOptions?.[0]?.value}
              watch={watch}
              register={register}
              setValue={setValue}
              errors={errors}
            />
          );
        }

        if (fieldName === "motion_model") {
          const motionModelOptions = param.range?.list?.options?.map(
            (option) => ({
              value: `${option}`,
              label: `${option}`,
              id: `${option}`,
            })
          );
          return (
            <FormGenerator
              key={fieldName}
              id={fieldName}
              name={fieldName}
              inputType="select"
              label={t("motion_model.label")}
              placeholder={t("motion_model.placeholder")}
              options={motionModelOptions}
              defaultValue={motionModelOptions?.[0]?.value}
              watch={watch}
              register={register}
              setValue={setValue}
              errors={errors}
            />
          );
        }

        if (fieldName === "lip_sync_tts_speaker_id") {
          const voiceNameMap: Record<string, string> = {
            Auto: "Auto",
            "1": "Emily",
            "2": "James",
            "3": "Isabella",
            "4": "Liam",
            "5": "Chloe",
            "6": "Adrian",
            "7": "Harper",
            "8": "Ava",
            "9": "Sophia",
            "10": "Julia",
            "11": "Mason",
            "12": "Jack",
            "13": "Oliver",
            "14": "Ethan",
          };

          const lipSyncTtsSpeakerIdOptions = param.range?.list?.options?.map(
            (option) => {
              const optionStr = String(option);
              return {
                value: optionStr,
                label: voiceNameMap[optionStr] || optionStr,
                id: optionStr,
              };
            }
          );
          return (
            <FormGenerator
              key={fieldName}
              id={fieldName}
              name={fieldName}
              inputType="select"
              label={t("lip_sync_tts_speaker_id.label")}
              placeholder={t("lip_sync_tts_speaker_id.placeholder")}
              options={lipSyncTtsSpeakerIdOptions}
              defaultValue={lipSyncTtsSpeakerIdOptions?.[0]?.value}
              watch={watch}
              register={register}
              setValue={setValue}
              errors={errors}
            />
          );
        }

        if (fieldName === "style" && uiStore.activeTab === "t2v") {
          const styleOptions = param.range?.list?.options?.map((option) => ({
            value: `${option}`,
            label: `${t(option.toString())}`,
            id: `${option}`,
          }));
          return (
            <FormGenerator
              key={fieldName}
              id={fieldName}
              name={fieldName}
              inputType="select"
              label={t("style.label")}
              placeholder={t("style.placeholder")}
              options={styleOptions}
              defaultValue={styleOptions?.[0]?.value}
              watch={watch}
              register={register}
              setValue={setValue}
              errors={errors}
            />
          );
        }

        if (fieldName === "template") {
          const templateOptions = param.range?.list?.options?.map((option) => ({
            value: `${option}`,
            label: `${option}`,
            id: `${option}`,
          }));
          return (
            <FormGenerator
              key={fieldName}
              id={fieldName}
              name={fieldName}
              inputType="select"
              label={t("template.label")}
              placeholder={t("template.placeholder")}
              options={templateOptions}
              defaultValue={templateOptions?.[0]?.value}
              watch={watch}
              register={register}
              setValue={setValue}
              errors={errors}
            />
          );
        }

        if (fieldName === "motions") {
          const motionsOptions = param.range?.list?.options?.map((option) => ({
            value: `${option}`,
            label: `${t(VIDEO_HIGGSFIELD_MOTION_OPTION_MAP[option].label)}`,
            id: `${option}`,
          }));
          return (
            <FormGenerator
              key={fieldName}
              id={fieldName}
              name={fieldName}
              inputType="select"
              label={t("template.label")}
              placeholder={t("template.placeholder")}
              options={motionsOptions}
              defaultValue={motionsOptions?.[0]?.value}
              watch={watch}
              register={register}
              setValue={setValue}
              errors={errors}
            />
          );
        }

        if (fieldName === "slug") {
          const slugOptions = param.range?.list?.options?.map((option) => ({
            value: `${option}`,
            label: `${option}`,
            id: `${option}`,
          }));
          return (
            <FormGenerator
              key={fieldName}
              id={fieldName}
              name={fieldName}
              inputType="select"
              label={t("template.label")}
              placeholder={t("template.placeholder")}
              options={slugOptions}
              defaultValue={slugOptions?.[0]?.value}
              watch={watch}
              register={register}
              setValue={setValue}
              errors={errors}
            />
          );
        }

        if (fieldName === "motion") {
          const motionOptions = param.range?.list?.options?.map((option) => ({
            value: `${option}`,
            label: `${option}`,
            id: `${option}`,
          }));
          return (
            <FormGenerator
              key={fieldName}
              id={fieldName}
              name={fieldName}
              inputType="select"
              label={t("motion.label")}
              placeholder={t("motion.placeholder")}
              options={motionOptions}
              defaultValue={motionOptions?.[0]?.value}
              watch={watch}
              register={register}
              setValue={setValue}
              errors={errors}
            />
          );
        }

        if (fieldName === "with_audio") {
          return (
            <FormGenerator
              key={fieldName}
              id={fieldName}
              name={fieldName}
              inputType="switch"
              label={t("with_audio.label")}
              watch={watch}
              register={register}
              setValue={setValue}
              errors={errors}
            />
          );
        }

        if (fieldName === "enable_audio") {
          return (
            <FormGenerator
              key={fieldName}
              id={fieldName}
              name={fieldName}
              inputType="switch"
              label={t("enable_audio.label")}
              watch={watch}
              register={register}
              setValue={setValue}
              errors={errors}
            />
          );
        }

        if (fieldName === "prompt_optimizer") {
          return (
            <FormGenerator
              key={fieldName}
              id={fieldName}
              name={fieldName}
              inputType="switch"
              label={t("prompt_optimizer.label")}
              watch={watch}
              register={register}
              setValue={setValue}
              errors={errors}
            />
          );
        }

        if (fieldName === "enable_prompt_expansion") {
          return (
            <FormGenerator
              key={fieldName}
              id={fieldName}
              name={fieldName}
              inputType="switch"
              label={t("prompt_optimizer.label")}
              watch={watch}
              register={register}
              setValue={setValue}
              errors={errors}
            />
          );
        }

        if (fieldName === "prompt_enhancer") {
          return (
            <FormGenerator
              key={fieldName}
              id={fieldName}
              name={fieldName}
              inputType="switch"
              label={t("prompt_optimizer.label")}
              watch={watch}
              register={register}
              setValue={setValue}
              errors={errors}
            />
          );
        }

        if (fieldName === "prompt_extension") {
          return (
            <FormGenerator
              key={fieldName}
              id={fieldName}
              name={fieldName}
              inputType="switch"
              label={t("prompt_optimizer.label")}
              watch={watch}
              register={register}
              setValue={setValue}
              errors={errors}
            />
          );
        }

        if (fieldName === "sound_effect_switch") {
          return (
            <FormGenerator
              key={fieldName}
              id={fieldName}
              name={fieldName}
              inputType="switch"
              label={t("sound_effect_switch.label")}
              watch={watch}
              register={register}
              setValue={setValue}
              errors={errors}
            />
          );
        }

        if (fieldName === "generate_audio") {
          return (
            <FormGenerator
              key={fieldName}
              id={fieldName}
              name={fieldName}
              inputType="switch"
              label={t("enable_audio.label")}
              watch={watch}
              register={register}
              setValue={setValue}
              errors={errors}
            />
          );
        }

        if (fieldName === "bgm") {
          return (
            <FormGenerator
              key={fieldName}
              id={fieldName}
              name={fieldName}
              inputType="switch"
              label={t("bgm.label")}
              watch={watch}
              register={register}
              setValue={setValue}
              errors={errors}
            />
          );
        }
      })}
    </form>
  );
}
