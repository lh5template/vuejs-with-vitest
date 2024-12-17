import { http, requestWithMapper } from "@/tools/http";
import { loginRequestMapper, loginResponseMapper } from "./mappers/login";

/**
 * @description 登录接口
 * POST /api/auth
 * @param {Object} data -  data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const login = (data) => {
  return requestWithMapper({
    requestFunc: () => http.post("/api/login", data),
    requestDataMapper: loginRequestMapper,
    responseMapper: loginResponseMapper,
  });
};
