import { TaskStatus } from "./video-task";

export interface ImageTask {
  id: string;
  displayName: string;
  model: string;
  params: Record<string, any>;
  status: TaskStatus;
  image?: string;
  createdAt: number;
  finishAt?: number;
  attemptCount: number;
}

export interface CreateImageTaskParams {
  model: string;
  params: Record<string, any>;
}

export interface TaskQueryResponse {
  taskId: string;
  status: string;
  image?: string;
}
