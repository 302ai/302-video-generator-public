import { z } from "zod";

export const imageGeneratorSchema = z.object({
  model: z.string(),
  prompt: z.string(),
  height: z.number().optional(),
  width: z.number().optional(),
  aspect_ratio: z.string().optional(),
  negative_prompt: z.string().optional(),
  image: z.string().optional(),
});

export type ImageGeneratorSchemaType = z.infer<typeof imageGeneratorSchema>;

export const imageGeneratorSchemaResponse = z.object({
  task_id: z.string(),
  status: z.string(),
  created_at: z.string(),
});

export type ImageGeneratorSchemaResponseType = z.infer<
  typeof imageGeneratorSchemaResponse
>;

export const imageGeneratorFetchResponseSchema = z.object({
  model: z.string(),
  req: z.object({
    model: z.string(),
    prompt: z.string(),
    height: z.number().optional(),
    width: z.number().optional(),
    aspect_ratio: z.string().optional(),
    negative_prompt: z.string().optional(),
    image: z.string().optional(),
  }),
  task_id: z.string(),
  updated_at: z.string().optional(),
  status: z.enum(["pending", "processing", "completed", "failed"]),
  created_at: z.string(),
  execution_time: z.string(),
  completed_at: z.string().optional(),
  image_url: z.string().optional(),
  image_urls: z.array(z.string()).optional(),
  task_type: z.enum(["image", "video", "audio"]),
  webhook: z.string(),
});

export type ImageGeneratorFetchResponseType = z.infer<
  typeof imageGeneratorFetchResponseSchema
>;

export const translateSchema = z.object({
  model: z.string(),
  message: z.string(),
});

export type TranslateSchemaType = z.infer<typeof translateSchema>;

export const translateSchemaResponse = z.object({
  output: z.string(),
});

export type TranslateSchemaResponseType = z.infer<
  typeof translateSchemaResponse
>;
