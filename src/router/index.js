import { createRouter, createWebHashHistory } from "vue-router";
import { setupRouterGuards } from "./guards";
import { routes } from "./routes";

export * from "./guards";
export * from "./routes";

let _router;
/**
 * @description: 设置router实例
 * @param {Object} router - router实例
 * @return {void}
 */
export function setRouterInstance(router) {
  _router = router;
}

/**
 * @description: 获取router实例
 * @return {Object} router实例
 */
export function getRouterInstance() {
  return _router;
}

/**
 * @description: 设置vue-router实例
 * @param {Object} app - vue app实例
 * @return {Promise} router.isReady() - router是否ready
 */
export function setupRouter(app) {
  const router = createRouter({
    history: createWebHashHistory(),
    routes,
  });

  setRouterInstance(router);
  setupRouterGuards(router);

  app.use(router);
  return router.isReady();
}
