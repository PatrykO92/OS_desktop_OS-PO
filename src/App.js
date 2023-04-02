import "./assets/styles/main.css";

// import Icons for specific programs
import { toDoAppIcon, webBrowserIcon } from "./assets/icons";

import {
  LoginScreen,
  StartScreen,
  WorkScreen,
  CloseScreen,
  ProgramContainer,
  WebBrowser,
} from "./components";
import { textModel } from "./utils";

import { useState, useEffect } from "react";

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

  // useState to save all enabled programs and useEffect to follow which program is enabled
  const [listOfEnabledPrograms, setListOfEnabledPrograms] = useState([]);
  useEffect(() => {
    //TODO
  }, []);

  //TO-DO-APP useState and handler
  const [toDoApp, setToDoApp] = useState({
    programEnabled: false,
    hidden: false,
    name: "To-Do-App",
    icon: toDoAppIcon,
  });
  const handleStateToDoApp = (name, value) => {
    setToDoApp((oldVal) => ({ ...oldVal, [name]: value }));
  };

  const handleDefaultStateToDoApp = () => {
    setToDoApp({
      programEnabled: false,
      hidden: false,
      name: "To-Do-App",
      icon: toDoAppIcon,
    });
  };

  //Web Browser useState and handler
  const [webBrowser, setWebBrowser] = useState({
    programEnabled: false,
    hidden: false,
    name: "Web Browser",
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
      name: "Web Browser",
      icon: webBrowserIcon,
      defaultUrl: false,
    });
  };

  return (
    <div className="whole-screen">
      {toDoApp.programEnabled && (
        <ProgramContainer
          lang={textModel[windowsLanguage]}
          programName={toDoApp.name}
          programIcon={toDoApp.icon}
          programHidden={toDoApp.hidden}
          handleProgramState={handleStateToDoApp}
          handleDefaultProgramState={handleDefaultStateToDoApp}
        >
          <h1>Hello World</h1>
        </ProgramContainer>
      )}

      {webBrowser.programEnabled && (
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
      )}

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
          handleStateToDoApp={handleStateToDoApp}
          handleStateWebBrowser={handleStateWebBrowser}
        />
      )}
      {systemStage.closeScreen && <CloseScreen />}
    </div>
  );
}

export default App;
