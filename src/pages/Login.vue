<template>
  <div class="w-screen h-screen overflow-hidden flex items-center justify-center">
    <form class="w-96 border rounded-lg px-8 py-4">
      <p class="text-center text-xl py-4">登录</p>
      <div class="flex py-2">
        <input
          class="input input-bordered w-full"
          type="text"
          placeholder="邮箱"
          v-model="formData.email"
        />
      </div>

      <div class="flex py-2">
        <input
          class="input input-bordered w-full"
          type="password"
          placeholder="密码"
          v-model="formData.password"
        />
      </div>

      <div class="py-4">
        <button @click="handleSubmit" class="btn w-full btn-primary text-base-100">登录</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useGoto } from "@/hooks";
import { useAuth } from "@/store";
import { loginRules, validate } from "@/validation";
import { reactive } from "vue";

const formData = reactive({
  email: "admin@qq.com",
  password: "123456",
});

/**
 * 提交登录表单
 *
 * 1. 验证表单数据
 * 2. 提交登录请求
 * 3. 登录成功就跳转倒首页
 */
const { login } = useAuth();
const { redirectToHome } = useGoto();
async function handleSubmit() {
  await validate(formData, loginRules);
  await login(formData);
  redirectToHome();
}
</script>
