import axios from "axios";
import { hasToken, getToken } from "./token";
import { httpErrorHandler } from "./httpErrorHandler";

export const TOKEN_HEADER_KEY = "Authorization";

export const http = axios.create({
	timeout: 1000 * 5, // 5s
	headers: {
		Accept: "application/json",
	},
});

http.interceptors.request.use((config) => {
	if (hasToken()) {
		config.headers[TOKEN_HEADER_KEY] = getToken();
	}

	return config;
});

const responseInterceptor = http.interceptors.response;
responseInterceptor.use(
	(res) => {
		if (res.status === 200) {
			return res.data;
		}
		return Promise.reject(res);
	},
	(err) => {
		httpErrorHandler(err);
	},
);

export const registerMapper = (mapper) =>
	responseInterceptor.use((res) => mapper(res.data));
export const removeMapper = (interceptor) =>
	responseInterceptor.eject(interceptor);
