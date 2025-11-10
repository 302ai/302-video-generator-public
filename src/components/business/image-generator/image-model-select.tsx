"use client";

import { useEffect, useMemo, useState } from "react";

import { Check, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IMAGE_MODEL_LIST, ImageModelInfo } from "@/constants/image-models";
import { cn } from "@/lib/utils";

interface ImageModelSelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export function ImageModelSelect({
  value,
  onChange,
  className,
  placeholder,
}: ImageModelSelectProps) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  // Transform API models to component format
  const transformedModels: ImageModelInfo[] = useMemo(
    () =>
      IMAGE_MODEL_LIST.map((model) => ({
        id: model.id,
        name: model.name,
        group: model.group,
      })),
    []
  );

  // Group models by provider
  const groupedModels = useMemo(() => {
    const grouped: Record<string, ImageModelInfo[]> = {};
    transformedModels.forEach((model) => {
      if (!grouped[model.group]) {
        grouped[model.group] = [];
      }
      grouped[model.group].push(model);
    });
    return grouped;
  }, [transformedModels]);

  const handleSelect = (newValue: string) => {
    onChange?.(newValue);
    setOpen(false);
  };

  const getDisplayValue = () => {
    if (value) {
      const model = transformedModels.find((m) => m.id === value);
      if (model) {
        return (
          <span className="flex items-center gap-2">
            <span>{model.name}</span>
          </span>
        );
      }
    }

    return (
      <span className="text-muted-foreground">
        {placeholder ?? t("select_model")}
      </span>
    );
  };

  // Handle wheel events on popover content
  useEffect(() => {
    if (!open) return;

    const handleWheel = (e: WheelEvent) => {
      // Find the scrollable list element
      const listElement = document.querySelector("[cmdk-list]");

      if (listElement && listElement instanceof HTMLElement) {
        if (listElement.scrollHeight > listElement.clientHeight) {
          e.preventDefault();
          e.stopPropagation();

          const scrollAmount = 50;
          listElement.scrollTop += e.deltaY > 0 ? scrollAmount : -scrollAmount;
        }
      }
    };

    // Use capture phase to intercept scroll events early
    document.addEventListener("wheel", handleWheel, {
      passive: false,
      capture: true,
    });

    return () => {
      document.removeEventListener("wheel", handleWheel, {
        capture: true,
      } as any);
    };
  }, [open]);

  return (
    <div className="flex flex-col gap-y-2">
      <Label>{t("image_model_select_label")}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "bg-background w-full justify-between px-3 font-normal",
              className
            )}
          >
            {getDisplayValue()}
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="border-border w-full min-w-[var(--radix-popper-anchor-width)] p-0"
          container={
            typeof document !== "undefined" ? document.body : undefined
          }
        >
          <Command loop shouldFilter={true} defaultValue="" value={value}>
            <CommandInput placeholder={t("search_model")} />
            <CommandList className="max-h-[300px]">
              <CommandEmpty>{t("no_model_found")}</CommandEmpty>
              {Object.entries(groupedModels).map(([group, models]) => (
                <CommandGroup key={group} heading={group}>
                  {models.map((model) => (
                    <CommandItem
                      key={model.id}
                      value={model.id}
                      onSelect={() => handleSelect(model.id)}
                      className={cn(
                        "relative pl-8",
                        value === model.id && "bg-accent"
                      )}
                    >
                      <div className="flex flex-1 items-center gap-2">
                        <div
                          className={cn(
                            "flex h-4 w-4 items-center justify-center rounded border",
                            value === model.id
                              ? "border-primary bg-primary"
                              : "border-muted-foreground"
                          )}
                        >
                          {value === model.id && (
                            <Check className="text-primary-foreground h-3 w-3" />
                          )}
                        </div>
                        <span>{model.name}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
