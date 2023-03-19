import "./assets/styles/windowsStartingScreen.css";

import { windowsIcon } from "./assets/images";

import { useState, useEffect } from "react";

const WindowsLogin = () => {
  // There are 3 stages, "start", then we have "login" and lastly we have "exitLogin"
  const [loginStage, setLoginStage] = useState("start");

  // Aplication start, pretended loading of screen
  useEffect(() => {
    setTimeout(() => {
      setLoginStage("login");
    }, 2500);
  }, []);

  return (
    <>
      {loginStage === "start" && (
        <div className="windows-starting-screen">
          <img src={windowsIcon} alt="Windows Logo" className="wss-logo" />
          <div class="wss-spinner"></div>
        </div>
      )}

      {loginStage === "login" && (
        <div className="windows-loging-screen">
          <form>
            <input type="text" />
            <input type="password" />
            <button type="submit">Log In</button>
          </form>
        </div>
      )}
    </>
  );
};

export default WindowsLogin;
