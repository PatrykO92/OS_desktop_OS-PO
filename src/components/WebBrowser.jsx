import "../assets/styles/webBrowser.css";

import React, { useState, useRef } from "react";

function WebBrowser() {
  const [webBrowserUrl, setWebBrowserUrl] = useState("www.bing.com");
  const [url, setUrl] = useState("www.bing.com");
  const iframeRef = useRef();

  return (
    <div className="web-browser">
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setWebBrowserUrl(url);
          }}
        >
          <button>ba</button>
          <button>®</button>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </form>
      </div>
      <iframe
        ref={iframeRef}
        width="100%"
        src={`//${webBrowserUrl}`}
        type="text/html"
        aria-label="Web Browser"
      ></iframe>
    </div>
  );
}

export default WebBrowser;
