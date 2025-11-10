"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import { isTaskComplete } from "@/components/business/left-panel/model-registry";
import {
  createVideoGeneratorJob,
  fetchVideoGeneratorJobStatus,
} from "@/services/video-generator/video-generator.api";
import {
  addTaskAtom,
  pendingTasksAtom,
  updateTaskAtom,
  videoTasksAtom,
} from "@/stores/slices/video-task.store";
import { CreateTaskParams, TaskStatus, VideoTask } from "@/types/video-task";
import { createScopedLogger } from "@/utils";

const logger = createScopedLogger("useVideoTaskPolling");

export function useCreateVideoTask() {
  const addTask = useSetAtom(addTaskAtom);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ taskType, model, params }: CreateTaskParams) => {
      logger.debug("创建新任务", { taskType, model, params });
      const response = await createVideoGeneratorJob({
        ...params,
        model,
      });

      logger.debug("任务创建成功", response);

      return {
        taskType,
        model,
        taskId: response.task_id,
        displayName: model, // Use model name as display name
        params,
      };
    },
    onSuccess: ({ taskType, model, taskId, displayName, params }) => {
      const task: VideoTask = {
        id: taskId,
        displayName,
        model,
        taskType,
        params,
        attemptCount: 0,
        status: TaskStatus.PENDING,
        createdAt: Date.now(),
      };

      logger.debug("添加任务到存储", task);
      addTask(task);

      queryClient.invalidateQueries({
        queryKey: ["videoTask", taskId],
      });
    },
    onError: (error) => {
      logger.error("创建任务失败", error);
    },
  });
}

export function useVideoTaskPolling(taskId: string) {
  const [tasks] = useAtom(videoTasksAtom);
  const updateTask = useSetAtom(updateTaskAtom);

  const task = tasks.find((t) => t.id === taskId);

  return useQuery({
    queryKey: ["videoTask", taskId],
    queryFn: async () => {
      logger.debug("轮询任务状态", taskId);

      const response = await fetchVideoGeneratorJobStatus(taskId);

      if (!response || !task) {
        throw new Error(`Task not found: ${taskId}`);
      }

      // Map unified response format to normalized status
      const normalizedStatus = mapStatusToTaskStatus(response.status);
      const videoUrl = response.video_url || undefined;

      const newAttemptCount = task.attemptCount + 1;

      logger.debug("任务状态更新", {
        taskId,
        status: normalizedStatus,
        attemptCount: newAttemptCount,
      });

      const updates: Partial<VideoTask> = {
        status: normalizedStatus,
        videoUrl,
        attemptCount: newAttemptCount,
      };

      if (newAttemptCount > 200) {
        updates.status = TaskStatus.FAILED;
        updates.finishAt = Date.now();
      } else if (isTaskComplete(normalizedStatus)) {
        updates.finishAt = Date.now();
      }

      updateTask({
        id: taskId,
        updates,
      });

      return {
        status: normalizedStatus,
        videoUrl,
      };
    },
    retry: 3,
    refetchInterval: (query) => {
      const data = query.state.data;
      if (!data || isTaskComplete(data.status as TaskStatus)) {
        logger.debug("任务已完成，停止轮询", taskId, query.state.data);
        return false;
      }
      return 3000;
    },
    enabled: !!task && !isTaskComplete(task.status),
    placeholderData: (previousData) => previousData,
    refetchIntervalInBackground: true,
  });
}

/**
 * Map API status string to TaskStatus enum
 */
function mapStatusToTaskStatus(status: string): TaskStatus {
  switch (status.toLowerCase()) {
    case "pending":
      return TaskStatus.PENDING;
    case "processing":
      return TaskStatus.PROCESSING;
    case "completed":
      return TaskStatus.COMPLETED;
    case "failed":
      return TaskStatus.FAILED;
    default:
      return TaskStatus.PENDING;
  }
}

export function useAllTasksPolling() {
  const tasks = useAtomValue(videoTasksAtom);
  const pendingTasks = useAtomValue(pendingTasksAtom);

  const pollingResults = pendingTasks.map((task) =>
    useVideoTaskPolling(task.id)
  );

  return {
    tasks,
    pendingTasks,
    pollingResults,
    isAnyPending: pollingResults.some((result) => result.isFetching),
    completedCount: tasks.filter((t) => t.status === TaskStatus.COMPLETED)
      .length,
    failedCount: tasks.filter((t) => t.status === TaskStatus.FAILED).length,
  };
}

export function useModelPendingTasks(model: string) {
  const tasks = useAtomValue(videoTasksAtom);

  return tasks.filter(
    (task) =>
      task.model === model &&
      (task.status === TaskStatus.PENDING ||
        task.status === TaskStatus.PROCESSING)
  );
}
