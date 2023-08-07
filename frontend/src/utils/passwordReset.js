import axiosInstance from "./axiosInstance";

const passwordReset = async (email) =>
  axiosInstance
    .post(`/api/v1/dj-rest-auth/password/reset/`, {
      email,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw new Error(error.message);
    });

export default passwordReset;
