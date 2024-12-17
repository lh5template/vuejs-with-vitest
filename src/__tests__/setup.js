import { config } from "@vue/test-utils";
import { beforeEach, vi } from "vitest";
import { createRouterMock, injectRouterMock, VueRouterMock } from "vue-router-mock";

function setupRouterMock() {
  const router = createRouterMock({
    spy: {
      create: (fn) => vi.fn(fn),
      reset: (spy) => spy.mockClear(),
    },
  });

  beforeEach(() => {
    router.reset();
    injectRouterMock(router);
  });

  // 在启动测试的时候直接安装 vue-router-mock 测试工具包实例
  config.plugins.VueWrapper.install(VueRouterMock);
}

setupRouterMock();
