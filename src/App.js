import "./assets/styles/main.css";

import { wallpaperFive } from "./assets/images/wallpapers";

// import Icons for specific programs
import {
  toDoAppIcon,
  webBrowserIcon,
  calculatorIcon,
  tetrisIcon,
  brushIcon,
  userIcon,
} from "./assets/icons";

import {
  LoginScreen,
  StartScreen,
  WorkScreen,
  Calculator,
  CloseScreen,
  ProgramContainer,
  WebBrowser,
  ToDoApp,
  TetrisApp,
  Personalize,
  PersonalizeUser,
} from "./components";

import { textModel } from "./utils";

import { useState, useRef, useEffect } from "react";

import { CSSTransition } from "react-transition-group";

function App() {
  const wholeScreenRef = useRef(null);
  // useStateHook and function to set actually used language, default set to "en".
  const [windowsLanguage, setWindowsLanguage] = useState("en");
  const changeLang = (language) => {
    setWindowsLanguage(language);
  };

  // useStateHook to inform, at what stage is app currently
  const [systemStage, setSystemStage] = useState({
    startScreen: true,
    loginScreen: false,
    workScreen: false,
    closeScreen: false,
  });

  // function to change stage
  const changeStage = (nextStage) => {
    setSystemStage({
      startScreen: false, // set all properties to false except nextStage
      loginScreen: false,
      workScreen: false,
      closeScreen: false,
      [nextStage]: true, // set nextStage to its corresponding value
    });
  };

  // useStateHook and function to set actually used user
  const [user, setUser] = useState({});
  const changeUser = (user) => {
    setUser(user);
  };

  // useState hook and handler function for changing Desktop wallpaper
  const [wallpaper, setWallpaper] = useState(wallpaperFive);
  const handleWallpaperChange = (image) => {
    setWallpaper(image);
  };

  //App 1: TO-DO-APP useState and handlers
  const [toDoApp, setToDoApp] = useState({
    programEnabled: false,
    hidden: false,
    name: "ToDo",
    icon: toDoAppIcon,
  });

  const handleStateToDoApp = (name, value) => {
    setToDoApp((oldVal) => ({ ...oldVal, [name]: value }));
  };

  const handleDefaultStateToDoApp = () => {
    setToDoApp({
      programEnabled: false,
      hidden: false,
      name: "ToDo",
      icon: toDoAppIcon,
    });
  };

  //App 2: Web Browser useState and handlers
  const [webBrowser, setWebBrowser] = useState({
    programEnabled: false,
    hidden: false,
    name: "Chrome Fox",
    icon: webBrowserIcon,
    defaultUrl: false,
  });

  const handleStateWebBrowser = (name, value) => {
    setWebBrowser((oldVal) => ({ ...oldVal, [name]: value }));
  };

  const handleDefaultStateWebBrowser = () => {
    setWebBrowser({
      programEnabled: false,
      hidden: false,
      name: "Chrome Fox",
      icon: webBrowserIcon,
      defaultUrl: false,
    });
  };

  //App 3: Calculator useState and handlers
  const [calculator, setCalculator] = useState({
    programEnabled: false,
    hidden: false,
    name: textModel[windowsLanguage].calculatorName,
    icon: calculatorIcon,
  });

  const handleStateCalculator = (name, value) => {
    setCalculator((oldVal) => ({ ...oldVal, [name]: value }));
  };

  const handleDefaultStateCalculator = () => {
    setCalculator({
      programEnabled: false,
      hidden: false,
      name: textModel[windowsLanguage].calculatorName,
      icon: calculatorIcon,
    });
  };

  //App 4: Tetris useState and handlers
  const [tetris, setTetris] = useState({
    programEnabled: false,
    hidden: false,
    name: "Tetris",
    icon: tetrisIcon,
  });

  const handleStateTetris = (name, value) => {
    setTetris((oldVal) => ({ ...oldVal, [name]: value }));
  };

  const handleDefaultStateTetris = () => {
    setTetris({
      programEnabled: false,
      hidden: false,
      name: "Tetris",
      icon: tetrisIcon,
    });
  };

  // App 5: Personalize useState and handlers
  const [personalize, setPersonalize] = useState({
    programEnabled: false,
    hidden: false,
    name: textModel[windowsLanguage].personalize,
    icon: brushIcon,
  });

  const handleStatePersonalize = (name, value) => {
    setPersonalize((oldVal) => ({ ...oldVal, [name]: value }));
  };

  const handleDefaultStatePersonalize = () => {
    setPersonalize({
      programEnabled: false,
      hidden: false,
      name: textModel[windowsLanguage].personalizeUser,
      icon: brushIcon,
    });
  };

  // App 6: PersonalizeUser useState and handlers
  const [personalizeUser, setPersonalizeUser] = useState({
    programEnabled: false,
    hidden: false,
    name: "Personalize User",
    icon: userIcon,
  });

  const handleStatePersonalizeUser = (name, value) => {
    setPersonalizeUser((oldVal) => ({ ...oldVal, [name]: value }));
  };

  const handleDefaultStatePersonalizeUser = () => {
    setPersonalizeUser({
      programEnabled: false,
      hidden: false,
      name: "Personalize User",
      icon: userIcon,
    });
  };

  const hideAllPrograms = () => {
    handleStateToDoApp("hidden", true);
    handleStateCalculator("hidden", true);
    handleStatePersonalize("hidden", true);
    handleStatePersonalizeUser("hidden", true);
    handleStateTetris("hidden", true);
    handleStateWebBrowser("hidden", true);
  };

  const closeAllPrograms = () => {
    handleDefaultStateToDoApp();
    handleDefaultStateWebBrowser();
    handleDefaultStateCalculator();
    handleDefaultStateTetris();
    handleDefaultStatePersonalize();
    handleDefaultStatePersonalizeUser();
  };

  useEffect(() => {
    handleStateCalculator("name", textModel[windowsLanguage].calculatorName);
    handleStatePersonalize("name", textModel[windowsLanguage].personalize);
    handleStatePersonalizeUser(
      "name",
      textModel[windowsLanguage].personalizeUser
    );
  }, [windowsLanguage]);

  return (
    <div className="whole-screen" ref={wholeScreenRef}>
      {/* App 1: To-Do-App */}
      <CSSTransition
        in={toDoApp.programEnabled}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <ProgramContainer
          lang={textModel[windowsLanguage]}
          programName={toDoApp.name}
          programIcon={toDoApp.icon}
          programHidden={toDoApp.hidden}
          handleProgramState={handleStateToDoApp}
          handleDefaultProgramState={handleDefaultStateToDoApp}
        >
          <ToDoApp lang={textModel[windowsLanguage]} user={user} />
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
          lang={textModel[windowsLanguage]}
          programName={webBrowser.name}
          programIcon={webBrowser.icon}
          programHidden={webBrowser.hidden}
          handleProgramState={handleStateWebBrowser}
          handleDefaultProgramState={handleDefaultStateWebBrowser}
        >
          <WebBrowser
            lang={textModel[windowsLanguage]}
            passUrl={webBrowser.defaultUrl}
          />
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
          lang={textModel[windowsLanguage]}
          programName={calculator.name}
          programIcon={calculator.icon}
          programHidden={calculator.hidden}
          handleProgramState={handleStateCalculator}
          handleDefaultProgramState={handleDefaultStateCalculator}
        >
          <Calculator lang={textModel[windowsLanguage]} />
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
          lang={textModel[windowsLanguage]}
          programName={tetris.name}
          programIcon={tetris.icon}
          programHidden={tetris.hidden}
          handleProgramState={handleStateTetris}
          handleDefaultProgramState={handleDefaultStateTetris}
        >
          <TetrisApp lang={textModel[windowsLanguage]} user={user} />
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
          lang={textModel[windowsLanguage]}
          programName={personalize.name}
          programIcon={personalize.icon}
          programHidden={personalize.hidden}
          handleProgramState={handleStatePersonalize}
          handleDefaultProgramState={handleDefaultStatePersonalize}
        >
          <Personalize
            lang={textModel[windowsLanguage]}
            wallpaper={wallpaper}
            handleWallpaperChange={handleWallpaperChange}
          />
        </ProgramContainer>
      </CSSTransition>

      {/* App 5: Personalize User */}
      <CSSTransition
        in={personalizeUser.programEnabled}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <ProgramContainer
          lang={textModel[windowsLanguage]}
          programName={personalizeUser.name}
          programIcon={personalizeUser.icon}
          programHidden={personalizeUser.hidden}
          handleProgramState={handleStatePersonalizeUser}
          handleDefaultProgramState={handleDefaultStatePersonalizeUser}
        >
          <PersonalizeUser
            lang={textModel[windowsLanguage]}
            user={user}
            changeUser={changeUser}
          />
        </ProgramContainer>
      </CSSTransition>

      {systemStage.startScreen && (
        <StartScreen
          lang={textModel[windowsLanguage]}
          changeLang={changeLang}
          changeUser={changeUser}
          changeStage={changeStage}
        />
      )}
      {systemStage.loginScreen && (
        <LoginScreen
          lang={textModel[windowsLanguage]}
          user={user}
          changeStage={changeStage}
        />
      )}
      {systemStage.workScreen && (
        <WorkScreen
          lang={textModel[windowsLanguage]}
          user={user}
          changeUser={changeUser}
          changeStage={changeStage}
          changeLang={changeLang}
          wholeScreenRef={wholeScreenRef}
          wallpaper={wallpaper}
          // Programs states and handlers
          toDoApp={toDoApp}
          handleStateToDoApp={handleStateToDoApp}
          webBrowser={webBrowser}
          handleStateWebBrowser={handleStateWebBrowser}
          calculator={calculator}
          handleStateCalculator={handleStateCalculator}
          tetris={tetris}
          handleStateTetris={handleStateTetris}
          personalize={personalize}
          handleStatePersonalize={handleStatePersonalize}
          personalizeUser={personalizeUser}
          handleStatePersonalizeUser={handleStatePersonalizeUser}
          hideAllPrograms={hideAllPrograms}
          closeAllPrograms={closeAllPrograms}
        />
      )}
      {systemStage.closeScreen && (
        <CloseScreen
          changeStage={changeStage}
          lang={textModel[windowsLanguage]}
        />
      )}
    </div>
  );
}

export default App;
