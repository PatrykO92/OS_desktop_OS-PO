import React from "react";
import { useState, useEffect } from "react";
import { fetchNewsData } from "../../../utils";

const NewsBox = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [newsData, setNewsData] = useState(null);

  // fetch data at rendering component
  useEffect(() => {
    fetchNewsData("pl")
      .then((data) => {
        setNewsData(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          console.log(newsData?.data?.articles[0]);
        }}
      >
        Halloł
      </button>
      {isLoading ? (
        <div>Is loading</div>
      ) : (
        <div>{newsData?.data?.articles[0]?.author}</div>
      )}
    </div>
  );
};

export default NewsBox;
