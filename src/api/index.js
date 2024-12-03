import { http, registerMapper, removeMapper } from "@/tools/http";
import { loginMapper } from "./mappers/login";

// 登录
export const auth = (data) => {
  const mapper = registerMapper(loginMapper);
  const response = http.post("/api/auth", data);
  removeMapper(mapper);
  return response;
};
