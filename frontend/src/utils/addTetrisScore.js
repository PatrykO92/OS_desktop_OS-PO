import axiosInstance from "./axiosInstance";

const addTetrisScore = async (userTag, score) => {
  if (score === 0) return;
  const data = {
    game_tag: userTag,
    score: score,
  };
  try {
    await axiosInstance.post(`/api/v1/tetris/`, data);
  } catch (error) {
    console.error("Problem with server");
  }
};

export default addTetrisScore;
