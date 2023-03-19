import axiosClient from "./axiosClient";

const authApi = {
  register: (params) => axiosClient.post("auth/register", params),
  login: (params) => axiosClient.post("auth/login", params),
  verifyToken: () => axiosClient.post("auth/varify-token"),
};

export default authApi;
