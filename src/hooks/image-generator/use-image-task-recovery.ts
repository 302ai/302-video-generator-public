"use client";

import {
  useHasPendingTasks as useGenericHasPendingTasks,
  useTaskRecovery,
} from "@/hooks/global/use-task-recovery";
import { pendingImageTasksAtom } from "@/stores/slices/image-task.store";

export function useImageTaskRecovery() {
  return useTaskRecovery({
    pendingTasksAtom: pendingImageTasksAtom,
    taskType: "image",
  });
}

export function useHasImagePendingTasks() {
  return useGenericHasPendingTasks(pendingImageTasksAtom);
}
