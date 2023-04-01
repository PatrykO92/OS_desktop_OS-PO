import "../assets/styles/desktop.css";
import { wallpaperOne } from "../assets/images/wallpapers";

const Desktop = ({ handleStateToDoApp, handleStateWebBrowser }) => {
  return (
    <div
      className="desktop"
      style={{ backgroundImage: `url(${wallpaperOne})` }}
    >
      <button
        onClick={() => {
          handleStateToDoApp("hidden", false);
          handleStateToDoApp("programEnabled", true);
        }}
        className="icon"
      >
        <i>®</i>
        <p>To-Do-App</p>
      </button>
      <button
        onClick={() => {
          handleStateWebBrowser("hidden", false);
          handleStateWebBrowser("programEnabled", true);
        }}
        className="icon"
      >
        <i>®</i>
        <p>Web Browser</p>
      </button>
    </div>
  );
};

export default Desktop;
