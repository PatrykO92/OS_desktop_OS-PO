import "../assets/styles/webBrowser.css";
import { menuStartIcon } from "../assets/icons";

import { LoadingSpinner } from "./";

import { useState, useEffect } from "react";

const WebBrowser = ({ lang, passUrl }) => {
  const defaultUrl = passUrl ? passUrl : "//react.dev/";
  const [url, setUrl] = useState(defaultUrl);
  const [loading, setLoading] = useState(true);

  const handleIframeLoad = () => {
    setLoading(false);
  };

  useEffect(() => {
    if (passUrl) setUrl(passUrl);
  }, [passUrl]);

  useEffect(() => {
    setLoading(true);
  }, [url]);

  return (
    <div className="web-browser">
      <div className="web-browser_alert">{lang.webBrowserInfo}</div>
      <div className="web-browser_menu">
        <button
          onClick={() => {
            setUrl("//react.dev/");
          }}
        >
          <img src={menuStartIcon} alt={lang.home} />
        </button>
        <button
          onClick={() => {
            setUrl("//www.newsinlevels.com/");
          }}
        >
          {lang.news}
        </button>
      </div>

      <div
        className="web-browser_loading"
        style={{ display: loading ? "flex" : "none" }}
      >
        <LoadingSpinner />
      </div>

      <iframe
        style={{ display: loading ? "none" : "block" }}
        sandbox="allow-same-origin allow-forms allow-scripts"
        width="100%"
        src={url}
        type="text/html"
        aria-label={lang.webBrowserInfoShort}
        title={lang.webBrowserInfoShort}
        onLoad={handleIframeLoad}
      ></iframe>
    </div>
  );
};

export default WebBrowser;
