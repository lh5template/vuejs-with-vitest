import axios from "axios";
import { hasToken, getToken } from "./token";
import { httpErrorHandler } from "./httpErrorHandler";
import { uuid, isObject, toRawObject } from "@/tools";

//////////////////////////////////////////////
// create http instance with default config //
//////////////////////////////////////////////.
export const http = axios.create({
  timeout: 1000 * 5, // 5s
  headers: {
    Accept: "application/json",
  },
});

//////////////////////////////////////////
// http global interceptors for request //
//////////////////////////////////////////
http.interceptors.request.use((config) => {
  // convert vue reactive data to raw object
  config.data = toRawObject(config.data);
  config.params = toRawObject(config.params);
  return config;
});

export const REQUEST_ID_KEY = "x-request-id";
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
  (res) => {
    if (res.status === 200) {
      return res.data;
    }
    return Promise.reject(res);
  },
  (err) => httpErrorHandler(err),
);
