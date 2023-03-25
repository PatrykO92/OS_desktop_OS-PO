import React from "react";

import "../assets/styles/desktop.css";
import wallpaper from "../assets/wallpapers/endless-constellation.svg";

const Desktop = () => {
  return (
    <div className="desktop" style={{ backgroundImage: `url(${wallpaper})` }}>
      <button className="icon">Icon 1</button>
      <button className="icon">Icon 2</button>
    </div>
  );
};

export default Desktop;
