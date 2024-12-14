import { setupWorker } from "msw/browser";
import * as HandlerMod from "./handlers.js";

// https://msw.nodejs.cn/docs/api/setup-worker/start/
const handlers = [];
for (const item in HandlerMod) {
  handlers.push(HandlerMod[item]);
}
const worker = setupWorker(...handlers);

export const startMockServer = () => worker.start({ onUnhandledRequest: "bypass" });
export const closeMockServer = () => worker.close();
