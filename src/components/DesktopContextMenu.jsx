import "../assets/styles/desktopContextMenu.css";

import {
  brushIcon,
  desktopIcon,
  refreshIcon,
  xmarkIcon,
} from "../assets/icons";

import { CSSTransition } from "react-transition-group";

const DesktopContextMenu = ({
  wholeScreenRef,
  lang,
  position,
  onClick,
  closeAllPrograms,
  handleCloseCalendar,
  handleCloseMenuStart,
  handleStatePersonalize,
}) => (
  <CSSTransition
    in={true}
    appear={true}
    timeout={1000}
    classNames="desktop-context"
    unmountOnExit
  >
    <div
      id="desktop-context-menu"
      style={{
        top: position.y,
        left: position.x,
      }}
      onClick={onClick}
    >
      <button>
        <p>
          <img src={desktopIcon} alt={lang.view} />
        </p>
        <p>{lang.view}</p>
      </button>
      <button
        onClick={() => {
          handleStatePersonalize("hidden", false);
          handleStatePersonalize("programEnabled", true);
        }}
      >
        <p>
          <img src={brushIcon} alt={lang.personalize} />
        </p>
        <p>{lang.personalize}</p>
      </button>
      <button
        onClick={() => {
          wholeScreenRef.current.classList.add("refresh-screen");
          setTimeout(() => {
            wholeScreenRef.current.classList.remove("refresh-screen");
          }, 50);
        }}
      >
        <p>
          <img src={refreshIcon} alt={lang.refresh} />
        </p>
        <p>{lang.refresh}</p>
      </button>
      <button
        onClick={() => {
          closeAllPrograms();
          handleCloseCalendar();
          handleCloseMenuStart();
        }}
      >
        <p>
          <img src={xmarkIcon} alt={lang.closeAll} />
        </p>
        <p>{lang.closeAll}</p>
      </button>
    </div>
  </CSSTransition>
);

export default DesktopContextMenu;
