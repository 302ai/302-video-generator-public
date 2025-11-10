import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

import { ImageTask } from "@/types/image-task";
import { TaskStatus } from "@/types/video-task";

const STORAGE_KEY = "IMAGE_TASKS";

export const imageTasksAtom = atomWithStorage<ImageTask[]>(
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

export const addImageTaskAtom = atom(null, (get, set, task: ImageTask) => {
  const tasks = get(imageTasksAtom);
  set(imageTasksAtom, [task, ...tasks]);
});

export const updateImageTaskAtom = atom(
  null,
  (get, set, { id, updates }: { id: string; updates: Partial<ImageTask> }) => {
    const tasks = get(imageTasksAtom);
    set(
      imageTasksAtom,
      tasks.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  }
);

export const removeImageTaskAtom = atom(null, (get, set, id: string) => {
  const tasks = get(imageTasksAtom);
  set(
    imageTasksAtom,
    tasks.filter((task) => task.id !== id)
  );
});

export const taskByIdAtom = (taskId: string) =>
  atom((get) => {
    const tasks = get(imageTasksAtom);
    return tasks.find((task) => task.id === taskId);
  });

export const pendingImageTasksAtom = atom((get) => {
  const tasks = get(imageTasksAtom);
  return tasks.filter(
    (task) =>
      task.status === TaskStatus.PENDING ||
      task.status === TaskStatus.PROCESSING
  );
});
