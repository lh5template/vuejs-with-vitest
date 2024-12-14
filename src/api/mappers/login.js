// 登录接口响应数据格式映射
export function loginMapper(data = {}) {
  return Object.assign(data, {
    avatar_url: data.avatar,
    nickname: data.username,
  });
}
