import { TaskStatus } from "@/types/video-task";

/**
 * Unified task completion checker
 * Works with normalized TaskStatus values
 * @param status - The normalized TaskStatus value
 * @returns true if the task is complete (success or failure)
 */
export function isTaskComplete(status: TaskStatus): boolean {
  return status === TaskStatus.COMPLETED || status === TaskStatus.FAILED;
}
