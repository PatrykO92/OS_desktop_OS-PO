import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const getUserDetail = async () => {
  try {
    const authToken = localStorage.getItem("authToken");
    const response = await axios.get(`${apiUrl}api/v1/dj-rest-auth/user/`, {
      headers: {
        Authorization: `Token ${authToken}`,
      },
    });
    return response.data; // Return the user data from the response
  } catch (error) {
    throw new Error(error.message);
  }
};

export default getUserDetail;
