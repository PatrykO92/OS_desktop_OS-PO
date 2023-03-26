import { TaskBar, Desktop } from "./src/components";
import "./src/assets/styles/workScreen.css";
import { useState } from "react";

import { DesktopContextMenu, MenuStart } from "./src/components";

import { CSSTransition } from "react-transition-group";

const WorkScreen = ({ lang, user, changeStage }) => {
  // useState hook for showing and hidding MenuStart
  const [showMenuStart, setShowMenuStart] = useState(true);
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
          />
        )}
        {/* I used here other approach to show and hide component, beacuse of curiosity */}
        <MenuStart
          showMenuStart={showMenuStart}
          lang={lang}
          user={user}
          changeStage={changeStage}
        />
      </div>
    </CSSTransition>
  );
};

export default WorkScreen;
