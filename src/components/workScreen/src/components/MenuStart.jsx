import "../assets/styles/menuStart.css";
import { powerOffIcon, restartIcon } from "../assets/icons";

const MenuStart = ({ showMenuStart, lang, user, changeStage }) => {
  return (
    <div className={`menu-start ${showMenuStart ? "hidden-menu-start" : ""}`}>
      <div className="menu-start-programs"></div>
      <div className="menu-start-utils">
        <button
          onClick={() => {
            console.log(changeStage);
          }}
        >
          <img
            src={user.avatar}
            alt={lang.name + " " + lang.surname}
            className="menu-start-avatar"
          />
          <p>
            {user.name} {user.surname}
          </p>
        </button>
        <div>
          <button
            onClick={() => {
              changeStage("resetScreen");
            }}
          >
            <img
              src={restartIcon}
              alt={lang.restart}
              className="menu-start-button-img "
            />
          </button>
          <button
            onClick={() => {
              changeStage("closeScreen");
            }}
          >
            <img
              src={powerOffIcon}
              alt={lang.power}
              className="menu-start-button-img"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuStart;
