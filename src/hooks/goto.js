import { getRouterInstance, RouteNames } from "@/router";

export function useGoto() {
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
