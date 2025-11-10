"use client";

import { Library } from "lucide-react";
import { useTranslations } from "next-intl";

export function EmptyInterface() {
  const t = useTranslations();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-2">
      <Library className="text-muted-foreground size-8" />
      <div className="text-muted-foreground">{t("no_records")}</div>
    </div>
  );
}
