import styles from "../assets/styles/personalizeMenu.module.css";
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

const Personalize = ({ lang, user, changeUser }) => {
  const handleThemeBgColorChange = (e) => {
    const colorVal = e.target.style.backgroundColor;
    // second color is the same as primary, but with 0.75 opacity
    const secondColorVal = `rgba${colorVal.slice(3, -1)}, 0.75`;

    changeUser((oldVal) => ({
      ...oldVal,
      settings: {
        ...oldVal.settings,
        themeBg: colorVal,
        themeBgLight: secondColorVal,
      },
    }));
  };

  const handleThemeFontColorChange = (e) => {
    changeUser((oldVal) => ({
      ...oldVal,
      settings: { ...oldVal.settings, themeFont: e.target.style.color },
    }));
  };

  const handleWallpaperChange = (wallpaper) => {
    changeUser((oldVal) => ({
      ...oldVal,
      settings: { ...oldVal.settings, wallpaper: wallpaper },
    }));
  };

  return (
    <div className={styles.personalize}>
      <div className={styles.wallpaperSection}>
        <p>{lang.wallpaper}</p>
        <img src={user.settings.wallpaper} alt={`${lang.wallpaper}`} />
        <div className={styles.wallpaperList}>
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

      <div className={styles.mainColorSection}>
        <p>{lang.mainColor}</p>
        <div className={styles.mainColorList}>
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

      <div className={styles.fontColorSection}>
        <p>{lang.fontColor}</p>

        <div className={styles.fontColorList}>
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
      <div className={styles.buttons}>
        <button
          onClick={() => {
            changeUser((oldVal) => ({
              ...oldVal,
              settings: {
                ...oldVal.settings,
                themeBg: "#1c2326",
                themeBgLight: "#1c2326cb",
                themeFont: "#ffffff",
                wallpaper: wallpaperFive,
              },
            }));
          }}
        >
          {lang.setDefault}
        </button>
      </div>
    </div>
  );
};

export default Personalize;
