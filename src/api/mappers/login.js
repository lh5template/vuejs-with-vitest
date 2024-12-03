export function loginMapper(data) {
  return {
    ...data,
    avatar_url: data.avatar_url,
    nickname: data.nickname,
  }
}
