import { getRouterInstance, RouteNames } from "@/router";

export function useGoto() {
  function redirectToLogin(){
    getRouterInstance().replace({
      name: RouteNames.Login
    });
  }

  return {
    redirectToLogin
  };
}
