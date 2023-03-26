import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;

const fetchNewsData = (lang) => {
  const data = axios
    .get(
      "https://newsapi.org/v2/top-headlines?" +
        `country=${lang}&` +
        `apiKey=${apiKey}`
    )
    .then(function (response) {
      return response;
    })
    .catch(function (err) {
      throw new Error(err);
    });
  return data;
};
export default fetchNewsData;
