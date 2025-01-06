import { z } from "zod";

// 登录验证规则
export const loginValidationRules = z.object({
  email: z.string().email("邮箱格式有误"),
  password: z
    .string()
    .min(6, "密码至少6位")
    .max(16, "密码最多16位")
    .refine((value) => /^[0-9A-Za-z_@#*()-=+=!?.,&^%$#]+$/.test(value), "密码含有非法字符"),
});
