import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const loginToBackend = async (email, password) =>
  axios
    .post(`${apiUrl}api/v1/dj-rest-auth/login/`, {
      email,
      password,
    })
    .then((response) => {
      const token = response.data.key;
      localStorage.setItem("authToken", token);
      return response;
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error.message);
    });

export default loginToBackend;
