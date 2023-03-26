import { useEffect, useState } from "react";

import { LoginScreen, textModel, StartScreen, WorkScreen } from "./components";
import "./assets/style/main.css";
import { nicolausCopernicusAvatar } from "./assets/images/avatar-images";

function App() {
  // useStateHook and function to set actually used user
  const [user, setUser] = useState({
    name: "Nicolaus",
    surname: "Copernicus",
    pin: "1234",
    avatar: nicolausCopernicusAvatar,
  });
  const changeUser = (user) => {
    setUser(user);
    console.log(user);
  };

  // useStateHook and function to set actually used language, default set to "en".
  const [windowsLanguage, setWindowsLanguage] = useState("en");
  const changeLang = (language) => {
    setWindowsLanguage(language);
  };

  // useStateHook to inform, at what stage is app currently
  const [systemStage, setSystemStage] = useState({
    startScreen: false,
    loginScreen: false,
    workScreen: true,
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
    </div>
  );
}

export default App;
