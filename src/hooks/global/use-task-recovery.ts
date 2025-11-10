"use client";

import { useEffect, useState } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { Atom, useAtomValue } from "jotai";

import { createScopedLogger } from "@/utils";

interface Task {
  id: string;
  model: string;
  status: string;
}

interface UseTaskRecoveryOptions {
  pendingTasksAtom: Atom<Task[]>;
  taskType: "video" | "image";
}

const logger = createScopedLogger("useTaskRecovery");

/**
 * Generic task recovery hook
 * Recovers unfinished task polling on application startup
 */
export function useTaskRecovery({
  pendingTasksAtom,
  taskType,
}: UseTaskRecoveryOptions) {
  const pendingTasks = useAtomValue(pendingTasksAtom);
  const queryClient = useQueryClient();
  const [hasRecovered, setHasRecovered] = useState(false);

  useEffect(() => {
    if (hasRecovered) {
      return;
    }

    if (pendingTasks.length > 0) {
      logger.info(
        `Detected ${pendingTasks.length} unfinished ${taskType} tasks, starting recovery polling`
      );

      pendingTasks.forEach((task) => {
        logger.debug(`Recovering ${taskType} task polling`, {
          taskId: task.id,
          model: task.model,
          status: task.status,
        });

        queryClient.invalidateQueries({
          queryKey: [`${taskType}Task`, task.id],
        });
      });

      logger.info(`${taskType} task polling recovery completed`);
    } else {
      logger.debug(`No ${taskType} tasks to recover`);
    }

    setHasRecovered(true);
  }, [pendingTasks, queryClient, hasRecovered, taskType]);

  return {
    pendingTasksCount: pendingTasks.length,
    hasRecovered,
  };
}

/**
 * Hook to check if there are pending tasks
 */
export function useHasPendingTasks(pendingTasksAtom: Atom<Task[]>) {
  const pendingTasks = useAtomValue(pendingTasksAtom);

  return {
    hasPending: pendingTasks.length > 0,
    count: pendingTasks.length,
    tasks: pendingTasks,
  };
}
