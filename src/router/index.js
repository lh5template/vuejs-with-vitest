import { createWebHashHistory, createRouter } from "vue-router";
import { routes } from "./routes";
import { setupRouterGuards } from "./guards";

export * from "./routes";
export * from "./guards";

let _router;
export function setRouterInstance(router) {
  _router = router;
}

export function getRouterInstance() {
  return _router;
}

export function setupRouter(app) {
  const router = createRouter({
    history: createWebHashHistory(),
    routes
  });

  setRouterInstance(router);
  setupRouterGuards(router);

  app.use(router);
  return router.isReady();
}
