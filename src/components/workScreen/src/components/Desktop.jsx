import React from "react";
import "../assets/styles/desktop.css";
import wallpaper from "../assets/wallpapers/protruding-squares.svg";

const Desktop = () => {
  return (
    <div className="desktop" style={{ backgroundImage: `url(${wallpaper})` }}>
      <button className="icon">1</button>
      <button className="icon">2</button>
      <button className="icon">3</button>
      <button className="icon">4</button>
      <button className="icon">5</button>
      <button className="icon">6</button>
      <button className="icon">7</button>
      <button className="icon">8</button>
      <button className="icon">9</button>
    </div>
  );
};

export default Desktop;
