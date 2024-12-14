import { describe, it, expect, beforeEach, vi } from "vitest";
import { useAuthStore, AUTH_USER_KEY } from "@/store";
import { deleteToken } from "@/tools/token";


// 模拟登录请求响应
vi.mock('@/api', () => ({
  login: vi.fn(() => Promise.resolve({ token: 'mock-token-string' })),
}));

describe('auth store', () => {
  
  beforeEach(() => {
    localStorage.clear();
    deleteToken();
  });


  it('登录后应该设置保存登录用户信息', async () => {
    expect(localStorage.getItem(AUTH_USER_KEY)).toBe(null);

    const store = useAuthStore();
    await store.login({});
    expect(store.authUser.token).toBe('mock-token-string');

    expect(localStorage.getItem(AUTH_USER_KEY)).toBeTypeOf('string');
  });

  it('登录后应该设置保存token', async () => {
    expect(hasToken()).toBe(false);

    const store = useAuthStore();
    await store.login({});

    expect(hasToken()).toBe(true);
  });

  it('退出应该重置登录用户信息', () => {
    expect().toBe();
  });

  it('登录后应该设置删除token', () => {
    expect().toBe();
  });
});
