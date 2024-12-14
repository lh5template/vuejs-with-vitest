// 登录数据验证规则
export const loginRules = {
  email: {
    required: true,
    message: "邮箱格式有误",
    pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
  },

  password: {
    required: true,
    message: "密码必须6-16位(字母、数字、下划线)",
    pattern: /^[0-9A-Za-z]{6,16}$/,
  },
};
