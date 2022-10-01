import { instance } from "./index";

function doLogin(loginInfo, success, error) {
  instance.post(`/auth/login`, loginInfo, {}).then(success).catch(error);
}

export { doLogin };
