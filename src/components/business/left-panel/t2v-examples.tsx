"use client";

import { useEffect, useState } from "react";

import { useSetAtom } from "jotai";
import { RotateCw } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { videoGeneratorFormAtom } from "@/stores";

export function T2VExamples() {
  const t = useTranslations();
  const setFormValue = useSetAtom(videoGeneratorFormAtom);

  const examples: { title: string; prompt: string }[] = [
    {
      title: t("chameleon_title"),
      prompt: t("chameleon_prompt"),
    },
    {
      title: t("robot_title"),
      prompt: t("robot_prompt"),
    },
    {
      title: t("old_book_title"),
      prompt: t("old_book_prompt"),
    },
    {
      title: t("pizza_title"),
      prompt: t("pizza_prompt"),
    },
    {
      title: t("lighthouse_title"),
      prompt: t("lighthouse_prompt"),
    },
    {
      title: t("chessboard_title"),
      prompt: t("chessboard_prompt"),
    },
    {
      title: t("penguin_title"),
      prompt: t("penguin_prompt"),
    },
    {
      title: t("street_performer_title"),
      prompt: t("street_performer_prompt"),
    },
    {
      title: t("old_tree_title"),
      prompt: t("old_tree_prompt"),
    },
    {
      title: t("butterfly_title"),
      prompt: t("butterfly_prompt"),
    },
    {
      title: t("high-speed train_title"),
      prompt: t("high-speed train_prompt"),
    },
    {
      title: t("rain_title"),
      prompt: t("rain_prompt"),
    },
    {
      title: t("ice_cream_title"),
      prompt: t("ice_cream_prompt"),
    },
    {
      title: t("golden_fish_title"),
      prompt: t("golden_fish_prompt"),
    },
    {
      title: t("parrot_title"),
      prompt: t("parrot_prompt"),
    },
    {
      title: t("ramen_title"),
      prompt: t("ramen_prompt"),
    },
  ];

  const [selectedExamples, setSelectedExamples] = useState<
    { title: string; prompt: string }[]
  >([]);

  // 获取三个随机示例
  const getRandomExamples = () => {
    const shuffled = [...examples].sort(() => Math.random() - 0.5);
    setSelectedExamples(shuffled.slice(0, 3));
  };

  // 初始化时获取三个随机示例
  useEffect(() => {
    getRandomExamples();
  }, []);

  const handleExampleClick = (prompt: string) => {
    setFormValue((prev) => ({
      ...prev,
      prompt,
    }));
  };

  return (
    <div className="flex items-center gap-2">
      {selectedExamples.map((example, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          type="button"
          className="h-auto min-w-0 flex-1 px-2 py-2 text-xs"
          onClick={() => handleExampleClick(example.prompt)}
          title={example.title}
        >
          <span className="truncate">{example.title}</span>
        </Button>
      ))}
      <Button
        variant="ghost"
        size="icon"
        type="button"
        className="h-8 w-8 flex-shrink-0"
        onClick={getRandomExamples}
        title={t("examples.refresh") || "Refresh"}
      >
        <RotateCw className="h-4 w-4" />
      </Button>
    </div>
  );
}
