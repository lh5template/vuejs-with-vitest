import { __TOKEN_KEY__, storage, saveToken,getToken, hasToken, removeToken } from "@/tools/token";
import { it, describe, expect, beforeEach } from "vitest";

describe("token", () => {

  beforeEach(() => {
    storage.clear();
  });

  it("save token", () => {
    const mockToken = "mock-token-string";
    saveToken(mockToken);

    expect(storage.getItem(__TOKEN_KEY__)).toBe(mockToken)
  });

  it("get token", () => {
    expect(getToken()).toBe(null);

    const mockToken = "mock-token-string";
    saveToken(mockToken);

    expect(getToken()).toBe(mockToken);
  });

  it("has token", () => {
    expect(hasToken()).toBe(false)

    const mockToken = "mock-token-string";
    saveToken(mockToken);
    expect(hasToken()).toBe(true);
  });

  it("remove token", () => {
    expect(hasToken()).toBe(false)
    const mockToken = "mock-token-string";
    saveToken(mockToken);
    expect(hasToken()).toBe(true);

    removeToken();
    expect(hasToken()).toBe(false)
  });
});
