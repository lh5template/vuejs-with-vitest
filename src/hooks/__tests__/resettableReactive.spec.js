import { describe, expect, it } from "vitest";
import { isReactive } from "vue";
import { useResettableReactive } from "@/hooks/resettableReactive";

describe("测试 resettableReactive", () => {
  it("应该返回一个 Reactive 对象", () => {
    const target = useResettableReactive({
      foo: "bar",
    });
    expect(isReactive(target)).toBe(true);
  });

  it("当调用 $reset 方法时, 应该重置 reactive 对象", () => {
    const origin = {
      foo: "bar",
    };
    const target = useResettableReactive(origin);

    expect(target.foo).toBe("bar");
    target.foo = "baz";
    expect(target.foo).toBe("baz");

    target.$reset();
    expect(target.foo).toBe("bar");
  });
});
