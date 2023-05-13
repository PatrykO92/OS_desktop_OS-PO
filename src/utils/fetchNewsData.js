import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const fetchNewsData = async (country, category) => {
  try {
    const response = await axios.get(
      `${apiUrl}api/newsapi/get?country=${country}&category=${category}`
    );
    return response;
  } catch (err) {
    throw new Error(err);
  }
};
export default fetchNewsData;
