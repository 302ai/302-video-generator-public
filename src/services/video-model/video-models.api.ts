import { apiKy } from "@/api";

// import { mockModels } from "@/constants/models";

import { type VideoModelSchemaResponseType } from "./video-model.schema";

const VIDEO_MODELS_API_URL = "302/v2/model/video";

export async function getVideoModels(): Promise<VideoModelSchemaResponseType> {
  const response = await apiKy
    .get(VIDEO_MODELS_API_URL)
    .json<VideoModelSchemaResponseType>();
  return filterVideoModel(response, ["vidu-template", "kling-extend"]);

  // return mockModels;
}

const filterVideoModel = (
  modelInfo: VideoModelSchemaResponseType,
  modelNames: string[]
): VideoModelSchemaResponseType => {
  return {
    total: modelInfo.total,
    models: modelInfo.models.filter(
      (model) => !modelNames.includes(model.model_name)
    ),
  };
};
