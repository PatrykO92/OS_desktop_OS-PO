import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const addTetrisScore = async (userTag, score) => {
  const token = localStorage.getItem("authToken");
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };
  const data = {
    game_tag: userTag,
    score: score,
  };
  try {
    await axios.post(`${apiUrl}api/v1/tetris/`, data, config);
  } catch (error) {
    console.error("Problem with server");
  }
};

export default addTetrisScore;
