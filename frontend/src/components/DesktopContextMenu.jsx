import styles from "../assets/styles/desktopContextMenu.module.css";
import {
  brushIcon,
  desktopIcon,
  refreshIcon,
  xmarkIcon,
} from "../assets/icons";

import { useState, useContext } from "react";

import { CSSTransition } from "react-transition-group";

import { WholeAppContext } from "../App";

const DesktopContextMenu = ({
  position,
  closeDesktopContextMenu,
  closeAll,
}) => {
  const {
    lang,
    changeUser,
    handleStatePersonalize,
    wholeScreenRef,
    closeAllPrograms,
  } = useContext(WholeAppContext);

  const [showView, setShowView] = useState(false);

  const updateIconSize = (newSize) => {
    changeUser((oldValue) => ({
      ...oldValue,
      settings: {
        ...oldValue.settings,
        iconSize: newSize,
      },
    }));
  };

  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={1000}
      classNames="desktop-context"
      unmountOnExit
    >
      <div
        className={styles.contextMenu}
        style={{
          top: position.y,
          left: position.x,
        }}
        onClick={(e) => {
          if (
            e.target.closest("button")?.id !==
            "desktop-contex-menu__view-button"
          )
            closeDesktopContextMenu();
        }}
      >
        <button
          id="desktop-contex-menu__view-button"
          onClick={() => {
            setShowView((oldVal) => !oldVal);
          }}
        >
          <p>
            <img src={desktopIcon} alt={lang.view} />
          </p>
          <p>{lang.view}</p>
        </button>

        <CSSTransition
          in={showView}
          timeout={200}
          classNames="desktop-context"
          unmountOnExit
        >
          <div className={styles.menuView}>
            <button onClick={() => updateIconSize("5rem")}>
              <p>{lang.iconsSmall}</p>
            </button>
            <button onClick={() => updateIconSize("7rem")}>
              <p>{lang.iconsMedium}</p>
            </button>
            <button onClick={() => updateIconSize("9rem")}>
              <p>{lang.iconsBig}</p>
            </button>
          </div>
        </CSSTransition>

        <button
          onClick={() => {
            handleStatePersonalize("programEnabled", true);
            handleStatePersonalize("hidden", false);
          }}
        >
          <p>
            <img src={brushIcon} alt={lang.personalize} />
          </p>
          <p>{lang.personalize}</p>
        </button>
        <button
          onClick={() => {
            wholeScreenRef.current.classList.add(styles.refreshScreen);
            setTimeout(() => {
              wholeScreenRef.current.classList.remove(styles.refreshScreen);
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
            closeAll();
            handleStatePersonalize();
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
};

export default DesktopContextMenu;
