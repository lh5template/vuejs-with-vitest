import { log } from "@/tools";

// 全局http响应错误处理
export function httpErrorHandler(e) {
  log("===== 响应出错了 =====");
  log(e);
}
