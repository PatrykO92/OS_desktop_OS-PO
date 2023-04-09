import "../assets/styles/personalizeApp.css";

import { useState, useEffect } from "react";

const Personalize = ({ lang, wallpaper, handleWallpaperChange }) => {
  const [theme, setTheme] = useState({
    themeBg: "",
    themeBgLight: "",
    themeFont: "",
  });

  useEffect(() => {
    // Get default color values
    const root = document.documentElement;
    const themeBg = getComputedStyle(root).getPropertyValue("--theme-bg");
    const themeBgLight =
      getComputedStyle(root).getPropertyValue("--theme-bg-light");
    const themeFont = getComputedStyle(root).getPropertyValue("--theme-font");

    setTheme({ themeBg, themeBgLight, themeFont });
  }, []);

  return (
    <div className="personalize-app">
      <div>
        <button
          onClick={() => {
            console.log(theme);
          }}
        >
          button
        </button>
        <div className="personalize-window">
          <div className="personalize-window__wallpaper">
            <p>Wallpaper</p>
            <img src={wallpaper} alt="placeholder" />
            <p>Choose other wallpaper:</p>
            <div className="personalize-window__wallpaper__list">
              <img src={wallpaper} alt="placeholder" />
              <img src={wallpaper} alt="placeholder" />
              <img src={wallpaper} alt="placeholder" />
              <img src={wallpaper} alt="placeholder" />
              <img src={wallpaper} alt="placeholder" />
              <img src={wallpaper} alt="placeholder" />
              <img src={wallpaper} alt="placeholder" />
              <img src={wallpaper} alt="placeholder" />
            </div>
          </div>

          <div className="personalize-window__main-color">
            <p>Main color</p>
            <div className="personalize-window__main-color__list">
              <button style={{ backgroundColor: "rgb(34, 57, 66)" }} />
              <button style={{ backgroundColor: "rgb(34, 66, 48)" }} />
              <button style={{ backgroundColor: "rgb(63, 66, 34)" }} />
              <button style={{ backgroundColor: "rgb(66, 48, 34)" }} />
              <button style={{ backgroundColor: "rgb(66, 34, 34)" }} />
              <button style={{ backgroundColor: "rgb(79, 42, 83)" }} />
              <button style={{ backgroundColor: "rgb(44, 44, 44)" }} />
              <button style={{ backgroundColor: "rgb(0, 0, 0)" }} />
            </div>
          </div>

          <div className="personalize-window__font-color">
            <p>Font color</p>
            <div className="personalize-window__font-color__list">
              <button style={{ color: "hsl(0, 0%, 100%)" }}>
                Font Color 1
              </button>
              <button style={{ color: "#85d8ff" }}>Font Color 2</button>
              <button style={{ color: "#97ff9c" }}>Font Color 3</button>
              <button style={{ color: "#e9ff85" }}>Font Color 4</button>
              <button style={{ color: "#fd9696" }}>Font Color 5</button>
              <button style={{ color: "#fdbf96" }}>Font Color 6</button>
              <button style={{ color: "#c696fd" }}>Font Color 7</button>
              <button style={{ color: "#fcacff" }}>Font Color 8</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personalize;
