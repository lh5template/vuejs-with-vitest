// 仅在开发模式输出打印信息
export function log(...args) {
  if (import.meta.env.DEV)  {
    console.log(...args);
  }
}

// 是否是一个函数
export const isCallable = (fn) => typeof fn === "function";

// 是否是一个对象
export const isObject = (val) => val !== null && typeof val === "object";
