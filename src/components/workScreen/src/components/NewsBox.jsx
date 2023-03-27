import React from "react";
import { useState, useEffect } from "react";
import { fetchNewsData } from "../../../utils";
import { LoadingSpinner } from "../../../.";
import { placeholderNewsImage } from "../../../../assets/images/placeholder-images";
import "../assets/styles/newsBox.css";

const NewsBox = ({ lang }) => {
  const [newsTopic, setNewsTopic] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newsData, setNewsData] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  // fetch data at component start and change topic
  useEffect(() => {
    setIsLoading(true);
    fetchNewsData(lang.lngFetch, newsTopic, newsTopic)
      .then((data) => {
        setNewsData(data);
      })
      .catch((err) => {
        setFetchError(err);
      })
      .finally(setIsLoading(false));
  }, [newsTopic]);

  const oneArticle = (data) => {
    const backgroundImage = data.urlToImage
      ? `url(${data.urlToImage})`
      : `url(${placeholderNewsImage})`;

    return (
      <a href={data?.url} target="_blank" rel="noreferrer" key={data.url}>
        <div className="news-box-article" style={{ backgroundImage }}>
          <p>{data?.author}</p>
          <p>{data?.title}</p>
        </div>
      </a>
    );
  };

  return (
    <div className="news-box-wrapper">
      <div className="news-box">
        <div className="news-box-buttons">
          {" "}
          <button
            onClick={() => {
              setNewsTopic(lang.sport);
            }}
          >
            {lang.sport}
          </button>
          <button
            onClick={() => {
              setNewsTopic(lang.programming);
            }}
          >
            {lang.programming}
          </button>
          <button
            onClick={() => {
              setNewsTopic(lang.politic);
            }}
          >
            {lang.politic}
          </button>
          <button
            onClick={() => {
              setNewsTopic(lang.weather);
            }}
          >
            {lang.weather}
          </button>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : fetchError ? (
          <div className="news-box-error">{lang.fetchError}</div>
        ) : (
          <>{newsData?.data?.articles.map((item) => oneArticle(item))}</>
        )}
      </div>
    </div>
  );
};

export default NewsBox;
