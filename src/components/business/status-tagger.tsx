"use client";

import { Ban, CircleCheckBig } from "lucide-react";
import { useTranslations } from "next-intl";

import { LoaderRenderer } from "@/components/common/loader-renderer";
import { cn } from "@/lib/utils";
import { TaskStatus } from "@/types/video-task";

import { LdrsLoader } from "./ldrs-loader";

interface StatusTaggerProps {
  status: TaskStatus;
}

export function StatusTagger({ status }: StatusTaggerProps) {
  const t = useTranslations();
  const statusMap: Record<TaskStatus, { text: string; color: string }> = {
    [TaskStatus.PENDING]: { text: t("pending"), color: "bg-yellow-400" },
    [TaskStatus.PROCESSING]: { text: t("processing"), color: "bg-blue-600" },
    [TaskStatus.COMPLETED]: { text: t("completed"), color: "bg-green-600" },
    [TaskStatus.FAILED]: { text: t("failed"), color: "bg-destructive" },
  };

  return (
    <div
      className={cn(
        "flex w-fit flex-row items-center space-x-2 rounded-lg px-3 py-1.5 text-xs text-white backdrop-blur",
        statusMap[status].color
      )}
    >
      <p>{statusMap[status].text}</p>
      <LoaderRenderer
        status={status}
        statuses={{
          [TaskStatus.PENDING]: {
            icon: <LdrsLoader type="ring" size={12} speed={2} />,
          },
          [TaskStatus.PROCESSING]: {
            icon: <LdrsLoader type="ring" size={12} speed={2} />,
          },
          [TaskStatus.COMPLETED]: {
            icon: <CircleCheckBig size={12} />,
          },
          [TaskStatus.FAILED]: {
            icon: <Ban size={12} />,
          },
        }}
      />
    </div>
  );
}
