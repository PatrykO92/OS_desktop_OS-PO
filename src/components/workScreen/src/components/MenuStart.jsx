import "../assets/styles/menuStart.css";
import { powerOffIcon } from "../assets/icons";

const MenuStart = ({ showMenuStart, lang, user, changeStage }) => {
  return (
    <div className={`menu-start ${showMenuStart ? "hidden-menu-start" : ""}`}>
      <div className="menu-start-programs"></div>
      <div className="menu-start-utils">
        <button
          onClick={() => {
            console.log(user, lang, showMenuStart, changeStage);
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
        <button>
          <img
            src={powerOffIcon}
            alt={lang.power}
            className="menu-start-power-off"
          />
        </button>
      </div>
    </div>
  );
};

export default MenuStart;
