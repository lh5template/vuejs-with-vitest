import { http, requestWithMapper } from "@/tools/http";
import { loginResponseMapper, loginRequestMapper } from "./mappers/login";

/**
 * @description 登录接口
 * POST /api/auth
 * @param {Object} data -  data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const login = (data) => requestWithMapper({
  requestFunc: () => http.post("/api/login", data),
  requestDataMapper: loginRequestMapper,
  responseMapper: loginResponseMapper,
});
