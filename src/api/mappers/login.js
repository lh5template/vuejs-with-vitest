import { md5, extend } from "@/tools";

// 登录接口响应数据格式映射
export function loginResponseMapper(data = {}) {
  return extend(data, {
    avatar_url: data.avatar,
    nickname: data.username,
  });
}

// 登录接口请求数据格式映射(密码不要明文传输)
export function loginRequestMapper(data = {}) {
  return extend(data, {
    password: md5(data.password),
  });
}