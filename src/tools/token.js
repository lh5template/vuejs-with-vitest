export const __TOKEN_KEY__ = "__auth_token__";
export const storage = window.localStorage;

export const getToken = () => storage.getItem(__TOKEN_KEY__);

export const setToken = (token) => storage.setItem(__TOKEN_KEY__, token);
export const saveToken = setToken;

export const hasToken = () => Boolean(getToken());

export const deleteToken = () => storage.removeItem(__TOKEN_KEY__);
export const removeToken = deleteToken;
