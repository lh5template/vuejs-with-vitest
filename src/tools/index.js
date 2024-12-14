import { v4 as uuidv4 } from "uuid";
import { toRaw, isRef, isProxy, unref } from "vue";

/**
 * 开发环境下的日志打印函数
 * 仅在开发环境下输出日志信息
 * @param {...*} args - 要打印的参数列表
 */
export function log(...args) {
  if (import.meta.env.DEV) {
    console.log(...args);
  }
}

/**
 * 检查传入的参数是否为可调用的函数
 * @param {*} fn - 要检查的参数
 * @returns {boolean} - 如果参数是函数则返回true，否则返回false
 */
export const isCallable = (fn) => typeof fn === "function";

/**
 * 检查传入的值是否为对象类型
 * @param {*} val - 要检查的值
 * @returns {boolean} - 如果值是对象（不包括null）则返回true，否则返回false
 */
export const isObject = (val) => val !== null && typeof val === "object";

/**
 * 生成一个 UUID (通用唯一标识符)
 * 优先使用 Web Crypto API 的 randomUUID 方法，如果不可用则回退到 uuidv4 实现
 *
 * @returns {string} 返回一个符合 UUID v4 格式的字符串
 * 例如："123e4567-e89b-12d3-a456-426614174000"
 *
 * @example
 * const id = uuid();
 * console.log(id); // "123e4567-e89b-12d3-a456-426614174000"
 *
 * @throws {Error} 如果在非浏览器环境下运行可能会抛出错误
 */
export const uuid = () => {
  if (window && isCallable(window?.crypto?.randomUUID)) {
    return window.crypto.randomUUID();
  }
  return uuidv4();
};

/**
 * 将 Proxy 或 Ref 对象转换为原始对象
 * @param {Proxy<T>|Ref<T>} data - 需要转换的对象
 * @returns {object} 转换后的原始对象
 */
export const toRawObject = (data) => {
  let x = data;
  if(isProxy(data)) {
    x = toRaw(data);
  } else if(isRef(data)) {
    x = unref(data);
  }
  return x;
}