import { beforeEach, describe, expect, it } from "vitest";
import {
  __TOKEN_KEY__,
  getToken,
  hasToken,
  removeToken,
  saveToken,
  storage,
} from "@/tools/token";

describe("token", () => {
  beforeEach(() => {
    storage.clear();
  });

  it("save token", () => {
    const mockToken = "mock-token-string";
    saveToken(mockToken);

    expect(storage.getItem(__TOKEN_KEY__)).toBe(mockToken);
  });

  it("get token", () => {
    expect(getToken()).toBe(null);

    const mockToken = "mock-token-string";
    saveToken(mockToken);

    expect(getToken()).toBe(mockToken);
  });

  it("has token", () => {
    expect(hasToken()).toBe(false);

    const mockToken = "mock-token-string";
    saveToken(mockToken);
    expect(hasToken()).toBe(true);
  });

  it("remove token", () => {
    expect(hasToken()).toBe(false);
    const mockToken = "mock-token-string";
    saveToken(mockToken);
    expect(hasToken()).toBe(true);

    removeToken();
    expect(hasToken()).toBe(false);
  });
});
