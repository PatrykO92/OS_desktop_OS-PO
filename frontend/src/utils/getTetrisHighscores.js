import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const getTetrisHighscores = async () => {
  const token = localStorage.getItem("authToken");
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  try {
    const response = await axios.get(`${apiUrl}api/v1/tetris/`, config);
    return response.data;
  } catch (error) {
    console.error("Problem with server");
  }
};

export default getTetrisHighscores;
