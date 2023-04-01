import "./assets/styles/main.css";

// import Icons for specific programs
import { toDoAppIcon } from "./assets/icons";

import {
  LoginScreen,
  StartScreen,
  WorkScreen,
  CloseScreen,
  ProgramContainer,
} from "./components";
import { textModel } from "./utils";

import { useState } from "react";

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

  //TO-DO-APP useState and handler
  const [toDoApp, setToDoApp] = useState({
    programOn: false,
    hidden: false,
    name: "To-Do-App",
    icon: toDoAppIcon,
  });

  const handleStateToDoApp = (name, value) => {
    setToDoApp((oldVal) => ({ ...oldVal, [name]: value }));
  };

  return (
    <div className="whole-screen">
      {toDoApp.programOn && (
        <ProgramContainer
          lang={textModel[windowsLanguage]}
          programName={toDoApp.name}
          programIcon={toDoApp.icon}
          programHidden={toDoApp.hidden}
          handleProgramState={handleStateToDoApp}
        />
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
        />
      )}
      {systemStage.closeScreen && <CloseScreen />}
    </div>
  );
}

export default App;
