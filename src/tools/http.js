import axios from "axios";
import { extend, isCallable, isObject, uuid } from "@/tools";
import { httpErrorHandler } from "./httpErrorHandler";
import { getToken, hasToken } from "./token";

//////////////////////////////////////////////
// create http instance with default config //
//////////////////////////////////////////////
export const baseURL = import.meta.env.VITE_BASE_URL;
export const http = axios.create({
  baseURL,
  timeout: 1000 * 5, // 5s
  headers: {
    Accept: "application/json",
  },
});

//////////////////////////////////////////
// http global interceptors for request //
//////////////////////////////////////////
export const REQUEST_ID_KEY = "request_id";
http.interceptors.request.use((config) => {
  // set request id
  if (!isObject(config.params)) {
    config.params = {};
  }
  config.params = Object.assign(config.params, {
    [REQUEST_ID_KEY]: uuid(),
  });
  return config;
});

export const TOKEN_HEADER_KEY = "Authorization";
http.interceptors.request.use((config) => {
  // set token after login
  if (hasToken()) {
    config.headers[TOKEN_HEADER_KEY] = getToken();
  }
  return config;
});

///////////////////////////////////////////
// http global interceptors for response //
///////////////////////////////////////////
http.interceptors.response.use(
  (res) => res.status === 200 ? res.data : Promise.reject(res),
  (err) => httpErrorHandler(err),
);

///////////////////////////////////////////
// send request with mapper functions    //
///////////////////////////////////////////
export function requestWithMapper(opts = {}) {
  const options = extend({
    requestFunc: null,
    requestMapper: null,
    requestParamsMapper: null,
    requestDataMapper: null,
    responseMapper: null,
  }, opts);

  const { requestFunc, requestMapper, requestParamsMapper, requestDataMapper, responseMapper } = options;
  if (!isCallable(requestFunc)) {
    throw new Error("[requestWithMapper]requestFunc must be a function");
  }

  const requestInterceptorArray = [];
  if (isCallable(requestMapper)) {
    requestInterceptorArray.push(requestMapper);
  }
  if (isCallable(requestParamsMapper)) {
    requestInterceptorArray.push((config) => {
      config.params = requestParamsMapper(config.params);
      return config;
    });
  }
  if (isCallable(requestDataMapper)) {
    requestInterceptorArray.push((config) => {
      config.data = requestDataMapper(config.data);
      return config;
    });
  }
  requestInterceptorArray.forEach((item) => {
    http.interceptors.request.use(item);
  });

  let responseInterceptor = null;
  if (isCallable(responseMapper)) {
    responseInterceptor = (response) => responseMapper(response);
    http.interceptors.response.use(responseInterceptor);
  }

  // auto remove interceptor after request sent
  return requestFunc().finally(() => {
    requestInterceptorArray.forEach((item) => {
      http.interceptors.request.eject(item);
    });
    if (responseInterceptor) {
      http.interceptors.response.eject(responseInterceptor);
    }
  });
}
