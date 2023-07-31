import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const fetchNewsData = async (country, category) => {
  const token = localStorage.getItem("authToken");
  const config = {
    headers: {
      Authorization: `Token ${token}`,
    },
  };

  try {
    const requestData = {
      country,
      category,
    };

    const response = await axios.post(
      `${apiUrl}api/v1/news/`,
      requestData,
      config
    );
    return response;
  } catch (err) {
    throw new Error(err);
  }
};

export default fetchNewsData;
