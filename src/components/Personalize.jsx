import "../assets/styles/personalizeMenu.css";
import {
  wallpaperOne,
  wallpaperTwo,
  wallpaperThree,
  wallpaperFour,
  wallpaperFive,
  wallpaperSix,
  wallpaperSeven,
  wallpaperEight,
} from "../assets/images/wallpapers";

import { useState, useEffect } from "react";

const Personalize = ({ lang, wallpaper, handleWallpaperChange }) => {
  // FIX THIS TO SAVE AND GET VALUES FROM USER

  const [theme, setTheme] = useState({
    themeBg: "",
    themeBgLight: "",
    themeFont: "",
  });

  useEffect(() => {
    // Get default theme values
    const root = document.documentElement;
    const themeBg = getComputedStyle(root).getPropertyValue("--theme-bg");
    const themeBgLight =
      getComputedStyle(root).getPropertyValue("--theme-bg-light");
    const themeFont = getComputedStyle(root).getPropertyValue("--theme-font");

    setTheme({ themeBg, themeBgLight, themeFont });
  }, []);

  useEffect(() => {
    // set theme values, when useState theme hook is changed
    const root = document.documentElement;
    root.style.setProperty("--theme-bg", theme.themeBg);
    root.style.setProperty("--theme-bg-light", theme.themeBgLight);
    root.style.setProperty("--theme-font", theme.themeFont);
  }, [theme]);

  const handleThemeBgColorChange = (e) => {
    const colorVal = e.target.style.backgroundColor;
    // second color is the same as primary, but with 0.75 opacity
    const secondColorVal = `rgba${colorVal.slice(3, -1)}, 0.75`;
    setTheme((oldVal) => ({
      ...oldVal,
      themeBg: colorVal,
      themeBgLight: secondColorVal,
    }));
  };

  const handleThemeFontColorChange = (e) => {
    setTheme((oldVal) => ({
      ...oldVal,
      themeFont: e.target.style.color,
    }));
  };

  return (
    <div className="personalize-menu">
      <div className="personalize-window__wallpaper">
        <p>{lang.wallpaper}</p>
        <img src={wallpaper} alt={`${lang.wallpaper}`} />
        <div className="personalize-window__wallpaper__list">
          <img
            src={wallpaperOne}
            alt={`${lang.wallpaper} 1`}
            onClick={() => handleWallpaperChange(wallpaperOne)}
          />
          <img
            src={wallpaperTwo}
            alt={`${lang.wallpaper} 2`}
            onClick={() => handleWallpaperChange(wallpaperTwo)}
          />
          <img
            src={wallpaperThree}
            alt={`${lang.wallpaper} 3`}
            onClick={() => handleWallpaperChange(wallpaperThree)}
          />
          <img
            src={wallpaperFour}
            alt={`${lang.wallpaper} 4`}
            onClick={() => handleWallpaperChange(wallpaperFour)}
          />
          <img
            src={wallpaperFive}
            alt={`${lang.wallpaper} 5`}
            onClick={() => handleWallpaperChange(wallpaperFive)}
          />
          <img
            src={wallpaperSix}
            alt={`${lang.wallpaper} 6`}
            onClick={() => handleWallpaperChange(wallpaperSix)}
          />
          <img
            src={wallpaperSeven}
            alt={`${lang.wallpaper} 7`}
            onClick={() => handleWallpaperChange(wallpaperSeven)}
          />
          <img
            src={wallpaperEight}
            alt={`${lang.wallpaper} 8`}
            onClick={() => handleWallpaperChange(wallpaperEight)}
          />
        </div>
      </div>

      <div className="personalize-window__main-color">
        <p>{lang.mainColor}</p>
        <div className="personalize-window__main-color__list">
          <button
            style={{ backgroundColor: "#1c2326" }}
            onClick={handleThemeBgColorChange}
          />
          <button
            style={{ backgroundColor: "#223942" }}
            onClick={handleThemeBgColorChange}
          />
          <button
            style={{ backgroundColor: "#224230" }}
            onClick={handleThemeBgColorChange}
          />
          <button
            style={{ backgroundColor: "#3f4222" }}
            onClick={handleThemeBgColorChange}
          />
          <button
            style={{ backgroundColor: "#423022" }}
            onClick={handleThemeBgColorChange}
          />
          <button
            style={{ backgroundColor: "#422222" }}
            onClick={handleThemeBgColorChange}
          />
          <button
            style={{ backgroundColor: "#4f2a53" }}
            onClick={handleThemeBgColorChange}
          />
          <button
            style={{ backgroundColor: "#000000" }}
            onClick={handleThemeBgColorChange}
          />
        </div>
      </div>

      <div className="personalize-window__font-color">
        <p>{lang.fontColor}</p>

        <div className="personalize-window__font-color__list">
          <button
            style={{ color: "#ffffff" }}
            onClick={handleThemeFontColorChange}
          >
            {lang.fontColor} 1
          </button>
          <button
            style={{ color: "#85d8ff" }}
            onClick={handleThemeFontColorChange}
          >
            {lang.fontColor} 2
          </button>
          <button
            style={{ color: "#97ff9c" }}
            onClick={handleThemeFontColorChange}
          >
            {lang.fontColor} 3
          </button>
          <button
            style={{ color: "#e9ff85" }}
            onClick={handleThemeFontColorChange}
          >
            {lang.fontColor} 4
          </button>
          <button
            style={{ color: "#fd9696" }}
            onClick={handleThemeFontColorChange}
          >
            {lang.fontColor} 5
          </button>
          <button
            style={{ color: "#fdbf96" }}
            onClick={handleThemeFontColorChange}
          >
            {lang.fontColor} 6
          </button>
          <button
            style={{ color: "#c696fd" }}
            onClick={handleThemeFontColorChange}
          >
            {lang.fontColor} 7
          </button>
          <button
            style={{ color: "#fcacff" }}
            onClick={handleThemeFontColorChange}
          >
            {lang.fontColor} 8
          </button>
        </div>
      </div>
      <div className="personalize-window__buttons">
        <button
          onClick={() => {
            setTheme({
              themeBg: "#1c2326",
              themeBgLight: "#1c2326cb",
              themeFont: "#ffffff",
            });
            handleWallpaperChange(wallpaperFive);
          }}
        >
          {lang.setDefault}
        </button>
      </div>
    </div>
  );
};

export default Personalize;
