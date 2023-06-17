import { WholeAppContext } from "../App";
import "../assets/styles/workScreen.css";
import {
  TaskBar,
  Desktop,
  DesktopContextMenu,
  MenuStart,
  WeatherBox,
  NewsBox,
} from "./";

import { useState, useContext } from "react";

import { CSSTransition } from "react-transition-group";

import Calendar from "react-calendar";
import "../assets/styles/myCalendar.css";

const WorkScreen = ({ children }) => {
  const { lang } = useContext(WholeAppContext);
  // useState hook for showing and hidding MenuStart
  const [showWeatherBox, setShowWeatherBox] = useState(false);
  const handleShowWeatherBox = () => {
    setShowWeatherBox((oldVal) => !oldVal);
  };
  const handleCloseWeatherBox = () => {
    setShowWeatherBox(false);
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
    if (e.target.className !== "desktop") return;
    // #desktop-context-menu width value in rem
    const remValueX = 10;
    // #desktop-context-menu height value in rem
    const remValueY = 11;
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

    setDesktopContextMenuPosition({
      x,
      y,
    });
  };

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
          if (
            e?.target?.closest("button")?.id !==
            "desktop-contex-menu__view-button"
          )
            closeDesktopContextMenu();

          if (
            e.target.className === "task-bar" ||
            e.target.className === "desktop"
          ) {
            handleCloseCalendar();
            handleCloseMenuStart();
            handleCloseWeatherBox();
          }
        }}
      >
        {children}
        <Desktop />

        {desktopContextMenuPosition && (
          <DesktopContextMenu
            position={desktopContextMenuPosition}
            closeDesktopContextMenu={closeDesktopContextMenu}
          />
        )}

        <TaskBar
          handleShowCalendar={handleShowCalendar}
          handleShowMenuStart={handleShowMenuStart}
          handleShowWeatherBox={handleShowWeatherBox}
        />

        <CSSTransition
          in={showMenuStart}
          timeout={300}
          classNames="menu-start"
          unmountOnExit
        >
          <MenuStart handleCloseMenuStart={handleCloseMenuStart}>
            <NewsBox />
          </MenuStart>
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
          in={showWeatherBox}
          timeout={300}
          classNames="calendar-start"
          unmountOnExit
        >
          <WeatherBox />
        </CSSTransition>
      </div>
    </CSSTransition>
  );
};

export default WorkScreen;
