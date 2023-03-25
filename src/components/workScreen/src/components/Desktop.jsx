import React from "react";

import "../assets/styles/desktop.css";
import wallpaper from "../assets/wallpapers/endless-constellation.svg";

const Desktop = () => {
  return (
    <div className="desktop" style={{ backgroundImage: `url(${wallpaper})` }}>
      <button className="icon">
        <i>®</i>
        <p>Icon</p>
      </button>
      <button className="icon">
        <i>®</i>
        <p>Icon</p>
      </button>
    </div>
  );
};

export default Desktop;
