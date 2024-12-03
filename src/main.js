import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { setupStore } from "@/store";
import { setupRouter } from "@/router";


// 开发环境下启动模拟接口响应的 mock service worker
// https://mswjs.io/
async function setupMsw() {
  if (import.meta.env.DEV) {
    const { startMockServer } = await import("@mock/server.js");
    startMockServer();
  }
  return Promise.resolve();
}

async function setupApp() {
  const app = createApp(App);
  setupStore(app);
  await setupRouter(app);

  app.mount('#app')
}

async function bootstrap() {
  await setupMsw();
  await setupApp();
}

await bootstrap();
