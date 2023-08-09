import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const loginToBackend = async (email, password) => {
  try {
    const response = await axios.post(`${apiUrl}/api/v1/dj-rest-auth/login/`, {
      email,
      password,
    });

    const token = response.data.key;
    localStorage.setItem("authToken", token);

    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default loginToBackend;
