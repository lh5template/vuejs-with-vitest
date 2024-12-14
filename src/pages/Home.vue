<template>
  <div>
    <h2>首页</h2>
    <p>用户名: {{ authUesr.nickname }}</p>
    <img :src="authUesr.avatar_url" />
    <button @click="handleLogout">退出登录</button>
  </div>
</template>

<script setup>
import { useGoto } from "@/hooks";
import { useAuth } from "@/store";
import { storeToRefs } from "pinia";

const store = useAuth();
const {
  authUesr,
} = storeToRefs(store);

function handleLogout() {
  store.logout();
  useGoto().redirectToLogin();
}
</script>
