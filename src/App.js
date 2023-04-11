import "./assets/styles/main.css";

// import Icons for specific programs
import { toDoAppIcon, webBrowserIcon, calculatorIcon } from "./assets/icons";

import {
  LoginScreen,
  StartScreen,
  WorkScreen,
  Calculator,
  CloseScreen,
  ProgramContainer,
  WebBrowser,
  ToDoApp,
} from "./components";

import { textModel } from "./utils";

import { useState } from "react";

import { CSSTransition } from "react-transition-group";

function App() {
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

  //App:1 TO-DO-APP useState and handlers
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

  //App:2 Web Browser useState and handlers
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

  //App:3 Calculator useState and handlers
  const [calculator, setCalculator] = useState({
    programEnabled: false,
    hidden: false,
    name: "Calculator",
    icon: calculatorIcon,
  });

  const handleStateCalculator = (name, value) => {
    setCalculator((oldVal) => ({ ...oldVal, [name]: value }));
  };

  const handleDefaultStateCalculator = () => {
    setCalculator({
      programEnabled: false,
      hidden: false,
      name: "Calculator",
      icon: calculatorIcon,
    });
  };

  // Close all programs function
  const closeAllPrograms = () => {
    handleDefaultStateToDoApp();
    handleDefaultStateWebBrowser();
    handleDefaultStateCalculator();
  };

  return (
    <div className="whole-screen">
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
          <ToDoApp lang={textModel[windowsLanguage]} />
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
          <Calculator />
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
          changeStage={changeStage}
          // Programs states and handlers
          toDoApp={toDoApp}
          handleStateToDoApp={handleStateToDoApp}
          webBrowser={webBrowser}
          handleStateWebBrowser={handleStateWebBrowser}
          calculator={calculator}
          handleStateCalculator={handleStateCalculator}
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
