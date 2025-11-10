"use client";

import {
  useHasPendingTasks as useGenericHasPendingTasks,
  useTaskRecovery,
} from "@/hooks/global/use-task-recovery";
import { pendingTasksAtom } from "@/stores/slices/video-task.store";

export function useVideoTaskRecovery() {
  return useTaskRecovery({
    pendingTasksAtom,
    taskType: "video",
  });
}

export function useHasPendingTasks() {
  return useGenericHasPendingTasks(pendingTasksAtom);
}
