export enum TaskStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  COMPLETED = "completed",
  FAILED = "failed",
}
export interface VideoTask {
  id: string;
  displayName: string;
  model: string;
  taskType: "t2v" | "i2v" | "v2v";
  params: Record<string, any>;
  status: TaskStatus;
  videoUrl?: string;
  createdAt: number;
  finishAt?: number;
  attemptCount: number;
}

export interface CreateTaskParams {
  taskType: "t2v" | "i2v" | "v2v";
  model: string;
  params: Record<string, any>;
}

export interface TaskQueryResponse {
  taskId: string;
  status: string;
  videoUrl?: string;
}
