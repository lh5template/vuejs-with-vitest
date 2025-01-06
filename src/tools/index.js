import MD5 from "crypto-js/md5";
import { v4 as uuidv4 } from "uuid";

/**
 * 合并两个对象
 * @param {Object} target - 目标对象
 * @param {Object} source - 源对象
 * @returns {Object} 返回合并后的对象
 */
export const merge = Object.assign;

/**
 * 开发环境下的日志打印函数
 * 仅在开发环境下输出日志信息
 * @param {...*} args - 要打印的参数列表
 */
export const log = (...args) => {
  if (import.meta.env.DEV) {
    console.log(...args);
  }
};

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
 *  检查传入的值是否为 null
 * @param {*} val 要检查的值
 * @returns {boolean}
 */
export const isNull = (val) => val === null;

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
 * 返回字符串的md5值
 * @param {string} str - 最小值
 * @returns {string} 返回值
 */
export const md5 = (str) => MD5(str).toString();
