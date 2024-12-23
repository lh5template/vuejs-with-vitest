import { defineStore } from "pinia";
import { deleteToken, saveToken } from "@/tools/token";
import { useLocalStorage } from "@vueuse/core";
import * as api from "@/api";

export const AUTH_USER_KEY = "__auth_user__";
export const useAuth = defineStore("auth", () => {
  // 已经登录的用户信息
  const defaultUser = {
    id: "",
    nickname: "",
    avatar_url: "",
    token: "",
  };
  const authUser = useLocalStorage(AUTH_USER_KEY, defaultUser);

  // 登录
  async function login(data) {
    const res = await api.login(data);
    saveToken(res.token);
    authUser.value = res;
  }

  // 注销
  function logout() {
    authUser.value = defaultUser;
    deleteToken();
  }

  return {
    authUser,
    logout,
    login,
  };
});
