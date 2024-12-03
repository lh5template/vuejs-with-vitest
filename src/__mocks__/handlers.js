import { http, HttpResponse } from "msw";
import { loginResponse } from "./handlers/login";

export const handlers = [
  // 登录接口
  http.post("/api/auth", () => HttpResponse.json(loginResponse)),
];
