<template>
  <div
    class="w-screen h-screen overflow-hidden flex items-center justify-center"
  >
    <form class="w-96 border rounded-lg px-8 py-4">
      <p class="text-center text-xl py-4">登录</p>
      <div class="flex py-2">
        <input
          class="input input-bordered w-full"
          type="text"
          placeholder="用户名"
        />
      </div>

      <div class="flex py-2">
        <input
          class="input input-bordered w-full"
          type="password"
          placeholder="密码"
        />
      </div>

      <div class="py-4">
        <button class="btn w-full btn-primary text-base-100">登录</button>
      </div>
    </form>
  </div>
</template>

<script setup>
</script>
