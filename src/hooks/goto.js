import { getRouterInstance, RouteNames } from "@/router";

/**
 * @description 提供重定向功能的钩子函数
 * @returns {Object} 包含两个方法: redirectToLogin 和 redirectToHome
 * - redirectToLogin: 重定向到登录页面
 * - redirectToHome: 重定向到首页
 */
export function useGoto() {
  /**
   * @description 重定向到指定的路由
   * @param {RouteNames} RouteName - 路由名称
   * @example
   * import { RouteNames } from "@/router";
   * const { redirect } = useGoto();
   * redirect(RouteNames.Login);
   */
  function redirect(RouteName) {
    const router = getRouterInstance();
    router.replace({ name: RouteName });
  }

  const redirectToLogin = () => redirect(RouteNames.Login);
  const redirectToHome = () => redirect(RouteNames.Home);

  return {
    redirectToLogin,
    redirectToHome,
  };
}
