import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const loginToBackend = (username, email, password, defaultUser) =>
  axios
    .post(`${apiUrl}api/dj-rest-auth/login/`, {
      username,
      email,
      password,
    })
    .then((response) => {
      const token = response.data.key;
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(defaultUser));
      console.log(JSON.stringify(defaultUser));
      return true;
    })
    .catch((error) => {
      throw new Error(error.message);
    });

export default loginToBackend;
