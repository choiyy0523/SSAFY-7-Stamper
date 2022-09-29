import { instance } from "./index";

function doLogin(loginInfo, success, error) {
  instance.post(`/auth/login`, loginInfo, {}).then(success).catch(error);
}

export { doLogin };

export const REGISTER_USER = "REGISTER_USER";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const AUTH_USER = "AUTH_USER";