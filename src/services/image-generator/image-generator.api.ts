import isEnglish from "is-english";

import { apiKy } from "@/api";

import {
  ImageGeneratorFetchResponseType,
  ImageGeneratorSchemaResponseType,
  ImageGeneratorSchemaType,
  TranslateSchemaResponseType,
} from "./image-generator.schema";

export const IMAGE_GENERATOR_API_URL = "302/v2/image/generate?run_async=true";

export async function createImageGeneratorJob(
  params: Partial<ImageGeneratorSchemaType>
) {
  const { prompt } = params;
  if (prompt && !isEnglish(prompt)) {
    const translateResponse = await translatePrompt(prompt);
    params.prompt = translateResponse.output;
  }

  const response = await apiKy.post(IMAGE_GENERATOR_API_URL, {
    json: params,
  });

  return response.json<ImageGeneratorSchemaResponseType>();
}

export const IMAGE_GENERATOR_FETCH_API_URL = "302/v2/image/fetch/{task_id}";

export async function fetchImageGeneratorJobStatus(
  taskId: string
): Promise<ImageGeneratorFetchResponseType> {
  try {
    const response = await apiKy.get(
      IMAGE_GENERATOR_FETCH_API_URL.replace("{task_id}", taskId)
    );
    return response.json<ImageGeneratorFetchResponseType>();
  } catch (error) {
    console.error("获取任务状态失败", error);
    return {
      model: "",
      req: {
        model: "",
        prompt: "",
      },
      task_id: taskId,
      status: "failed",
      created_at: "",
      execution_time: "",
      task_type: "image",
      webhook: "",
    };
  }
}

export const TRANSLATE_API_URL = "v1/chat/completions";

export async function translatePrompt(
  prompt: string
): Promise<TranslateSchemaResponseType> {
  try {
    const response = await apiKy.post(TRANSLATE_API_URL, {
      json: {
        model: "deepl-en",
        message: prompt,
      },
    });
    return response.json<TranslateSchemaResponseType>();
  } catch (error) {
    console.error("翻译失败", error);
    return {
      output: prompt,
    };
  }
}
