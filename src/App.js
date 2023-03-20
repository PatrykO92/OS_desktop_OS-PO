import { useEffect, useState } from "react";

import { WindowsLogin, textModel, StartScreen } from "./components";
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
  const [windowsStage, setWindowsStage] = useState({
    startScreen: true,
    loginScreen: false,
    workScreen: false,
    closeScreen: false,
  });

  const changeStage = () => {
    setWindowsStage({
      startScreen: false,
      loginScreen: true,
      workScreen: false,
      closeScreen: false,
    });
  };

  // Set default language at app start
  useEffect(() => {
    setWindowsLanguage(textModel[windowsLanguage]);
  }, []);

  return (
    <div className="whole-screen">
      {windowsStage.startScreen && (
        <StartScreen
          lang={windowsLanguage}
          changeLang={changeLang}
          changeUser={changeUser}
          changeStage={changeStage}
        />
      )}
      {windowsStage.loginScreen && (
        <WindowsLogin lang={windowsLanguage} user={user} />
      )}
    </div>
  );
}

export default App;
