import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

import type { VideoGeneratorSchemaType } from "@/services/video-generator/video-generator.schema";

import { uiStoreAtom } from "./ui.store";

const STORAGE_KEY = "VIDEO_GENERATOR_FORM";

// Default form values
const DEFAULT_FORM_VALUES: Partial<VideoGeneratorSchemaType> = {
  model: "",
  prompt: "",
  image1: undefined,
  image2: undefined,
  image3: undefined,
  image4: undefined,
  end_image: undefined,
  video: undefined,
  negative_prompt: undefined,
  duration: undefined,
  resolution: undefined,
  aspect_ratio: undefined,
  fps: undefined,
  mode: undefined,
  effect_scene: undefined,
  quality: undefined,
  with_audio: true,
  enable_audio: true,
  size: undefined,
  pikaffect: undefined,
  motion_model: undefined,
  sound_effect_switch: undefined,
  lip_sync_tts_speaker_id: undefined,
  lip_sync_tts_content: undefined,
  generate_audio: undefined,
  prompt_optimizer: true,
  enable_prompt_expansion: true,
  prompt_enhancer: true,
  prompt_extension: true,
  style: undefined,
  template: undefined,
  motions: undefined,
  slug: undefined,
  motion: undefined,
  bgm: true,
};

// Video generator form state - persisted in localStorage
export const videoGeneratorFormAtom = atomWithStorage<
  Partial<VideoGeneratorSchemaType>
>(
  STORAGE_KEY,
  DEFAULT_FORM_VALUES,
  createJSONStorage(() =>
    typeof window !== "undefined"
      ? localStorage
      : {
          getItem: () => null,
          setItem: () => null,
          removeItem: () => null,
        }
  ),
  {
    getOnInit: true,
  }
);

// Atom for updating a single field
export const updateVideoGeneratorFieldAtom = atom(
  null,
  (
    get,
    set,
    payload: { key: keyof VideoGeneratorSchemaType; value: unknown }
  ) => {
    const currentForm = get(videoGeneratorFormAtom);
    set(videoGeneratorFormAtom, {
      ...currentForm,
      [payload.key]: payload.value,
    });
  }
);

// Atom for updating multiple fields at once
export const updateVideoGeneratorFormAtom = atom(
  null,
  (get, set, payload: Partial<VideoGeneratorSchemaType>) => {
    const currentForm = get(videoGeneratorFormAtom);
    set(videoGeneratorFormAtom, {
      ...currentForm,
      ...payload,
    });
  }
);

// Atom for resetting form to default values (except model, prompt, image1-4, and end_image)
export const resetVideoGeneratorFormAtom = atom(null, (get, set) => {
  const currentForm = get(videoGeneratorFormAtom);
  set(videoGeneratorFormAtom, {
    ...DEFAULT_FORM_VALUES,
    model: currentForm.model,
    prompt: currentForm.prompt,
    image1: currentForm.image1,
    image2: currentForm.image2,
    image3: currentForm.image3,
    image4: currentForm.image4,
    end_image: currentForm.end_image,
  });
});

// Atom for resetting specific field to default value
export const resetVideoGeneratorFieldAtom = atom(
  null,
  (get, set, key: keyof VideoGeneratorSchemaType) => {
    const currentForm = get(videoGeneratorFormAtom);
    set(videoGeneratorFormAtom, {
      ...currentForm,
      [key]: DEFAULT_FORM_VALUES[key],
    });
  }
);

// Selector atom for checking if form has been modified from defaults
export const isVideoGeneratorFormModifiedAtom = atom((get) => {
  const form = get(videoGeneratorFormAtom);
  return JSON.stringify(form) !== JSON.stringify(DEFAULT_FORM_VALUES);
});

// Selector atom for getting specific field value
export const getVideoGeneratorFieldAtom = atom(
  (get) => (key: keyof VideoGeneratorSchemaType) => {
    const form = get(videoGeneratorFormAtom);
    return form[key];
  }
);

// Atom for clearing form
export const clearVideoGeneratorFormAtom = atom(null, (get, set) => {
  set(videoGeneratorFormAtom, {});
});

// Selector atom for checking if required fields are filled
export const isVideoGeneratorFormValidAtom = atom<boolean>((get) => {
  const form = get(videoGeneratorFormAtom);
  const currentGeneratorType = get(uiStoreAtom).activeTab;

  // model and prompt are required
  return currentGeneratorType === "t2v"
    ? !!(form.model && form.prompt)
    : !!(form.model && form.prompt && form.image1);
});

// Selector atom for getting form state summary
export const videoGeneratorFormSummaryAtom = atom((get) => {
  const form = get(videoGeneratorFormAtom);
  const isModified = get(isVideoGeneratorFormModifiedAtom);
  const isValid = get(isVideoGeneratorFormValidAtom);

  return {
    form,
    isModified,
    isValid,
    fieldsCount: Object.keys(form).length,
    filledFieldsCount: Object.values(form).filter(
      (v) => v !== undefined && v !== null && v !== ""
    ).length,
  };
});
