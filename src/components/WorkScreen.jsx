import "../assets/styles/workScreen.css";
import { TaskBar, Desktop, DesktopContextMenu, MenuStart } from "./";

import { useState } from "react";

import { CSSTransition } from "react-transition-group";

const WorkScreen = ({
  lang,
  user,
  changeStage,
  toDoApp,
  handleStateToDoApp,
  webBrowser,
  handleStateWebBrowser,
}) => {
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
        <Desktop
          handleStateToDoApp={handleStateToDoApp}
          handleStateWebBrowser={handleStateWebBrowser}
          toDoApp={toDoApp}
          webBrowser={webBrowser}
        />
        {desktopContextMenuPosition && (
          <DesktopContextMenu
            position={desktopContextMenuPosition}
            onClick={closeDesktopContextMenu}
            lang={lang}
          />
        )}

        <TaskBar
          lang={lang}
          handleShowMenuStart={handleShowMenuStart}
          toDoApp={toDoApp}
          handleStateToDoApp={handleStateToDoApp}
          webBrowser={webBrowser}
          handleStateWebBrowser={handleStateWebBrowser}
        />
        <MenuStart
          showMenuStart={showMenuStart}
          lang={lang}
          user={user}
          changeStage={changeStage}
          handleStateWebBrowser={handleStateWebBrowser}
        />
      </div>
    </CSSTransition>
  );
};

export default WorkScreen;
