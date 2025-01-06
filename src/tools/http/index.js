import axios from "axios";
import { isCallable, isNull, isObject, merge, uuid } from "@/tools";
import { getToken, hasToken } from "@/tools/token";
import { httpErrorHandler } from "./httpErrorHandler";

//////////////////////////////////////////////
// get http instance                        //
//////////////////////////////////////////////
let httpInst = null;
export function getHttpInst() {
  if (isNull(httpInst)) {
    httpInst = createHttpInst();
  }
  return httpInst;
}

//////////////////////////////////////////////
// create http instance with default config //
//////////////////////////////////////////////
export const baseURL = import.meta.env.VITE_BASE_URL;
function createHttpInst() {
  const http = axios.create({
    baseURL,
    timeout: 1000 * 5, // 5s
    headers: {
      Accept: "application/json",
    },
  });

  applyRequesetIdInterceptor(http);
  applyTokenHeaderInterceptor(http);
  applyResponseInterceptor(http);

  return http;
}

//////////////////////////////////////////
// http global interceptors for request //
//////////////////////////////////////////
export const REQUEST_ID_KEY = "request_id";
function applyRequesetIdInterceptor(http) {
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
}

export const TOKEN_HEADER_KEY = "Authorization";
function applyTokenHeaderInterceptor(http) {
  http.interceptors.request.use((config) => {
    // set token after login
    if (hasToken()) {
      config.headers[TOKEN_HEADER_KEY] = getToken();
    }
    return config;
  });
}

///////////////////////////////////////////
// http global interceptors for response //
///////////////////////////////////////////
function applyResponseInterceptor(http) {
  http.interceptors.response.use(
    (res) => (res.status === 200 ? res.data : Promise.reject(res)),
    (err) => httpErrorHandler(err),
  );
}

///////////////////////////////////////////
// send request with mapper functions    //
///////////////////////////////////////////
export function requestWithMapper(opts = {}) {
  const defaultOpts = {
    httpInst: getHttpInst(),
    requestFunc: null,
    requestMapper: null,
    requestParamsMapper: null,
    requestDataMapper: null,
    responseMapper: null,
  };
  const options = merge(defaultOpts, opts);

  const { httpInst, requestFunc, requestMapper, requestParamsMapper, requestDataMapper, responseMapper } = options;
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
  for (let i = 0; i < requestInterceptorArray.length; i++) {
    const item = requestInterceptorArray[i];
    httpInst.interceptors.request.use(item);
  }

  let responseInterceptor = null;
  if (isCallable(responseMapper)) {
    responseInterceptor = (response) => responseMapper(response);
    httpInst.interceptors.response.use(responseInterceptor);
  }

  // auto remove interceptor after request sent
  return requestFunc().finally(() => {
    for (let i = 0; i < requestInterceptorArray.length; i++) {
      const item = requestInterceptorArray[i];
      httpInst.interceptors.request.eject(item);
    }
    if (!isNull(responseInterceptor)) {
      httpInst.interceptors.response.eject(responseInterceptor);
    }
  });
}
