import "../assets/styles/newsBox.css";
import { fetchNewsData } from "../utils";
import { LoadingSpinner } from "./";
import { newsPlaceholderImage } from "../assets/images/placeholder-images";

import { useState, useEffect } from "react";

const NewsBox = ({ lang, handleStateWebBrowser }) => {
  const [newsCategory, setNewsCategory] = useState("general");
  const [isLoading, setIsLoading] = useState(true);
  const [newsData, setNewsData] = useState(null);
  const [fetchError, setFetchError] = useState(false);
  const [actualNews, setActualNews] = useState(null);
  const [showActualNews, setShowActualNews] = useState(false);

  // fetch data at component start and change topic
  useEffect(() => {
    setIsLoading(true);
    fetchNewsData(lang.country, newsCategory)
      .then((data) => {
        setNewsData(data);
      })
      .catch((err) => {
        setFetchError(true);
      })
      .finally(setIsLoading(false));
  }, [newsCategory, lang.country]);

  const oneArticle = (data) => {
    const backgroundImage = data.urlToImage
      ? `url(${data.urlToImage})`
      : `url(${newsPlaceholderImage})`;

    return (
      <button
        key={data?.url}
        onClick={() => {
          setActualNews(data);
          setShowActualNews(true);
        }}
      >
        <div className="news-box-article" style={{ backgroundImage }}>
          <p>{data?.author}</p>
          <p>{data?.title}</p>
        </div>
      </button>
    );
  };

  return (
    <div className="news-box-wrapper">
      <div className="news-box">
        <div className="news-box-buttons">
          <button
            onClick={() => {
              setNewsCategory("sports");
            }}
          >
            {lang.sport}
          </button>
          <button
            onClick={() => {
              setNewsCategory("technology");
            }}
          >
            {lang.technology}
          </button>
          <button
            onClick={() => {
              setNewsCategory("business");
            }}
          >
            {lang.business}
          </button>
          <button
            onClick={() => {
              setNewsCategory("entertainment");
            }}
          >
            {lang.entertainment}
          </button>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : fetchError ? (
          <div className="news-box-error">{lang.fetchError}</div>
        ) : (
          <>{newsData?.data?.articles.map((item) => oneArticle(item))}</>
        )}
        {showActualNews && (
          <div className="news-box_actual-news">
            <p>{actualNews?.description}</p>
            <button
              onClick={(event) => {
                event.preventDefault();
                handleStateWebBrowser("programEnabled", true);
                handleStateWebBrowser("hidden", false);
                handleStateWebBrowser("defaultUrl", actualNews?.url);
              }}
            >
              {lang.link}
            </button>
            <button onClick={() => setShowActualNews(false)}>
              {lang.close}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsBox;
