import { z } from "zod";

export const videoGeneratorSchema = z.object({
  model: z.string(),
  prompt: z.string(),
  image1: z.string().optional(),
  image2: z.string().optional(),
  image3: z.string().optional(),
  image4: z.string().optional(),
  end_image: z.string().optional(),
  video: z.string().optional(),
  negative_prompt: z.string().optional(),
  duration: z.number().optional(),
  resolution: z.string().optional(),
  aspect_ratio: z.string().optional(),
  fps: z.string().optional(),
  mode: z.string().optional(),
  effect_scene: z.string().optional(),
  quality: z.string().optional(),
  with_audio: z.boolean().optional(),
  enable_audio: z.boolean().optional(),
  size: z.string().optional(),
  pikaffect: z.string().optional(),
  motion_model: z.string().optional(),
  sound_effect_switch: z.number().optional(), // 0: close, 1: open
  lip_sync_tts_speaker_id: z.string().optional(),
  lip_sync_tts_content: z.string().optional(),
  generate_audio: z.boolean().optional(),
  prompt_optimizer: z.boolean().optional(),
  enable_prompt_expansion: z.boolean().optional(),
  prompt_enhancer: z.boolean().optional(),
  prompt_extension: z.boolean().optional(),
  style: z.string().optional(),
  template: z.string().optional(),
  motions: z.string().optional(),
  slug: z.string().optional(),
  motion: z.string().optional(),
  bgm: z.boolean().optional(),
});

export type VideoGeneratorSchemaType = z.infer<typeof videoGeneratorSchema>;

export const videoGeneratorSchemaResponse = z.object({
  task_id: z.string(),
  status: z.string(),
  created_at: z.string(),
});

export type VideoGeneratorSchemaResponseType = z.infer<
  typeof videoGeneratorSchemaResponse
>;

export const videoGeneratorFetchResponseSchema = z.object({
  video_url: z.string(),
  model: z.string(),
  attempts: z.number(),
  execution_time: z.string(),
  status: z.enum(["pending", "processing", "completed", "failed"]),
  task_id: z.string(),
  created_at: z.string(),
  completed_at: z.string(),
  updated_at: z.string(),
  mode: z.string(),
});

export type VideoGeneratorFetchResponseType = z.infer<
  typeof videoGeneratorFetchResponseSchema
>;
