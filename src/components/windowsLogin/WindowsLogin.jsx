import "./assets/styles/windowsStartingScreen.css";
import "./assets/styles/windowsLogingScreen.css";
import { nicolausCopernicusAvatar } from "../../assets/images/avatar-images";
import { windowsIcon } from "./assets/images";

import { useState, useEffect } from "react";

const WindowsLogin = ({ lang, user }) => {
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
          <div className="wss-spinner"></div>
        </div>
      )}

      {loginStage === "login" && (
        <div className="windows-loging-screen">
          <img src={nicolausCopernicusAvatar} alt="avatar" />
          <div>
            {user.name} {user.surname}
          </div>
          <form>
            <input type="password" placeholder={lang.pinPlaceholder} />
          </form>
          <p
            onClick={() => {
              //TODO
              console.log(user.pin);
            }}
          >
            {lang.pinForgetMsg}
          </p>
        </div>
      )}
    </>
  );
};

export default WindowsLogin;
