import "../assets/styles/desktop.css";
import { wallpaperOne } from "../assets/images/wallpapers";

const Desktop = ({ handleStateToDoApp }) => {
  return (
    <div
      className="desktop"
      style={{ backgroundImage: `url(${wallpaperOne})` }}
    >
      <button
        onClick={() => {
          handleStateToDoApp("hidden", false);
          handleStateToDoApp("programOn", true);
        }}
        className="icon"
      >
        <i>®</i>
        <p>To-Do-App</p>
      </button>
      <button className="icon">
        <i>®</i>
        <p>Icon</p>
      </button>
    </div>
  );
};

export default Desktop;
