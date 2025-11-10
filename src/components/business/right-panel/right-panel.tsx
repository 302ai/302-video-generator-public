"use client";

import { useAtomValue } from "jotai";
import Masonry from "react-masonry-css";

import { useIsMobile } from "@/hooks/global/use-mobile";
import { videoTasksAtom } from "@/stores/slices/video-task.store";

import { EmptyInterface } from "../empty-interface";
import { TaskCard } from "./history-list/history-card";

export function RightPanel() {
  const tasks = useAtomValue(videoTasksAtom);
  const isMobile = useIsMobile();

  return (
    <div className="h-full w-full overflow-y-auto px-4 pt-0 pb-4">
      {tasks.length === 0 ? (
        <EmptyInterface />
      ) : (
        <Masonry
          breakpointCols={isMobile ? 1 : 2}
          className="masonry-grid"
          columnClassName="masonry-grid-column"
        >
          {tasks.map((task) => (
            <TaskCard key={task.id} taskId={task.id} />
          ))}
        </Masonry>
      )}
    </div>
  );
}
