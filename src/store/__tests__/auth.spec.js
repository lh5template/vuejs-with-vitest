import { beforeEach, describe, expect, it, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { AUTH_USER_KEY, useAuth } from "@/store";
import { deleteToken, hasToken, deleteToken } from "@/tools/token";

// 模拟登录请求响应
vi.mock("@/api", () => ({
  login: vi.fn(() => Promise.resolve({ token: "mock-token-string" })),
}));

describe("auth store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
    deleteToken();
  });

  it("登录后应该设置保存登录用户信息", async () => {
    expect(localStorage.getItem(AUTH_USER_KEY)).toBe(null);

    const store = useAuth();
    await store.login({});
    expect(store.authUser.token).toBe("mock-token-string");

    expect(localStorage.getItem(AUTH_USER_KEY)).toBeTypeOf("string");
  });

  it("登录后应该设置保存token", async () => {
    expect(hasToken()).toBe(false);

    const store = useAuth();
    await store.login({});

    expect(hasToken()).toBe(true);
  });

  it("退出应该重置登录用户信息", async () => {
    // 登录
    const store = useAuth();
    await store.login({});
    expect(store.authUser.token).toBe("mock-token-string");
    expect(hasToken()).toBe(true);

    // 退出登录
    store.logout();
    expect(store.authUser.token).toBe("");
  });

  it("登录后应该设置删除token", async () => {
    // 登录
    const store = useAuth();
    await store.login({});
    expect(store.authUser.token).toBe("mock-token-string");
    expect(hasToken()).toBe(true);

    // 退出登录
    store.logout();
    expect(store.authUser.token).toBe("");
    expect(hasToken()).toBe(false);
  });
});
