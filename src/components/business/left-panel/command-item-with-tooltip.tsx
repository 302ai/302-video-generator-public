"use client";

import { useState } from "react";

import {
  flip,
  offset,
  shift,
  useFloating,
  useHover,
  useInteractions,
} from "@floating-ui/react";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

import { CommandItem } from "@/components/ui/command";
import { cn } from "@/lib/utils";

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

interface Model {
  id: string;
  display_name: string;
  price_text: string;
  // description: string;
}

interface CommandItemWithTooltipProps {
  model: Model;
  isSelected: boolean;
  onSelect: () => void;
}

export function CommandItemWithTooltip({
  model,
  isSelected,
  onSelect,
}: CommandItemWithTooltipProps) {
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [offset(8), flip(), shift({ padding: 8 })],
    placement: "right",
  });

  const hover = useHover(context, { move: true, delay: { close: 10 } });
  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  return (
    <>
      <CommandItem
        key={model.id}
        value={model.id}
        onSelect={onSelect}
        className={cn("relative pl-8", isSelected && "bg-accent")}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        <div className="flex flex-1 items-center gap-2">
          <div
            className={cn(
              "flex h-4 w-4 items-center justify-center rounded border",
              isSelected
                ? "border-primary bg-primary"
                : "border-muted-foreground"
            )}
          >
            {isSelected && (
              <Check className="text-primary-foreground h-3 w-3" />
            )}
          </div>
          <span>{model.display_name}</span>
        </div>
      </CommandItem>
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="border-border bg-popover z-50 w-fit rounded-md border p-3 text-sm shadow-md"
        >
          <div className="space-y-2">
            <div className="flex flex-col gap-1">
              <span className="font-medium">{t("price")}</span>
              <span className="text-muted-foreground text-xs">
                {renderTextWithLinks(model.price_text)}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
