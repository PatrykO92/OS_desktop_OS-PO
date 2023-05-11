import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;

const fetchNewsData = (lang, topHead, topic) => {
  return axios
    .get(
      `htt__ps://newsapi.org/v2/${!topHead ? "top-headlines" : "everything"}?` +
        `language=${lang}&` +
        `${topic ? `q=${topic}&` : ""}` +
        `${!topHead ? "" : "sortBy=relevancy&"}` +
        "pageSize=5&" +
        `apiKey=${apiKey}`
    )
    .then(function (response) {
      return response;
    })
    .catch(function (err) {
      throw new Error(err);
    });
};
export default fetchNewsData;
