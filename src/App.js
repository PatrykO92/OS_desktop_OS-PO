import { useEffect, useState } from "react";

import { LoginScreen, textModel, StartScreen, WorkScreen } from "./components";
import "./assets/style/main.css";

function App() {
  // useStateHook and function to set actually used user
  const [user, setUser] = useState({});
  const changeUser = (user) => {
    setUser(user);
    console.log(user);
  };

  // useStateHook and function to set actually used language
  const [windowsLanguage, setWindowsLanguage] = useState("en");
  const changeLang = (language) => {
    setWindowsLanguage(textModel[language]);
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

  // Set default language at app start
  useEffect(() => {
    setWindowsLanguage(textModel[windowsLanguage]);
  }, []);

  return (
    <div className="whole-screen">
      {systemStage.startScreen && (
        <StartScreen
          lang={windowsLanguage}
          changeLang={changeLang}
          changeUser={changeUser}
          changeStage={changeStage}
        />
      )}
      {systemStage.loginScreen && (
        <LoginScreen
          lang={windowsLanguage}
          user={user}
          changeStage={changeStage}
        />
      )}
      {systemStage.workScreen && <WorkScreen />}
    </div>
  );
}

export default App;
