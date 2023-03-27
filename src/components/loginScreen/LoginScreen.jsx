import "./assets/styles/logingScreen.css";
import { nicolausCopernicusAvatar } from "../../assets/images/avatar-images";
import { windowsIcon } from "./assets/images";
import { LoadingSpinner } from "../.";

import { useState, useEffect } from "react";

import { CSSTransition } from "react-transition-group";

const WindowsLogin = ({ lang, user, changeStage }) => {
  // There are 2 stages, "start" and "login"
  const [showPin, setShowPin] = useState(false);

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
        <CSSTransition
          in={true}
          appear={true}
          timeout={5000}
          classNames="enter"
        >
          <div className="starting-screen">
            <img src={windowsIcon} alt="Windows Logo" className="ss-logo" />
            <LoadingSpinner />
          </div>
        </CSSTransition>
      )}

      {loginStage === "login" && (
        <CSSTransition
          in={true}
          appear={true}
          timeout={5000}
          classNames="enter"
        >
          <div className="loging-screen">
            <img src={nicolausCopernicusAvatar} alt="avatar" />
            <div>
              {user.name} {user.surname}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                changeStage("workScreen");
              }}
            >
              <input type="password" placeholder={lang.pinPlaceholder} />
            </form>
            <p
              onMouseOver={() => {
                setShowPin(!showPin);
              }}
              onMouseOut={() => {
                setShowPin(!showPin);
              }}
            >
              {lang.pinForgetMsg}
            </p>
            {showPin ? (
              <span className="tooltip">
                {lang.yourPin}: {user.pin}
              </span>
            ) : (
              <></>
            )}
          </div>
        </CSSTransition>
      )}
    </>
  );
};

export default WindowsLogin;
