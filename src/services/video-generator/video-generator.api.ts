import { isUndefined } from "es-toolkit";

import { apiKy } from "@/api";

import {
  VideoGeneratorFetchResponseType,
  VideoGeneratorSchemaResponseType,
  VideoGeneratorSchemaType,
} from "./video-generator.schema";

export const VIDEO_GENERATOR_API_URL = "302/v2/video/create";

export async function createVideoGeneratorJob(
  params: Partial<VideoGeneratorSchemaType>
) {
  const { model, image1, image2, image3, image4, ...restParams } = params;

  const _params = {
    ...restParams,
    model,
    image: [image1, image2, image3, image4].filter(
      (image) => !isUndefined(image) && image !== ""
    ),
    sound_effect_switch: params.sound_effect_switch ? 1 : 0,
  };

  // For Midjourney models, remove motions
  if (!model?.startsWith("higgsfield")) {
    delete _params.motions;
  }

  const response = await apiKy.post(VIDEO_GENERATOR_API_URL, {
    json: _params,
  });

  return response.json<VideoGeneratorSchemaResponseType>();
}

export const VIDEO_GENERATOR_FETCH_API_URL = "302/v2/video/fetch/{task_id}";

export async function fetchVideoGeneratorJobStatus(
  taskId: string
): Promise<VideoGeneratorFetchResponseType> {
  try {
    const response = await apiKy.get(
      VIDEO_GENERATOR_FETCH_API_URL.replace("{task_id}", taskId)
    );
    return response.json<VideoGeneratorFetchResponseType>();
  } catch (error) {
    console.error("获取任务状态失败", error);
    return {
      video_url: "",
      model: "",
      attempts: 0,
      execution_time: "",
      status: "failed",
      task_id: taskId,
      created_at: "",
      completed_at: "",
      updated_at: "",
      mode: "",
    };
  }
}
