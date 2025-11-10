import { createStore } from "jotai";

export * from "./slices/config_store";
export * from "./slices/language_store";
export * from "./slices/video-model.store";
export * from "./slices/video-generator.store";
export const store = createStore();
