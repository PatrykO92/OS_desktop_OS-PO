import { WholeAppContext } from "../App";
import "../assets/styles/workScreen.css";
import {
  TaskBar,
  DesktopContextMenu,
  MenuStart,
  WeatherBox,
  NewsBox,
  ProgramContainer,
  LoadingSpinner,
} from "./";

import { useState, useContext, lazy, Suspense } from "react";

import { CSSTransition } from "react-transition-group";

import Calendar from "react-calendar";
import "../assets/styles/myCalendar.css";

const Desktop = lazy(() => import("./Desktop"));
const ToDoApp = lazy(() => import("./ToDoApp"));
const WebBrowser = lazy(() => import("./WebBrowser"));
const Calculator = lazy(() => import("./Calculator"));
const TetrisApp = lazy(() => import("./TetrisApp/TetrisApp"));
const CalendarApp = lazy(() => import("./CalendarApp"));
const Personalize = lazy(() => import("./Personalize"));
const PersonalizeUser = lazy(() => import("./PersonalizeUser"));

const WorkScreen = () => {
  const {
    lang,
    user,
    changeUser,
    toDoApp,
    handleStateToDoApp,
    handleDefaultStateToDoApp,
    webBrowser,
    handleStateWebBrowser,
    handleDefaultStateWebBrowser,
    calculator,
    handleStateCalculator,
    handleDefaultStateCalculator,
    tetris,
    handleStateTetris,
    handleDefaultStateTetris,
    personalize,
    calendarApp,
    handleStateCalendarApp,
    handleDefaultStateCalendarApp,
    handleStatePersonalize,
    handleDefaultStatePersonalize,
    personalizeUser,
    handleStatePersonalizeUser,
    handleDefaultStatePersonalizeUser,
  } = useContext(WholeAppContext);

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

  const closeAll = () => {
    handleCloseCalendar();
    handleCloseMenuStart();
    handleCloseWeatherBox();
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
            closeAll();
          }
        }}
      >
        <Desktop />

        {desktopContextMenuPosition && (
          <DesktopContextMenu
            position={desktopContextMenuPosition}
            closeDesktopContextMenu={closeDesktopContextMenu}
            closeAll={closeAll}
          />
        )}

        {/* App 1: To-Do-App */}
        <CSSTransition
          in={toDoApp.programEnabled}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <ProgramContainer
            lang={lang}
            programName={toDoApp.name}
            programIcon={toDoApp.icon}
            programHidden={toDoApp.hidden}
            handleProgramState={handleStateToDoApp}
            handleDefaultProgramState={handleDefaultStateToDoApp}
          >
            <Suspense fallback={<LoadingSpinner />}>
              <ToDoApp lang={lang} user={user} />
            </Suspense>
          </ProgramContainer>
        </CSSTransition>

        {/* App 2: Web Browser */}
        <CSSTransition
          in={webBrowser.programEnabled}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <ProgramContainer
            lang={lang}
            programName={webBrowser.name}
            programIcon={webBrowser.icon}
            programHidden={webBrowser.hidden}
            handleProgramState={handleStateWebBrowser}
            handleDefaultProgramState={handleDefaultStateWebBrowser}
          >
            <Suspense fallback={<LoadingSpinner />}>
              <WebBrowser lang={lang} passUrl={webBrowser.defaultUrl} />
            </Suspense>
          </ProgramContainer>
        </CSSTransition>

        {/* App 3: Calculator */}
        <CSSTransition
          in={calculator.programEnabled}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <ProgramContainer
            lang={lang}
            programName={calculator.name}
            programIcon={calculator.icon}
            programHidden={calculator.hidden}
            handleProgramState={handleStateCalculator}
            handleDefaultProgramState={handleDefaultStateCalculator}
          >
            <Suspense fallback={<LoadingSpinner />}>
              <Calculator lang={lang} />
            </Suspense>
          </ProgramContainer>
        </CSSTransition>

        {/* App 4: Tetris */}
        <CSSTransition
          in={tetris.programEnabled}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <ProgramContainer
            lang={lang}
            programName={tetris.name}
            programIcon={tetris.icon}
            programHidden={tetris.hidden}
            handleProgramState={handleStateTetris}
            handleDefaultProgramState={handleDefaultStateTetris}
          >
            <Suspense fallback={<LoadingSpinner />}>
              <TetrisApp lang={lang} user={user} />
            </Suspense>
          </ProgramContainer>
        </CSSTransition>

        {/* App 5: Personalize */}
        <CSSTransition
          in={personalize.programEnabled}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <ProgramContainer
            lang={lang}
            programName={personalize.name}
            programIcon={personalize.icon}
            programHidden={personalize.hidden}
            handleProgramState={handleStatePersonalize}
            handleDefaultProgramState={handleDefaultStatePersonalize}
          >
            <Suspense fallback={<LoadingSpinner />}>
              <Personalize lang={lang} user={user} changeUser={changeUser} />
            </Suspense>
          </ProgramContainer>
        </CSSTransition>

        {/* App 6: Personalize User */}
        <CSSTransition
          in={personalizeUser.programEnabled}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <ProgramContainer
            lang={lang}
            programName={personalizeUser.name}
            programIcon={personalizeUser.icon}
            programHidden={personalizeUser.hidden}
            handleProgramState={handleStatePersonalizeUser}
            handleDefaultProgramState={handleDefaultStatePersonalizeUser}
          >
            <Suspense fallback={<LoadingSpinner />}>
              <PersonalizeUser
                lang={lang}
                user={user}
                changeUser={changeUser}
              />
            </Suspense>
          </ProgramContainer>
        </CSSTransition>

        {/* App 7: CalendarApp */}
        <CSSTransition
          in={calendarApp.programEnabled}
          timeout={300}
          classNames="fade"
          unmountOnExit
        >
          <ProgramContainer
            lang={lang}
            programName={calendarApp.name}
            programIcon={calendarApp.icon}
            programHidden={calendarApp.hidden}
            handleProgramState={handleStateCalendarApp}
            handleDefaultProgramState={handleDefaultStateCalendarApp}
          >
            <Suspense fallback={<LoadingSpinner />}>
              <CalendarApp lang={lang} user={user} />
            </Suspense>
          </ProgramContainer>
        </CSSTransition>

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
