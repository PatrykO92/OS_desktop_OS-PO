import { TaskBar, Desktop } from "./src/components";
import "./src/assets/styles/workScreen.css";
import { useState } from "react";

import { DesktopContextMenu } from "./src/components";

import { CSSTransition } from "react-transition-group";

const WorkScreen = ({ lang }) => {
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
        onClick={closeDesktopContextMenu}
      >
        <Desktop />
        <TaskBar lang={lang} />
        {desktopContextMenuPosition && (
          <DesktopContextMenu
            position={desktopContextMenuPosition}
            onClick={closeDesktopContextMenu}
          />
        )}
      </div>
    </CSSTransition>
  );
};

export default WorkScreen;
