"use client";

import { useState } from "react";

import { useAtomValue } from "jotai";
import { useTranslations } from "next-intl";
import Masonry from "react-masonry-css";

import { ImageGeneratorForm } from "@/components/forms/image-generator/image-generator.form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/global/use-mobile";
import { imageTasksAtom } from "@/stores/slices/image-task.store";

import { EmptyInterface } from "../empty-interface";
import { TaskCard } from "./history-list/history-card";

interface ImageGeneratorProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onImageSelect?: (imageUrl: string) => void;
}

export function ImageGenerator({
  open = false,
  onOpenChange,
  onImageSelect,
}: ImageGeneratorProps) {
  const tasks = useAtomValue(imageTasksAtom);
  const isMobile = useIsMobile();
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState("form");

  return (
    <>
      {isMobile ? (
        <Drawer open={open} onOpenChange={onOpenChange}>
          <DrawerContent className="flex h-[80vh] flex-col">
            <DrawerHeader>
              <DrawerTitle className="text-normal">
                {t("image_generator_title")}
              </DrawerTitle>
            </DrawerHeader>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="flex min-h-0 flex-1 flex-col"
            >
              <TabsList className="mx-6 mb-4 grid grid-cols-2">
                <TabsTrigger value="form">
                  {t("image_generator_title")}
                </TabsTrigger>
                <TabsTrigger value="history">{t("history")}</TabsTrigger>
              </TabsList>

              <TabsContent
                value="form"
                className="m-0 flex min-h-0 flex-1 flex-col px-6 pb-6"
              >
                <ImageGeneratorForm />
              </TabsContent>
              <TabsContent
                value="history"
                className="m-0 min-h-0 flex-1 overflow-y-auto px-6 pb-6"
              >
                {tasks.length === 0 ? (
                  <EmptyInterface />
                ) : (
                  <Masonry
                    breakpointCols={1}
                    className="masonry-grid"
                    columnClassName="masonry-grid-column"
                  >
                    {tasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        taskId={task.id}
                        onImageSelect={(imageUrl) => {
                          if (onImageSelect) {
                            onImageSelect(imageUrl);
                            onOpenChange?.(false);
                          }
                        }}
                      />
                    ))}
                  </Masonry>
                )}
              </TabsContent>
            </Tabs>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="flex h-[90vh] min-h-[776px] min-w-[1200px] flex-col overflow-hidden p-8">
            <DialogHeader className="hidden">
              <DialogTitle>{t("image_generator_title")}</DialogTitle>
            </DialogHeader>
            <div className="flex h-full flex-row">
              <div className="flex min-h-0 flex-1 flex-col">
                <ImageGeneratorForm />
              </div>

              <Separator className="mx-6" orientation="vertical" />

              <div className="flex min-h-0 flex-[3] flex-col overflow-y-auto">
                {tasks.length === 0 ? (
                  <EmptyInterface />
                ) : (
                  <Masonry
                    breakpointCols={3}
                    className="masonry-grid"
                    columnClassName="masonry-grid-column"
                  >
                    {tasks.map((task) => (
                      <TaskCard
                        key={task.id}
                        taskId={task.id}
                        onImageSelect={(imageUrl) => {
                          if (onImageSelect) {
                            onImageSelect(imageUrl);
                            onOpenChange?.(false);
                          }
                        }}
                      />
                    ))}
                  </Masonry>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
