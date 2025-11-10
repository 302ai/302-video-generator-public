"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAtom, useSetAtom } from "jotai";

import { isTaskComplete } from "@/components/business/left-panel/model-registry";
import {
  createImageGeneratorJob,
  fetchImageGeneratorJobStatus,
} from "@/services/image-generator/image-generator.api";
import type { ImageGeneratorSchemaType } from "@/services/image-generator/image-generator.schema";
import {
  addImageTaskAtom,
  imageTasksAtom,
  updateImageTaskAtom,
} from "@/stores/slices/image-task.store";
import { ImageTask } from "@/types/image-task";
import { TaskStatus } from "@/types/video-task";
import { createScopedLogger } from "@/utils";

const logger = createScopedLogger("useImageTaskPolling");

export function useCreateImageTask() {
  const addTask = useSetAtom(addImageTaskAtom);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      model,
      params,
    }: {
      model: string;
      params: Partial<ImageGeneratorSchemaType>;
    }) => {
      logger.debug("创建新任务", { model, params });
      const response = await createImageGeneratorJob(params);

      logger.debug("任务创建成功", response);

      return {
        model,
        taskId: response.task_id,
        displayName: model, // Use model name as display name
        params,
      };
    },
    onSuccess: ({ model, taskId, displayName, params }) => {
      const task: ImageTask = {
        id: taskId,
        displayName,
        model,
        params,
        attemptCount: 0,
        status: TaskStatus.PENDING,
        createdAt: Date.now(),
      };

      logger.debug("���G��0X�", task);
      addTask(task);

      queryClient.invalidateQueries({
        queryKey: ["imageTask", taskId],
      });
    },
    onError: (error) => {
      logger.error("创建任务失败", error);
    },
  });
}

export function useImageTaskPolling(taskId: string) {
  const [tasks] = useAtom(imageTasksAtom);
  const updateTask = useSetAtom(updateImageTaskAtom);

  const task = tasks.find((t) => t.id === taskId);

  return useQuery({
    queryKey: ["imageTask", taskId],
    queryFn: async () => {
      logger.debug("轮询任务状态", taskId);

      const response = await fetchImageGeneratorJobStatus(taskId);

      if (!response || !task) {
        throw new Error(`Task not found: ${taskId}`);
      }

      // Map unified response format to normalized status
      const normalizedStatus = mapStatusToTaskStatus(response.status);
      const image = response.image_url || undefined;

      const newAttemptCount = task.attemptCount + 1;

      logger.debug("任务状态更新", {
        taskId,
        status: normalizedStatus,
        attemptCount: newAttemptCount,
      });

      const updates: Partial<ImageTask> = {
        status: normalizedStatus,
        image,
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
        image,
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
