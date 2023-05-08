import { APIClient } from "./axiosClient";

const AuthAPI = {
  Register: (data) => {
    const url = "/auth/register";
    return APIClient.post(url, data);
  },
  Login: (data) => {
    const url = "/auth/login";
    return APIClient.post(url, data);
  },
  ForgotPassword: (data) => {
    const url = "/auth/forgotPassword";
    return APIClient.post(url, data);
  },
  ChangePassword: (data) => {
    const url = "/auth/changePassword";
    return APIClient.post(url, data);
  },
  Logout: () => {
    const url = "/auth/logout";
    return APIClient.post(url);
  },
  ConfirmEmail: (token) => {
    const url = `/auth/confirmEmail/${token}`;
    return APIClient.put(url);
  },
};

export default AuthAPI;
