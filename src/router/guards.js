import { hasToken } from "@/tools/token";
import { RouteNames } from "@/router"

// 启动路由守卫
export function setupRouterGuards(router) {
  console.log("setupRouterGuards")
  setupAuthGuard(router);
}

// 检查登录守卫
export function setupAuthGuard(router) {
  router.beforeEach((to, _form, next) => {

    if (to.meta.isPublic || hasToken()) {
      return next();
    }

    // showErrorMsg("请先登录");
    return next({ name: RouteNames.Login });
  });
}
