import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;
const username = process.env.REACT_APP_USERNAME;
const email = process.env.REACT_APP_EMAIL;
const password = process.env.REACT_APP_PASSWORD;

const loginToBackend = () =>
  axios
    .post(`${apiUrl}api/dj-rest-auth/login/`, {
      username,
      email,
      password,
    })
    .then((response) => {
      const token = response.data.key;
      localStorage.setItem("authToken", token);

      // Handle login success
      console.log("Login successful!");
      // Call any function to do something after successful login
    })
    .catch((error) => {
      console.log(error);
    });

export default loginToBackend;
