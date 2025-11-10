"use client";

import { useState } from "react";

import dayjs from "dayjs";
import { useSetAtom } from "jotai";
import { Download, Loader2, MousePointerClick, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { LoaderRenderer } from "@/components/common/loader-renderer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { removeImageTaskAtom } from "@/stores/slices/image-task.store";
import { ImageTask } from "@/types/image-task";

interface CardActionsProps {
  task: ImageTask;
  className?: string;
  onImageSelect: (imageUrl: string) => void;
}

export function CardActions({
  task,
  className,
  onImageSelect,
}: CardActionsProps) {
  const t = useTranslations();
  const [isDownloading, setIsDownloading] = useState(false);

  // const store = useStore();
  const removeTask = useSetAtom(removeImageTaskAtom);

  const handleOnclick = (
    e: React.MouseEvent<HTMLButtonElement>,
    type: "use" | "download" | "delete"
  ) => {
    e.stopPropagation();
    e.preventDefault();

    switch (type) {
      case "use":
        onImageSelect(task.image!);
        break;
      case "download":
        handleDownload();
        break;
      case "delete":
        handleDelete();
        break;
    }
  };

  const handleDelete = () => {
    if (window.confirm(t("delete_task_confirm"))) {
      removeTask(task.id);
    }
  };

  const handleDownload = async () => {
    const imageUrl = task.image;
    if (!imageUrl) return;

    try {
      setIsDownloading(true);

      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error("Failed to download image");
      }
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const timestamp = dayjs(task.createdAt).format("YYYY-MM-DD-HH-mm-ss");
      const filename = `${task.displayName}_${timestamp}.png`;
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

  // const handleReEdit = () => {
  //   try {
  //     const { model, params } = task;

  //     // Update the form data with the task params using Jotai store
  //     store.set(imageGeneratorFormAtom, {
  //       ...params,
  //       model,
  //     });
  //   } catch (error) {
  //     console.error("Re-edit failed:", error);
  //   }
  // };

  return (
    <div className={cn("flex flex-row", className)}>
      <Button
        onClick={(e) => handleOnclick(e, "use")}
        variant="ghost"
        className="transition-all duration-200 hover:scale-120 hover:bg-transparent"
        size="icon"
        title={t("use")}
        disabled={!task.image}
      >
        <MousePointerClick className="h-4 w-4 text-white" />
      </Button>

      {/* <Button
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
      </Button> */}

      <Button
        onClick={(e) => handleOnclick(e, "download")}
        variant="ghost"
        className="transition-all duration-200 hover:scale-120 hover:bg-transparent"
        size="icon"
        disabled={isDownloading || !task.image}
        title={t("download")}
      >
        <LoaderRenderer
          status={isDownloading ? "downloading" : "idle"}
          statuses={{
            downloading: {
              icon: <Loader2 className="h-4 w-4 animate-spin text-white" />,
            },
            idle: {
              icon: <Download className="h-4 w-4 text-white" />,
            },
          }}
        />
      </Button>

      <Button
        onClick={(e) => handleOnclick(e, "delete")}
        variant="ghost"
        className="transition-all duration-200 hover:scale-120 hover:bg-transparent"
        size="icon"
        title={t("delete")}
      >
        <Trash2 className="text-destructive h-4 w-4" />
      </Button>
    </div>
  );
}
