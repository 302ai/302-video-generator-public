"use client";

import { useState } from "react";

import dayjs from "dayjs";
import { useSetAtom, useStore } from "jotai";
import { Download, Loader2, SquarePen, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { LoaderRenderer } from "@/components/common/loader-renderer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { uiStoreAtom, updateVideoModelAtom } from "@/stores/slices/ui.store";
import { videoGeneratorFormAtom } from "@/stores/slices/video-generator.store";
import { removeTaskAtom } from "@/stores/slices/video-task.store";
import { TaskStatus, VideoTask } from "@/types/video-task";

interface CardActionsProps {
  task: VideoTask;
  className?: string;
}

export function CardActions({ task, className }: CardActionsProps) {
  const t = useTranslations();
  const [isDownloading, setIsDownloading] = useState(false);

  const store = useStore();
  const removeTask = useSetAtom(removeTaskAtom);
  const setUiStore = useSetAtom(uiStoreAtom);
  const updateVideoModel = useSetAtom(updateVideoModelAtom);

  const handleDelete = () => {
    if (window.confirm(t("delete_task_confirm"))) {
      removeTask(task.id);
    }
  };

  const handleDownload = async () => {
    const videoUrl = task.videoUrl;
    if (!videoUrl) return;

    try {
      setIsDownloading(true);

      const response = await fetch(videoUrl);
      if (!response.ok) {
        throw new Error("Failed to download video");
      }
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const timestamp = dayjs(task.createdAt).format("YYYY-MM-DD-HH-mm-ss");
      const filename = `${task.displayName}_${timestamp}.mp4`;
      link.download = filename;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success(t("download_success"));
    } catch (error) {
      console.error("Download failed:", error);
      toast.error(t("download_failed"));
    } finally {
      setIsDownloading(false);
    }
  };

  const handleReEdit = () => {
    try {
      const { taskType, model, params } = task;

      if (taskType !== "t2v" && taskType !== "i2v") {
        console.error("Invalid modelType in task params:", taskType);
        return;
      }

      // Update UI store to switch to the correct tab and model
      setUiStore((prev) => ({
        ...prev,
        activeTab: taskType,
      }));

      // Update the video model selection for the appropriate tab
      updateVideoModel({ type: taskType, value: model });

      // Update the form data with the task params using Jotai store
      store.set(videoGeneratorFormAtom, params);
    } catch (error) {
      console.error("Re-edit failed:", error);
    }
  };

  return (
    <div className={cn("flex flex-row space-x-0.5", className)}>
      <Button
        onClick={handleReEdit}
        variant="ghost"
        size="icon"
        title={t("re-edit")}
        disabled={
          task.status !== TaskStatus.COMPLETED &&
          task.status !== TaskStatus.FAILED
        }
      >
        <SquarePen className="text-primary h-4 w-4" />
      </Button>

      <Button
        onClick={handleDownload}
        variant="ghost"
        size="icon"
        disabled={isDownloading || !task.videoUrl}
        title={t("download")}
      >
        <LoaderRenderer
          status={isDownloading ? "downloading" : "idle"}
          statuses={{
            downloading: {
              icon: <Loader2 className="text-primary h-4 w-4 animate-spin" />,
            },
            idle: {
              icon: <Download className="text-primary h-4 w-4" />,
            },
          }}
        />
      </Button>

      <Button
        onClick={handleDelete}
        variant="ghost"
        size="icon"
        title={t("delete")}
      >
        <Trash2 className="text-destructive h-4 w-4" />
      </Button>
    </div>
  );
}
