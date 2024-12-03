import { setupWorker } from "msw/browser";
import { handlers } from "./handlers.js";

const worker = setupWorker(...handlers);
export const startMockServer = () => worker.start();
export const closeMockServer = () => worker.close();
