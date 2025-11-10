import { z } from "zod";

// Parameter range schema with flexibility for different types
const parameterRangeSchema = z
  .object({
    type: z.enum(["list", "range", "slider"]),
    list: z
      .object({
        options: z.array(z.union([z.string(), z.number()])),
      })
      .optional(),
    range: z
      .object({
        min: z.number(),
        max: z.number(),
        step: z.number().optional(),
      })
      .optional(),
  })
  .optional();

// Individual parameter schema
const parameterSchema = z.object({
  name: z.string(),
  required: z.boolean(),
  description: z.string(),
  max_num: z.number(),
  range: parameterRangeSchema,
});

// Model capabilities schema
const capabilitiesSchema = z.object({
  t2v: z.boolean(),
  i2v: z.boolean(),
  v2v: z.boolean(),
});

// Individual video model schema
const videoModelSchema = z.object({
  model_name: z.string(),
  display_name: z.string(),
  provider: z.string(),
  provider_en: z.string(),
  provider_jp: z.string(),
  price_text: z.string(),
  price_text_en: z.string(),
  price_text_jp: z.string(),
  description: z.string(),
  description_en: z.string(),
  description_jp: z.string(),
  capabilities: capabilitiesSchema,
  parameters: z.array(parameterSchema),
});
export type VideoModelSchemaType = z.infer<typeof videoModelSchema>;

// Response schema for video models list
export const videoModelSchemaResponse = z.object({
  total: z.number(),
  models: z.array(videoModelSchema),
});

export type VideoModelSchemaResponseType = z.infer<
  typeof videoModelSchemaResponse
>;
