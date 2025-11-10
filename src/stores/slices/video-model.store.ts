import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

import type { VideoModelSchemaResponseType } from "@/services/video-model/video-model.schema";
import { getVideoModels } from "@/services/video-model/video-models.api";

import { uiStoreAtom, updateVideoModelAtom } from "./ui.store";

const STORAGE_KEY = "VIDEO_MODELS";

// Video models list state - persisted in localStorage
export const videoModelsAtom =
  atomWithStorage<VideoModelSchemaResponseType | null>(
    STORAGE_KEY,
    null,
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

// Loading state
export const videoModelsLoadingAtom = atom<boolean>(false);

// Error state
export const videoModelsErrorAtom = atom<Error | null>(null);

// Async atom for fetching video models
export const fetchVideoModelsAtom = atom(null, async (get, set) => {
  set(videoModelsLoadingAtom, true);
  set(videoModelsErrorAtom, null);

  try {
    const data = await getVideoModels();
    set(videoModelsAtom, data);
    const uiStore = get(uiStoreAtom);
    const t2vDefaultModel = data.models.filter(
      (model) => model.capabilities["t2v"]
    )[0];
    const i2vDefaultModel = data.models.filter(
      (model) => model.capabilities["i2v"]
    )[0];
    if (uiStore.t2vVideoModel === "") {
      set(updateVideoModelAtom, {
        type: "t2v",
        value: t2vDefaultModel.model_name,
      });
    }
    if (uiStore.i2vVideoModel === "") {
      set(updateVideoModelAtom, {
        type: "i2v",
        value: i2vDefaultModel.model_name,
      });
    }

    return data;
  } catch (error) {
    const err =
      error instanceof Error
        ? error
        : new Error("Failed to fetch video models");
    set(videoModelsErrorAtom, err);
    throw err;
  } finally {
    set(videoModelsLoadingAtom, false);
  }
});

// Selector atom for getting all models
export const allVideoModelsAtom = atom((get) => {
  const data = get(videoModelsAtom);
  return data?.models ?? [];
});

// Selector atom for getting total models count
export const videoModelsTotalAtom = atom((get) => {
  const data = get(videoModelsAtom);
  return data?.total ?? 0;
});

// Selector atom for getting a specific model by name
export const getVideoModelByNameAtom = atom((get) => (modelName: string) => {
  const models = get(allVideoModelsAtom);
  return models.find((model) => model.model_name === modelName);
});

// Selector atom for getting models by provider
export const getVideoModelsByProviderAtom = atom(
  (get) => (provider: string) => {
    const models = get(allVideoModelsAtom);
    return models.filter((model) => model.provider === provider);
  }
);

// Selector atom for getting models by capability
export const getVideoModelsByCapabilityAtom = atom(
  (get) => (capability: "t2v" | "i2v" | "v2v") => {
    const models = get(allVideoModelsAtom);
    return models.filter((model) => model.capabilities[capability]);
  }
);

// Clear stored data
export const clearVideoModelsAtom = atom(null, async (get, set) => {
  set(videoModelsAtom, null);
  set(videoModelsErrorAtom, null);
});
