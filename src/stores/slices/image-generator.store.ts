import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

import { ImageGeneratorSchemaType } from "@/services/image-generator/image-generator.schema";

const STORAGE_KEY = "IMAGE_GENERATOR_FORM";

const DEFAULT_FORM_VALUES: Partial<ImageGeneratorSchemaType> = {
  model: "",
  prompt: "",
  height: undefined,
  width: undefined,
  aspect_ratio: undefined,
  negative_prompt: undefined,
  image: undefined,
};

export const imageGeneratorFormAtom = atomWithStorage<
  Partial<ImageGeneratorSchemaType>
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

export const isImageGeneratorFormValidAtom = atom<boolean>((get) => {
  const form = get(imageGeneratorFormAtom);
  return !!(form.model && form.prompt);
});
