"use client";

import { useEffect, useState, type ReactNode } from "react";

import { useAtom } from "jotai";

import SkeletonRenderer from "@/components/common/skeleton-renderer";
import { fetchVideoModelsAtom } from "@/stores/slices/video-model.store";

interface ClientOnlyProps {
  children: ReactNode;
}

export default function AppClient({ children }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false);
  const [, fetchVideoModels] = useAtom(fetchVideoModelsAtom);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Initialize video models on mount
  useEffect(() => {
    if (hasMounted) {
      fetchVideoModels().catch((error) => {
        console.error("Failed to fetch video models:", error);
      });
    }
  }, [hasMounted, fetchVideoModels]);

  if (!hasMounted) {
    return <SkeletonRenderer element="APP_CLIENT" />;
  }

  return <>{children}</>;
}
