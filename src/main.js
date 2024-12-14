import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { setupStore } from "@/store";
import { setupRouter } from "@/router";

/**
 * 在开发环境下,启动模拟接口响应的 Mock Service Worker (msw)
 * docs: https://msw.nodejs.cn/
 * @returns {Promise<void>}
 */
async function setupMsw() {
  if (import.meta.env.DEV) {
    const { startMockServer } = await import("@mock/server.js");
    startMockServer();
  }
  return Promise.resolve();
}

/**
 * 1. 创建app实例
 * 2. 安装pinia
 * 3. 安装vue-router
 * 4. 将app mount到根元素
 */
async function setupApp() {
  const app = createApp(App);
  setupStore(app);
  await setupRouter(app);

  app.mount('#app')
}

/**
 * 启动应用程序
 * 1. 启动 mock 服务接口
 * 2. 启动 App 实例
 */
async function bootstrap() {
  await setupMsw();
  await setupApp();
}

await bootstrap();
