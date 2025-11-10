"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { useImageTaskRecovery } from "@/hooks/image-generator/use-image-task-recovery";
import { useVideoTaskRecovery } from "@/hooks/video-generator/use-video-task-recovery";
import { queryClient } from "@/lib/react-query";

type ReactQueryProviderProps = {
  children: React.ReactNode;
};

/**
 * Task Recovery component
 * Automatically recovers unfinished task polling on application startup
 */
function TaskRecovery() {
  useVideoTaskRecovery();
  useImageTaskRecovery();
  return null;
}

/**
 * React Query Provider component
 * Contains QueryClient configuration and task recovery logic
 */
const AppQeury = ({ children }: ReactQueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <TaskRecovery />
      {children}
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    </QueryClientProvider>
  );
};

export default AppQeury;
