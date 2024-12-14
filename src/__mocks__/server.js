import { setupWorker } from "msw/browser";
import * as handlerModule from "./handlers.js";

// https://msw.nodejs.cn/docs/api/setup-worker/start/
const handlers = Object.keys(handlerModule).map((key) => handlerModule[key]);
const worker = setupWorker(...handlers);
export const startMockServer = () => worker.start({ onUnhandledRequest: "bypass" });
export const closeMockServer = () => worker.close();
