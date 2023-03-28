import "../assets/styles/desktop.css";
import { wallpaperOne } from "../assets/images/wallpapers";

const Desktop = () => {
  return (
    <div
      className="desktop"
      style={{ backgroundImage: `url(${wallpaperOne})` }}
    >
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
