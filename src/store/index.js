import { createPinia } from "pinia";

/**
 * @description: 在app上安装pinia
 * @param {Object} app - app实例
 */
export function setupStore(app) {
  app.use(createPinia());
}

export * from "./auth";
