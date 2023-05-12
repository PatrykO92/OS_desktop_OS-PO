import "../assets/styles/workScreen.css";
import { wallpaperOne } from "../assets/images/wallpapers";
import {
  TaskBar,
  Desktop,
  DesktopContextMenu,
  MenuStart,
  Personalize,
} from "./";

import { useState, useEffect } from "react";

import { CSSTransition } from "react-transition-group";

import "intro.js/introjs.css";
import "../assets/styles/introjsMyStyling.css";

import { Steps } from "intro.js-react";

import Calendar from "react-calendar";
import "../assets/styles/myCalendar.css";

const WorkScreen = ({
  lang,
  user,
  changeStage,
  changeLang,
  toDoApp,
  handleStateToDoApp,
  webBrowser,
  handleStateWebBrowser,
  calculator,
  handleStateCalculator,
  tetris,
  handleStateTetris,
  closeAllPrograms,
}) => {
  // useState hook and handler function for changing Desktop wallpaper
  const [wallpaper, setWallpaper] = useState(wallpaperOne);
  const handleWallpaperChange = (image) => {
    setWallpaper(image);
  };

  // useState hook for showing and hidding MenuStart
  const [showMenuStart, setShowMenuStart] = useState(false);
  const handleShowMenuStart = () => {
    setShowMenuStart((oldVal) => !oldVal);
  };
  const handleCloseMenuStart = () => {
    setShowMenuStart(false);
  };

  // useState hook for showing and hidding Calendar
  const [showCalendar, setShowCalendar] = useState(false);
  const handleShowCalendar = () => {
    setShowCalendar((oldVal) => !oldVal);
  };
  const handleCloseCalendar = () => {
    setShowCalendar(false);
  };

  // useState hook needed for Calendar from Calendar lib
  const [value, onChange] = useState(new Date());

  // useState hook for setting where to display DesktopContextMenu
  const [desktopContextMenuPosition, setDesktopContextMenuPosition] =
    useState(null);

  const closeDesktopContextMenu = () => {
    setDesktopContextMenuPosition(null);
  };

  const handleDesktopContextMenu = (e, setDesktopContextMenuPosition) => {
    e.preventDefault();
    // #desktop-context-menu width value in rem
    const remValueX = 10;
    // #desktop-context-menu height value in rem
    const remValueY = 9;
    const pixelValueX =
      parseInt(getComputedStyle(document.documentElement).fontSize) * remValueX;
    const pixelValueY =
      parseInt(getComputedStyle(document.documentElement).fontSize) * remValueY;
    let y = e.nativeEvent.clientY;
    let x = e.nativeEvent.clientX;

    if (window.innerHeight - y < pixelValueY) {
      y = y - pixelValueY;
    }
    if (window.innerWidth - x < pixelValueX) {
      x = x - pixelValueX;
    }
    if (e.target.className !== "desktop") return;
    setDesktopContextMenuPosition({
      x,
      y,
    });
  };

  // useState hook for showing and hidding Personalize
  const [showPersonalize, setShowPersonalize] = useState(false);
  const handleShowPersonalize = () => {
    setShowPersonalize((oldVal) => !oldVal);
  };

  const [stepsEnabled, setStepsEnabled] = useState(false);
  const steps = [
    {
      element: ".desktop_icon",
      intro: "Click once to open an app",
    },
    {
      element: ".menu-start-btn",
      intro: "This is menu start",
    },
    {
      element: ".task-bar",
      intro: "Click right mouse to open context menu",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setStepsEnabled(true);
    }, 500);
  }, []);

  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={500}
      classNames="fade"
      unmountOnExit
    >
      <div
        className="work-screen"
        onContextMenu={(e) =>
          handleDesktopContextMenu(e, setDesktopContextMenuPosition)
        }
        onClick={(e) => {
          closeDesktopContextMenu();
          if (
            e.target.className === "task-bar" ||
            e.target.className === "desktop"
          ) {
            handleCloseCalendar();
            handleCloseMenuStart();
          }
        }}
      >
        <Steps
          enabled={stepsEnabled}
          steps={steps}
          initialStep={0}
          onExit={() => {
            setStepsEnabled(false);
          }}
        />

        <Desktop
          toDoApp={toDoApp}
          handleStateToDoApp={handleStateToDoApp}
          webBrowser={webBrowser}
          handleStateWebBrowser={handleStateWebBrowser}
          calculator={calculator}
          handleStateCalculator={handleStateCalculator}
          tetris={tetris}
          handleStateTetris={handleStateTetris}
          wallpaper={wallpaper}
        />
        {desktopContextMenuPosition && (
          <DesktopContextMenu
            position={desktopContextMenuPosition}
            onClick={closeDesktopContextMenu}
            lang={lang}
            closeAllPrograms={closeAllPrograms}
            handleCloseCalendar={handleCloseCalendar}
            handleCloseMenuStart={handleCloseMenuStart}
            handleShowPersonalize={handleShowPersonalize}
          />
        )}

        <TaskBar
          lang={lang}
          changeLang={changeLang}
          handleShowCalendar={handleShowCalendar}
          handleShowMenuStart={handleShowMenuStart}
          toDoApp={toDoApp}
          handleStateToDoApp={handleStateToDoApp}
          webBrowser={webBrowser}
          handleStateWebBrowser={handleStateWebBrowser}
          calculator={calculator}
          handleStateCalculator={handleStateCalculator}
          tetris={tetris}
          handleStateTetris={handleStateTetris}
        />

        <CSSTransition
          in={showMenuStart}
          timeout={300}
          classNames="menu-start"
          unmountOnExit
        >
          <MenuStart
            handleCloseMenuStart={handleCloseMenuStart}
            lang={lang}
            user={user}
            changeStage={changeStage}
            handleStateWebBrowser={handleStateWebBrowser}
            closeAllPrograms={closeAllPrograms}
          />
        </CSSTransition>

        <CSSTransition
          in={showCalendar}
          timeout={300}
          classNames="calendar-start"
          unmountOnExit
        >
          <Calendar onChange={onChange} value={value} locale={lang.lng} />
        </CSSTransition>

        <CSSTransition
          in={showPersonalize}
          appear={true}
          timeout={500}
          classNames="fade"
          unmountOnExit
        >
          <Personalize
            lang={lang}
            wallpaper={wallpaper}
            handleWallpaperChange={handleWallpaperChange}
            handleShowPersonalize={handleShowPersonalize}
          />
        </CSSTransition>
      </div>
    </CSSTransition>
  );
};

export default WorkScreen;
