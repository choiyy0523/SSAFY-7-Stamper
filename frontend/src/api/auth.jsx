import { instance } from "./index";

/*
  loginInfo: {userId, userPassword}
  response.data: {statusCode, message, accessToken}
 */
function doLogin(loginInfo, success, error) {
  instance.post(`/auth/login`, loginInfo, {}).then(success).catch(error);
}

export { doLogin };
