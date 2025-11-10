"use client";

import dayjs from "dayjs";
import { useAtomValue } from "jotai";
import { Ban } from "lucide-react";
import { useTranslations } from "next-intl";

import { useIsMobile } from "@/hooks/global/use-mobile";
import { useVideoTaskPolling } from "@/hooks/video-generator/use-video-task-polling";
import { cn } from "@/lib/utils";
import { taskByIdAtom } from "@/stores/slices/video-task.store";
import { TaskStatus } from "@/types/video-task";

import { LdrsLoader } from "../../ldrs-loader";
import { StatusTagger } from "../../status-tagger";
import { CardActions } from "./card-actions";

interface TaskCardProps {
  taskId: string;
}

export function TaskCard({ taskId }: TaskCardProps) {
  const t = useTranslations();
  const task = useAtomValue(taskByIdAtom(taskId));
  const isMobile = useIsMobile();

  useVideoTaskPolling(taskId);

  if (!task) {
    return null;
  }

  return (
    <div
      className={cn(
        "group hover:border-primary flex flex-col space-y-2 rounded-lg border p-4 hover:shadow-lg",
        task.status === TaskStatus.FAILED && "hover:border-destructive"
      )}
    >
      <div className="flex items-center justify-between">
        <StatusTagger status={task.status} />
        <CardActions
          task={task}
          className={cn(
            isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}
        />
      </div>

      <p className="text-muted-foreground text-xs font-medium">
        {t("video_model_select_label")}: {task.displayName}
      </p>

      {task.status === TaskStatus.COMPLETED && task.videoUrl && (
        <video src={task.videoUrl} controls className="w-full rounded-md" />
      )}

      {task.status === TaskStatus.PENDING && (
        <div className="flex min-h-[300px] flex-row items-center justify-center space-x-2 rounded-md bg-yellow-400/20 p-3 text-yellow-400/80">
          <p className="text-lg font-medium">{t("pending")}</p>
          <LdrsLoader type="ring" size={20} speed={2} />
        </div>
      )}

      {task.status === TaskStatus.PROCESSING && (
        <div className="flex min-h-[300px] flex-row items-center justify-center space-x-2 rounded-md bg-blue-600/20 p-3 text-blue-600/80">
          <p className="text-lg font-medium">{t("processing")}</p>
          <LdrsLoader type="ring" size={20} speed={2} />
        </div>
      )}

      {task.status === TaskStatus.FAILED && (
        <div className="bg-destructive/20 text-destructive/80 flex min-h-[300px] flex-col items-center justify-center space-y-2 rounded-md p-3">
          <Ban className="size-8" />
          <p className="text-lg font-medium">{t("error")}</p>
        </div>
      )}

      <div className="flex flex-row justify-between">
        <p className="text-muted-foreground text-xs">
          {t("created_at")}: {dayjs(task.createdAt).format("YYYY-MM-DD HH:mm")}
        </p>
        {task.finishAt && (
          <p className="text-muted-foreground text-xs">
            {t("finished_at")}:{" "}
            {dayjs(task.finishAt).format("YYYY-MM-DD HH:mm")}
          </p>
        )}
      </div>
    </div>
  );
}
