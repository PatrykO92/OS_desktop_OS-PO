import "../assets/styles/loginScreen.css";
import { osStartIcon } from "../assets/icons";
import { wallpaperOne } from "../assets/images/wallpapers";
import { LoadingSpinner } from "./";
import { powerOffIcon, restartIcon } from "../assets/icons";

import { useState, useEffect, useRef } from "react";

import { CSSTransition } from "react-transition-group";

const LoginScreen = ({ lang, user, changeStage }) => {
  const pinInput = useRef(null);
  const [pin, setPin] = useState("");

  const [showPin, setShowPin] = useState(false);

  // There are 2 stages, "start" and "login"
  const [loginStage, setLoginStage] = useState("start");

  // Aplication start, pretended loading of screen
  useEffect(() => {
    if (loginStage === "start") {
      setTimeout(() => {
        setLoginStage("login");
      }, 2500);
    }
  }, [loginStage]);

  return (
    <>
      {loginStage === "start" && (
        <CSSTransition
          in={true}
          appear={true}
          timeout={1500}
          classNames="enter"
        >
          <div className="starting-screen">
            <img
              src={osStartIcon}
              alt="Operating System Logo"
              className="ss-logo"
            />
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
          <div
            className="login-screen"
            style={{ backgroundImage: `url(${wallpaperOne})` }}
          >
            <img src={user.avatar} alt="avatar" />
            <div>
              {user.name} {user.surname}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (pin !== user.pin) {
                  pinInput.current.classList.add("login-screen_wrong-input");
                }
                if (pin === user.pin) changeStage("workScreen");
              }}
            >
              <input
                type="password"
                placeholder={lang.pinPlaceholder}
                ref={pinInput}
                value={pin}
                minLength={6}
                maxLength={6}
                onChange={(e) => {
                  setPin(e.target.value);
                }}
              />
            </form>
            <p
              onClick={() => {
                setShowPin(!showPin);
              }}
            >
              {lang.pinForgetMsg}
            </p>
            {showPin && (
              <span className="tooltip">
                {lang.yourPin}: {user.pin}
              </span>
            )}
            <div className="login-screen_buttons">
              <button onClick={() => setLoginStage("start")}>
                <img
                  src={restartIcon}
                  alt={lang.restart}
                  className="login-screen_button-img"
                />
              </button>
              <button onClick={() => changeStage("closeScreen")}>
                <img
                  src={powerOffIcon}
                  alt={lang.power}
                  className="login-screen_button-img"
                />
              </button>
            </div>
          </div>
        </CSSTransition>
      )}
    </>
  );
};

export default LoginScreen;