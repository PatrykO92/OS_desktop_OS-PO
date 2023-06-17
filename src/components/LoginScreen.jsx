import "../assets/styles/loginScreen.css";
import { osStartIcon } from "../assets/icons";
import { wallpaperOne } from "../assets/images/wallpapers";
import { LoadingSpinner } from "./";
import { powerOffIcon, restartIcon, arrowRightIcon } from "../assets/icons";

import { useState, useEffect, useRef } from "react";

import { CSSTransition } from "react-transition-group";

import { loginInToBackend } from "../utils";

const LoginScreen = ({ lang, user, changeStage, setIsConnectedToBackend }) => {
  const pinInput = useRef(null);
  const [pin, setPin] = useState("");

  const [showPin, setShowPin] = useState(false);

  // There are 2 stages, "start" and "login"
  const [loginStage, setLoginStage] = useState("start");

  // Aplication start, pretended loading of screen
  useEffect(() => {
    const login = loginInToBackend();
    login
      .then((res) => {
        if (res) setIsConnectedToBackend(true);
      })
      .catch((err) => {
        setIsConnectedToBackend(false);
      });

    if (loginStage === "start") {
      setTimeout(() => {
        setLoginStage("login");
      }, 1500);
    }
  }, [loginStage, setIsConnectedToBackend]);

  return (
    <>
      {loginStage === "start" && (
        <CSSTransition in={true} appear={true} timeout={300} classNames="fade">
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
        <CSSTransition in={true} appear={true} timeout={300} classNames="fade">
          <div
            className="login-screen"
            style={{ backgroundImage: `url(${wallpaperOne})` }}
          >
            <img src={user.avatar} alt="avatar" />
            <div>
              {user.name} {user.lastName}{" "}
              {user.pin === "" && (
                <button
                  style={{ background: "transparent" }}
                  className="login-screen_login-button"
                  onClick={() => {
                    changeStage("workScreen");
                  }}
                >
                  <img src={arrowRightIcon} alt={lang.submit} />
                </button>
              )}
            </div>

            {user.pin !== "" && (
              <>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setPin("");
                    if (pin !== user.pin) {
                      pinInput.current.classList.add(
                        "login-screen_wrong-input"
                      );
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
                  <button className="login-screen_login-button" type="submit">
                    <img src={arrowRightIcon} alt={lang.submit} />
                  </button>
                </form>
                <p
                  onClick={() => {
                    setShowPin(!showPin);
                  }}
                >
                  {lang.pinForgetMsg}
                </p>
              </>
            )}

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
