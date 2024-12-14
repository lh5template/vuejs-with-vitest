import * as api from "@/api";
import { deleteToken, saveToken } from "@/tools/token";
import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";

export const AUTH_USER_KEY = "__auth_user__";
export const useAuth = defineStore("auth", () => {
  // 已经登录的用户信息
  const defaultUser = {
    id: "",
    nickname: "",
    avatar_url: "",
    token: "",
  };
  const authUesr = useLocalStorage(AUTH_USER_KEY, defaultUser);

  // 登录
  async function login(data) {
    const res = await api.login(data);
    saveToken(res.token);
    authUesr.value = res;
  }

  // 注销
  function logout() {
    authUesr.value = defaultUser;
    deleteToken();
  }

  return {
    authUesr,
    logout,
    login,
  };
});
