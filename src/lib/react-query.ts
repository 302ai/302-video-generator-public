/**
 * React Query 配置
 * 用于管理视频生成任务的查询和缓存
 */

import { QueryClient } from "@tanstack/react-query";

/**
 * 创建 QueryClient 实例
 * 配置针对视频任务轮询场景优化
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 禁用自动重新获取（轮询由 refetchInterval 控制）
      refetchOnWindowFocus: false,
      refetchOnMount: false, // 防止组件重新挂载时重复请求
      refetchOnReconnect: true, // 网络恢复时自动重连

      // 重试配置（只重试网络错误，不重试业务错误）
      retry: (failureCount, error) => {
        // 任务查询失败时的重试策略
        if (error instanceof Error) {
          // 网络错误才重试
          if (
            error.message.includes("NetworkError") ||
            error.message.includes("fetch") ||
            error.message.includes("timeout")
          ) {
            return failureCount < 3;
          }
        }
        return false; // 其他错误不重试
      },

      // 重试延迟（指数退避）
      retryDelay: (attemptIndex) => {
        return Math.min(1000 * 2 ** attemptIndex, 10000); // 最多延迟10秒
      },

      // 缓存配置
      gcTime: 1000 * 60 * 30, // 30分钟后清理缓存
      staleTime: 0, // 立即过期，确保轮询及时

      // 错误处理
      throwOnError: false, // 不抛出错误，由组件自行处理
    },

    mutations: {
      // 创建任务的 mutation 配置
      retry: 0, // 🔒 关键：创建任务不重试，防止重复扣费
      throwOnError: false,

      // 错误处理
      onError: (error) => {
        console.error("Mutation error:", error);
      },
    },
  },
});

/**
 * 清空所有查询缓存（用于测试或重置）
 */
export function clearAllQueries() {
  queryClient.clear();
}

/**
 * 使特定任务的查询失效（触发重新获取）
 */
export function invalidateTaskQuery(taskId: string) {
  queryClient.invalidateQueries({
    queryKey: ["videoTask", taskId],
  });
}

/**
 * 取消特定任务的查询（停止轮询）
 */
export function cancelTaskQuery(taskId: string) {
  queryClient.cancelQueries({
    queryKey: ["videoTask", taskId],
  });
}
