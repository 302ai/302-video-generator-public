import { useMemo, useState } from "react";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { History } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { LoaderRenderer } from "@/components/common/loader-renderer";
import { VideoGeneratorForm } from "@/components/forms/video-generator/video-generator.form";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/global/use-mobile";
import { useCreateVideoTask } from "@/hooks/video-generator/use-video-task-polling";
import { cn } from "@/lib/utils";
import { languageAtom, store } from "@/stores";
import {
  UiStoreActiveTab,
  uiStoreAtom,
  updateVideoModelAtom,
} from "@/stores/slices/ui.store";
import {
  isVideoGeneratorFormValidAtom,
  resetVideoGeneratorFormAtom,
  videoGeneratorFormAtom,
} from "@/stores/slices/video-generator.store";
import { getVideoModelByNameAtom } from "@/stores/slices/video-model.store";
import {
  isExceedingConcurrencyLimitAtom,
  runningTasksCountAtom,
} from "@/stores/slices/video-task.store";
import { createScopedLogger } from "@/utils";

import { LdrsLoader } from "../ldrs-loader";
import { VideoModelSelect } from "./video-model-select";

/**
 * 将文本中的 URL 转换为可点击的链接
 * 支持 http://, https:// 开头的链接
 */
function renderTextWithLinks(text: string) {
  // 匹配 URL 的正则表达式
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary break-all hover:underline"
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

const logger = createScopedLogger("LeftPanel");

const TABS_TRIGGER_CLASS =
  "relative w-full rounded-none py-2 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:transition-all after:duration-300 after:ease-out data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:w-full data-[state=active]:after:bg-primary";

interface LeftPanelProps {
  onDrawerClicked?: () => void;
}

export function LeftPanel({ onDrawerClicked }: LeftPanelProps) {
  const t = useTranslations();

  const [isCreatingTask, setIsCreatingTask] = useState(false);

  const [uiStore, setUiStore] = useAtom(uiStoreAtom);
  const updateVideoGeneratorFormAtom = useSetAtom(videoGeneratorFormAtom);
  const updateVideoModel = useSetAtom(updateVideoModelAtom);
  const resetVideoGeneratorForm = useSetAtom(resetVideoGeneratorFormAtom);
  const createTask = useCreateVideoTask();
  const getModelByName = useAtomValue(getVideoModelByNameAtom);

  const isMobile = useIsMobile();

  // Get current model ID based on active tab
  const currentModelId =
    uiStore.activeTab === "t2v" ? uiStore.t2vVideoModel : uiStore.i2vVideoModel;

  // Get form validation state
  const isFormValid = useAtomValue(isVideoGeneratorFormValidAtom);

  // Get form data
  const formData = useAtomValue(videoGeneratorFormAtom);

  // Check concurrency limit
  const isExceedingConcurrencyLimit = useAtomValue(
    isExceedingConcurrencyLimitAtom
  );
  const runningTasksCount = useAtomValue(runningTasksCountAtom);

  // Get current model price with language matching
  const currentModel = getModelByName(currentModelId);
  const modelPrice = useMemo<string>((): string => {
    if (!currentModel) return "";
    const uiLanguage = store.get(languageAtom);
    const languageSuffix =
      uiLanguage === "en" ? "_en" : uiLanguage === "ja" ? "_jp" : "";
    return (
      (currentModel[
        `price_text${languageSuffix}` as keyof typeof currentModel
      ] as string) || ""
    );
  }, [currentModel]);

  const getTabTextClass = (tabValue: UiStoreActiveTab) => {
    return cn(
      "text-sm font-medium",
      uiStore.activeTab === tabValue && "text-primary"
    );
  };

  const handleGenerateVideo = async () => {
    if (!isFormValid) {
      logger.warn("表单验证失败或未找到表单数据");
      return;
    }

    try {
      logger.debug("开始创建视频任务", {
        modelId: currentModelId,
        formData,
      });
      toast.info(t("toast.video_task_creating"));

      setIsCreatingTask(true);

      await createTask.mutateAsync({
        taskType: uiStore.activeTab,
        model: currentModelId,
        params: formData,
      });

      logger.info("视频任务创建成功", { modelId: currentModelId });
      toast.success(t("toast.video_task_created_successfully"));
    } catch (error) {
      logger.error("视频任务创建失败", error);
      toast.error(t("toast.video_task_created_failed"));
    } finally {
      setIsCreatingTask(false);
    }
  };

  const handleTabChange = (value: UiStoreActiveTab) => {
    setUiStore((prev) => ({
      ...prev,
      activeTab: value as UiStoreActiveTab,
    }));
    const modelId =
      value === "t2v" ? uiStore.t2vVideoModel : uiStore.i2vVideoModel;
    updateVideoGeneratorFormAtom({ model: modelId });
  };

  const handleModelChange = (value: string) => {
    updateVideoModel({ type: uiStore.activeTab, value });
    updateVideoGeneratorFormAtom({ model: value });
    resetVideoGeneratorForm();
  };

  return (
    <div className="relative flex size-full">
      <Tabs
        className="flex size-full flex-col"
        defaultValue={uiStore.activeTab}
        onValueChange={(value) => handleTabChange(value as UiStoreActiveTab)}
        value={uiStore.activeTab}
      >
        <TabsList
          className={cn(
            "mb-4 flex flex-shrink-0 flex-row justify-between rounded-none bg-transparent p-0 pr-6",
            isMobile ? "w-fit" : "w-full"
          )}
        >
          <TabsTrigger className={TABS_TRIGGER_CLASS} value="t2v">
            <span className={getTabTextClass("t2v")}>
              {t("tabs.text_to_image")}
            </span>
          </TabsTrigger>
          <TabsTrigger className={TABS_TRIGGER_CLASS} value="i2v">
            <span className={getTabTextClass("i2v")}>
              {t("tabs.image_to_video")}
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent
          className="mt-0 flex min-h-0 flex-1 flex-col gap-y-6 overflow-y-auto py-2 pr-4 pl-1"
          value="t2v"
        >
          <VideoModelSelect
            value={uiStore.t2vVideoModel}
            onChange={(value) => handleModelChange(value)}
            capability="t2v"
          />
          <VideoGeneratorForm />
        </TabsContent>
        <TabsContent
          className="mt-0 flex min-h-0 flex-1 flex-col gap-y-6 overflow-y-auto py-2 pr-4 pl-1"
          value="i2v"
        >
          <VideoModelSelect
            value={uiStore.i2vVideoModel}
            onChange={(value) => handleModelChange(value)}
            capability="i2v"
          />
          <VideoGeneratorForm />
        </TabsContent>

        <div className="flex-shrink-0 space-y-2 pt-4 pr-6">
          <p className="text-muted-foreground text-xs">
            {renderTextWithLinks(modelPrice)}
          </p>

          <Button
            className="w-full"
            disabled={
              !isFormValid || isExceedingConcurrencyLimit || isCreatingTask
            }
            onClick={handleGenerateVideo}
          >
            <LoaderRenderer
              status={
                isCreatingTask
                  ? "creating_task"
                  : isExceedingConcurrencyLimit
                    ? "exceeding_concurrency_limit"
                    : isFormValid
                      ? "ready"
                      : "not_ready"
              }
              statuses={{
                ready: {
                  icon: null,
                  text: t("btn.ready_to_generate"),
                },
                not_ready: {
                  icon: null,
                  text: t("btn.ready_to_generate"),
                },
                creating_task: {
                  icon: <LdrsLoader type="ring" size={12} speed={2} />,
                  text: t("btn.creating_task"),
                },
                exceeding_concurrency_limit: {
                  icon: null,
                  text: t("btn.exceeding_concurrency_limit"),
                },
              }}
            />
          </Button>
          <p className="text-muted-foreground text-center text-xs">
            {t("task.running_tasks_count", {
              count: runningTasksCount,
            })}
          </p>
        </div>
      </Tabs>

      {isMobile && (
        <Button
          className="text-muted-foreground absolute top-0 right-0 size-12 [&_svg]:!size-5"
          variant="ghost"
          type="button"
          size="icon"
          onClick={() => {
            onDrawerClicked?.();
          }}
        >
          <History />
        </Button>
      )}
    </div>
  );
}
