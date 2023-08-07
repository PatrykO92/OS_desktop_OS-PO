import axiosInstance from "./axiosInstance";

const fetchNewsData = async (country, category) => {
  try {
    const requestData = {
      country,
      category,
    };

    const response = await axiosInstance.post("/api/v1/news/", requestData);
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export default fetchNewsData;
