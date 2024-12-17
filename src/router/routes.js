import Home from "@/pages/Home.vue";
import Login from "@/pages/Login.vue";

export const RouteNames = {
  Login: "Login",
  Home: "Home",
};

export const routes = [
  {
    path: "/",
    name: RouteNames.Home,
    component: Home,
  },
  {
    path: "/login",
    name: RouteNames.Login,
    component: Login,
    meta: {
      isPublic: true,
    },
  },
];
