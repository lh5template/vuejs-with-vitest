import { http } from "@/tools/http";
import { loginMapper } from "./mappers/login";

/**
 * @description 登录接口
 * POST /api/auth
 * @param {Object} data -  data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const login = async (data) => {
  const res = await http.post("/api/login", data);
  return loginMapper(res);
};
