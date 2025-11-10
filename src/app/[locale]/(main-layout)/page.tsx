"use client";

import { useAtom } from "jotai";
import { useTranslations } from "next-intl";

import { LeftPanel } from "@/components/business/left-panel/left-panel";
import { RightPanel } from "@/components/business/right-panel/right-panel";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/global/use-mobile";
import { uiStoreAtom } from "@/stores/slices/ui.store";

export default function Home() {
  const t = useTranslations();

  const isMobile = useIsMobile();

  const [uiStore, setUiStore] = useAtom(uiStoreAtom);

  return (
    <div className="flex min-h-0 flex-1">
      <div className="bg-background border-border relative container mx-auto flex min-h-0 w-full max-w-[1440px] flex-row rounded-lg border px-6 py-4 shadow-sm">
        {isMobile ? (
          <>
            <LeftPanel
              onDrawerClicked={() =>
                setUiStore((prev) => ({ ...prev, drawerOpen: true }))
              }
            />

            <Drawer
              open={uiStore.drawerOpen}
              onOpenChange={(open) =>
                setUiStore((prev) => ({
                  ...prev,
                  drawerOpen: open,
                }))
              }
            >
              <DrawerContent className="flex h-[90vh] flex-col">
                <DrawerHeader className="p-2">
                  <DrawerTitle className="text-normal">
                    {t("history")}
                  </DrawerTitle>
                </DrawerHeader>
                <div className="min-h-0 flex-1 overflow-hidden px-4">
                  <RightPanel />
                </div>
              </DrawerContent>
            </Drawer>
          </>
        ) : (
          <>
            <div className="flex min-h-0 flex-1 flex-col">
              <LeftPanel />
            </div>

            <Separator className="ml-0.5" orientation="vertical" />

            <div className="flex min-h-0 flex-[3] flex-col">
              <RightPanel />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
