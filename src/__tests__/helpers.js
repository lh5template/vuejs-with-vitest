import { setupRouterGuards, setRouterInstance } from "@/router";
import { vi } from "vitest";
import { createRouterMock } from "vue-router-mock";

export function setupRouterMock(opts = {}) {
  const options = Object.assign({
    useRealNavigation: true,
    runPerRouteGuards: true,
    runInComponentGuards: true,
  }, opts);

  const routerMock = createRouterMock({
    spy: {
      create: (fn) => vi.fn(fn),
      reset: (spy) => spy.mockClear(),
    },
    ...options,
  });

  // 设置路由守卫
  setupRouterGuards(routerMock);

  // 设置路由实例
  setRouterInstance(routerMock);

  return routerMock;
}
