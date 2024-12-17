import { setRouterInstance, setupRouterGuards } from "@/router";
import { vi } from "vitest";
import { createRouterMock } from "vue-router-mock";

/**
 * @description: 在单元测试中启动路由守卫
 * @param {{ useRealNavigation?: boolean, runPerRouteGuards?: boolean, runInComponentGuards?: boolean }} [opts]
 * @return {import("vue-router").Router}
 */
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
