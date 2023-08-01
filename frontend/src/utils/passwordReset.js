import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const passwordReset = async (email) =>
  axios
    .post(`${apiUrl}api/v1/dj-rest-auth/password/reset/`, {
      email,
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw new Error(error.message);
    });

export default passwordReset;
