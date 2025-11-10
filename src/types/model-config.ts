import { PrimitiveAtom, WritableAtom } from "jotai";

import { TaskQueryResponse, TaskStatus } from "./video-task";

/**
 * Model API configuration
 * Contains API functions for creating and fetching video generation tasks
 */
export interface ModelAPI {
  /** Function to create a new video generation task */
  create: (params: any) => Promise<any>;
  /** Function to fetch the status of a video generation task */
  fetch: (taskId: string) => Promise<any>;
}

/**
 * Response normalizer function
 * Converts model-specific API response to standardized TaskQueryResponse
 * This is where you map model-specific status values to TaskStatus enum
 * @param response - The raw API response from the model
 * @returns Normalized TaskQueryResponse with standard TaskStatus values
 */
export type ResponseNormalizer = (response: any) => TaskQueryResponse;

/**
 * Model configuration interface
 * Contains all necessary atoms, metadata, and API functions for a video generation model
 */
export interface ModelConfig {
  /** Model display name */
  displayName: string;
  /** Form data atom for this model */
  formDataAtom: WritableAtom<any, [any], void>;
  /** Form validation atom for this model */
  validationAtom: PrimitiveAtom<boolean>;
  /** API functions for this model */
  api: ModelAPI;
  /** Function to normalize API response to standard format */
  normalizeResponse: ResponseNormalizer;
  /** API model name (if different from modelId) */
  apiModelName?: string;
}
