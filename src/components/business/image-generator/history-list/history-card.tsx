"use client";

import { useAtomValue } from "jotai";
import { Ban } from "lucide-react";
import { useTranslations } from "next-intl";

import { useIsMobile } from "@/hooks/global/use-mobile";
import { useImageTaskPolling } from "@/hooks/image-generator/use-image-task-polling";
import { cn } from "@/lib/utils";
import { taskByIdAtom } from "@/stores/slices/image-task.store";
import { TaskStatus } from "@/types/video-task";

import { LdrsLoader } from "../../ldrs-loader";
import { CardActions } from "./card-actions";

interface TaskCardProps {
  taskId: string;
  onImageSelect: (imageUrl: string) => void;
}

export function TaskCard({ taskId, onImageSelect }: TaskCardProps) {
  const t = useTranslations();
  const task = useAtomValue(taskByIdAtom(taskId));
  const isMobile = useIsMobile();

  useImageTaskPolling(taskId);

  if (!task) {
    return null;
  }

  const handleCardClick = () => {
    // Only handle click if image is successfully generated
    if (task.status === TaskStatus.COMPLETED && task.image && onImageSelect) {
      onImageSelect(task.image);
    }
  };

  return (
    <div
      className={cn(
        "group hover:border-primary relative flex cursor-pointer flex-col space-y-2 rounded-lg border p-4 transition-all hover:shadow-lg",
        task.status === TaskStatus.FAILED && "hover:border-destructive"
      )}
    >
      <p className="text-muted-foreground text-xs font-medium">
        {t("image_generator_model")}: {task.displayName}
      </p>

      {task.status === TaskStatus.COMPLETED && task.image && (
        <div onClick={handleCardClick}>
          <img
            src={task.image}
            alt={task.displayName}
            className="w-full rounded-md"
          />
          <CardActions
            task={task}
            className={cn(
              "absolute top-10 right-4 bg-black/40 backdrop-blur-xs",
              isMobile
                ? "opacity-100"
                : "opacity-0 transition-all duration-300 group-hover:opacity-100"
            )}
            onImageSelect={onImageSelect}
          />
        </div>
      )}

      {task.status === TaskStatus.PENDING && (
        <div className="flex min-h-[200px] flex-row items-center justify-center space-x-2 rounded-md bg-yellow-400/20 p-3 text-yellow-400/80">
          <p className="text-lg font-medium">{t("pending")}</p>
          <LdrsLoader type="ring" size={20} speed={2} />
        </div>
      )}

      {task.status === TaskStatus.PROCESSING && (
        <div className="flex min-h-[200px] flex-row items-center justify-center space-x-2 rounded-md bg-blue-600/20 p-3 text-blue-600/80">
          <p className="text-lg font-medium">{t("processing")}</p>
          <LdrsLoader type="ring" size={20} speed={2} />
        </div>
      )}

      {task.status === TaskStatus.FAILED && (
        <>
          <div className="bg-destructive/20 text-destructive/80 flex min-h-[200px] flex-col items-center justify-center space-y-2 rounded-md p-3">
            <Ban className="size-8" />
            <p className="text-lg font-medium">{t("error")}</p>
          </div>
          <CardActions
            task={task}
            className={cn(
              "absolute top-10 right-4",
              isMobile
                ? "opacity-100"
                : "bg-black/40 opacity-0 backdrop-blur-xs transition-all duration-300 group-hover:opacity-100"
            )}
            onImageSelect={onImageSelect}
          />
        </>
      )}

      {/* <div className="flex flex-row justify-between">
        <p className="text-muted-foreground text-xs">
          {t("created_at")}: {dayjs(task.createdAt).format("YYYY-MM-DD HH:mm")}
        </p>
        {task.finishAt && (
          <p className="text-muted-foreground text-xs">
            {t("finished_at")}:{" "}
            {dayjs(task.finishAt).format("YYYY-MM-DD HH:mm")}
          </p>
        )}
      </div> */}
      {task.params.prompt && (
        <div
          title={task.params.prompt}
          className={cn(
            "absolute right-0 bottom-0 left-0 h-0 min-h-0 items-end overflow-hidden rounded-b-lg bg-black/40 px-4 backdrop-blur-xs transition-all duration-300 group-hover:h-1/4 group-hover:py-2",
            isMobile ? "h-1/4" : ""
          )}
        >
          <p className="line-clamp-3 text-sm break-words text-white group-hover:transition-all group-hover:duration-200">
            {task.params.prompt}
          </p>
        </div>
      )}
    </div>
  );
}
