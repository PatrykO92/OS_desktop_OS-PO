import "../assets/styles/workScreen.css";
import { TaskBar, Desktop, DesktopContextMenu, MenuStart } from "./";

import { useState } from "react";

import { CSSTransition } from "react-transition-group";

const WorkScreen = ({ lang, user, changeStage }) => {
  // useState hook for showing and hidding MenuStart
  const [showMenuStart, setShowMenuStart] = useState(false);
  const handleShowMenuStart = () => {
    setShowMenuStart((oldVal) => !oldVal);
  };

  // useState hook for setting where to display DesktopContextMenu
  const [desktopContextMenuPosition, setDesktopContextMenuPosition] =
    useState(null);

  const closeDesktopContextMenu = () => {
    setDesktopContextMenuPosition(null);
  };

  const handleDesktopContextMenu = (e, setDesktopContextMenuPosition) => {
    e.preventDefault();
    if (e.target.className !== "desktop") return;
    setDesktopContextMenuPosition({
      x: e.nativeEvent.clientX,
      y: e.nativeEvent.clientY,
    });
  };

  return (
    <CSSTransition in={true} appear={true} timeout={5000} classNames="enter">
      <div
        className="work-screen"
        onContextMenu={(e) =>
          handleDesktopContextMenu(e, setDesktopContextMenuPosition)
        }
        onClick={() => {
          closeDesktopContextMenu();
        }}
      >
        <Desktop />
        <TaskBar lang={lang} handleShowMenuStart={handleShowMenuStart} />
        {desktopContextMenuPosition && (
          <DesktopContextMenu
            position={desktopContextMenuPosition}
            onClick={closeDesktopContextMenu}
            lang={lang}
          />
        )}
        <MenuStart
          showMenuStart={showMenuStart}
          lang={lang}
          user={user}
          changeStage={changeStage}
        />
        {}
      </div>
    </CSSTransition>
  );
};

export default WorkScreen;
