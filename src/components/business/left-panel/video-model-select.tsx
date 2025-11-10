"use client";

import { useMemo, useState } from "react";

import { useAtomValue } from "jotai";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { VideoModelSchemaType } from "@/services/video-model/video-model.schema";
import { languageAtom, store } from "@/stores";
import { getVideoModelsByCapabilityAtom } from "@/stores/slices/video-model.store";

import { CommandItemWithTooltip } from "./command-item-with-tooltip";

interface TransformedModel {
  id: string;
  display_name: string;
  name: string;
  price_text: string;
  description: string;
  provider: string;
  capabilities: Record<string, boolean>;
}

interface VideoModelSelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  capability?: "t2v" | "i2v";
}

export function VideoModelSelect({
  value,
  onChange,
  className,
  placeholder,
  capability = "t2v",
}: VideoModelSelectProps) {
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const getModelsByCapability = useAtomValue(getVideoModelsByCapabilityAtom);
  const models = useMemo(
    () => getModelsByCapability(capability),
    [getModelsByCapability, capability]
  );

  // Transform API models to component format
  const transformedModels: TransformedModel[] = useMemo(() => {
    const uiLanguage = store.get(languageAtom);
    const languageSuffix =
      uiLanguage === "en" ? "_en" : uiLanguage === "ja" ? "_jp" : "";
    const infoBasedLanguage = (model: VideoModelSchemaType) => {
      return {
        price_text: model[`price_text${languageSuffix}`],
        description: model[`description${languageSuffix}`],
        provider: model[`provider${languageSuffix}`],
      };
    };
    return models.map((model) => ({
      id: model.model_name,
      display_name: model.display_name,
      name: model.display_name,
      ...infoBasedLanguage(model),
      capabilities: model.capabilities,
    }));
  }, [models]);

  // Group models by provider
  const groupedModels = useMemo(() => {
    const grouped: Record<string, TransformedModel[]> = {};
    transformedModels.forEach((model) => {
      if (!grouped[model.provider]) {
        grouped[model.provider] = [];
      }
      grouped[model.provider].push(model);
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

  return (
    <div className="flex flex-col gap-y-2">
      <Label>{t("video_model_select_label")}</Label>
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
        <PopoverContent className="border-border w-full min-w-[var(--radix-popper-anchor-width)] p-0">
          <Command loop shouldFilter={true} defaultValue="" value={value}>
            <CommandInput placeholder={t("search_model")} />
            <CommandList>
              <CommandEmpty>{t("no_model_found")}</CommandEmpty>
              {Object.entries(groupedModels).map(
                ([provider, providerModels]) => (
                  <CommandGroup key={provider} heading={provider}>
                    {providerModels.map((model) => (
                      <CommandItemWithTooltip
                        key={model.id}
                        model={model}
                        isSelected={value === model.id}
                        onSelect={() => handleSelect(model.id)}
                      />
                    ))}
                  </CommandGroup>
                )
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
