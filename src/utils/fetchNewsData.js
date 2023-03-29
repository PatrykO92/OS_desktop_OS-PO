import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;

const fetchNewsData = (lang, topHead, topic) => {
  return axios
    .get(
      // Remove ___ to make the URL functional again, blocked because of using a free account
      `ht___tps://newsapi.org/v2/${
        !topHead ? "top-headlines" : "everything"
      }?` +
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
