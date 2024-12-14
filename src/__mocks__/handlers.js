import { http, HttpResponse } from "msw";

// 登录接口
export const loginHandler = http.post("/api/login", () => {
  return HttpResponse.json({
    id: 1,
    username: "admin",
    avatar: "https://iph.href.lu/100x100?text=img",
    email: "admin@qq.com",
    created_at: "2024-06-10T17:17:09.000Z",
    token: "msw-mock-token-string",
  });
});
