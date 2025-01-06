import { log } from "@/tools";

/**
 * axios 的响应错误处理函数
 * @param {Error} e - axios 的错误对象
 */
export function httpErrorHandler(e) {
  log("===== 响应出错了 =====");
  log(e);
}
