import "./assets/styles/main.css";
import {
  LoginScreen,
  StartScreen,
  WorkScreen,
  CloseScreen,
} from "./components";
import { textModel } from "./utils";
import { avatarOne } from "./assets/images/avatar-images";

import { useState } from "react";

function App() {
  // useStateHook and function to set actually used user
  // remove to PROD
  const [user, setUser] = useState({
    name: "Nicolaus",
    surname: "Copernicus",
    pin: "1234",
    avatar: avatarOne,
  });

  const changeUser = (user) => {
    setUser(user);
  };

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

  return (
    <div className="whole-screen">
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
        />
      )}
      {systemStage.closeScreen && <CloseScreen />}
    </div>
  );
}

export default App;
