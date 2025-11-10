import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

import { TaskStatus, VideoTask } from "@/types/video-task";

const STORAGE_KEY = "VIDEO_TASKS";

export const videoTasksAtom = atomWithStorage<VideoTask[]>(
  STORAGE_KEY,
  [],
  createJSONStorage(() =>
    typeof window !== "undefined"
      ? localStorage
      : {
          getItem: () => null,
          setItem: () => null,
          removeItem: () => null,
        }
  ),
  { getOnInit: true }
);

export const addTaskAtom = atom(null, (get, set, task: VideoTask) => {
  const tasks = get(videoTasksAtom);
  set(videoTasksAtom, [task, ...tasks]);
});

export const updateTaskAtom = atom(
  null,
  (get, set, { id, updates }: { id: string; updates: Partial<VideoTask> }) => {
    const tasks = get(videoTasksAtom);
    set(
      videoTasksAtom,
      tasks.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  }
);

export const removeTaskAtom = atom(null, (get, set, id: string) => {
  const tasks = get(videoTasksAtom);
  set(
    videoTasksAtom,
    tasks.filter((task) => task.id !== id)
  );
});

export const clearCompletedTasksAtom = atom(null, (get, set) => {
  const tasks = get(videoTasksAtom);
  set(
    videoTasksAtom,
    tasks.filter(
      (task) =>
        task.status !== TaskStatus.COMPLETED &&
        task.status !== TaskStatus.FAILED
    )
  );
});

export const pendingTasksAtom = atom((get) => {
  const tasks = get(videoTasksAtom);
  return tasks.filter(
    (task) =>
      task.status === TaskStatus.PENDING ||
      task.status === TaskStatus.PROCESSING
  );
});

export const completedTasksAtom = atom((get) => {
  const tasks = get(videoTasksAtom);
  return tasks.filter((task) => task.status === TaskStatus.COMPLETED);
});

export const failedTasksAtom = atom((get) => {
  const tasks = get(videoTasksAtom);
  return tasks.filter((task) => task.status === TaskStatus.FAILED);
});

export const taskByIdAtom = (taskId: string) =>
  atom((get) => {
    const tasks = get(videoTasksAtom);
    return tasks.find((task) => task.id === taskId);
  });

export const runningTasksCountAtom = atom((get) => {
  const pendingTasks = get(pendingTasksAtom);
  return pendingTasks.length;
});

export const MAX_CONCURRENT_TASKS = 4;

export const isExceedingConcurrencyLimitAtom = atom((get) => {
  const runningCount = get(runningTasksCountAtom);
  return runningCount >= MAX_CONCURRENT_TASKS;
});
