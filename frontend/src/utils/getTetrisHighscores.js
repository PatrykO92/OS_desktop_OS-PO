import axiosInstance from "./axiosInstance";

const getTetrisHighscores = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/tetris/`);
    return response.data;
  } catch (error) {
    console.error("Problem with server");
  }
};

export default getTetrisHighscores;
