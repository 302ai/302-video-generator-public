import { Sparkles, Trash2, Upload } from "lucide-react";
import { useTranslations } from "next-intl";

import Dock from "@/components/ui/dock";
import { cn } from "@/lib/utils";

interface ImageUploaderDockProps {
  onUpload: (file?: File) => void;
  onGenerate: () => void;
  onRemove: () => void;
  className?: string;
}

export function ImageUploaderDock({
  onUpload,
  onGenerate,
  onRemove,
  className,
}: ImageUploaderDockProps) {
  const t = useTranslations();

  const items = [
    {
      icon: <Upload size={20} />,
      label: t("re-upload"),
      onClick: onUpload,
      className: "bg-transparent text-primary border-none",
    },
    {
      icon: <Sparkles size={20} />,
      label: t("ai-generate"),
      onClick: onGenerate,
      className: "bg-transparent text-primary border-none",
    },
    {
      icon: <Trash2 size={20} />,
      label: t("remove"),
      onClick: onRemove,
      className: "bg-transparent text-destructive border-none",
    },
  ];

  return (
    <Dock
      items={items}
      panelHeight={45}
      baseItemSize={30}
      magnification={45}
      className={cn("border-none", className)}
    />
  );
}
