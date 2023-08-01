import styles from "../assets/styles/loginScreen.module.css";
import { osStartIcon } from "../assets/icons";
import { wallpaperOne } from "../assets/images/wallpapers";
import { LoadingSpinner } from "./LoadingSpinner";
import { powerOffIcon, restartIcon, arrowRightIcon } from "../assets/icons";

import { useState, useEffect, useRef, useContext } from "react";

import { CSSTransition } from "react-transition-group";

import { useNavigate } from "react-router-dom";
import { WholeAppContext } from "../App";
import getUserDetail from "../utils/getUserDetail";
import loginToBackend from "../utils/loginToBackend";
import passwordReset from "../utils/passwordReset";

const LoginScreen = () => {
  const { lang, user, setIsConnectedToBackend, changeUser } =
    useContext(WholeAppContext);
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const pinInput = useRef("");
  const [pin, setPin] = useState("");

  const [showPin, setShowPin] = useState(false);
  // There are 2 stages, "start" and "login"
  const [loginStage, setLoginStage] = useState("start");

  const login = async () => {
    const data = await loginToBackend(email, password);
    if (data.status === 200) {
      setIsConnectedToBackend(true);
      changeUser(await getUserDetail());
      return true;
    } else {
      return false;
    }
  };

  // Aplication start, pretended loading of screen
  useEffect(() => {
    if (loginStage === "start") {
      setTimeout(() => {
        setLoginStage("login");
      }, 1500);
    }
  }, [loginStage]);

  return (
    <>
      {loginStage === "start" && (
        <CSSTransition in={true} appear={true} timeout={300} classNames="fade">
          <div className={styles.startingScreen}>
            <img
              src={osStartIcon}
              alt="Operating System Logo"
              className={styles.ssLogo}
            />
            <LoadingSpinner />
          </div>
        </CSSTransition>
      )}

      {loginStage === "login" && (
        <CSSTransition in={true} appear={true} timeout={300} classNames="fade">
          <div
            className={styles.loginScreen}
            style={{ backgroundImage: `url(${wallpaperOne})` }}
          >
            {user === null && (
              <>
                <form
                  className={styles.defaultLogin}
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (await login()) navigate("/workScreen");
                  }}
                >
                  <input
                    type="email"
                    placeholder={lang.email}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <input
                    type="password"
                    placeholder={lang.password}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <button className={styles.loginButton} type="submit">
                    <img src={arrowRightIcon} alt={lang.submit} />
                  </button>
                </form>
                <p
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                >
                  {lang.passwordForgetMsg}
                </p>
                {showPassword && (
                  <div className={styles.tooltip}>
                    {isEmailSent ? (
                      <p>
                        {lang.emailSent}: {email}
                      </p>
                    ) : (
                      <>
                        <p>{lang.emailSend}:</p>
                        <form
                          onSubmit={async (e) => {
                            e.preventDefault();
                            const response = await passwordReset(email);
                            if (response.status === 200) {
                              setIsEmailSent(true);
                            }
                          }}
                        >
                          <input
                            type="email"
                            placeholder={lang.email}
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                            }}
                          />
                          <button className={styles.loginButton} type="submit">
                            <img src={arrowRightIcon} alt={lang.submit} />
                          </button>
                        </form>
                      </>
                    )}
                  </div>
                )}
              </>
            )}
            {user !== null && (
              <>
                <img src={user.avatar} alt="avatar" />
                <div className={styles.userFullName}>
                  {user.name} {user.lastName}{" "}
                  {user.pin === "" && (
                    <button
                      style={{ background: "transparent" }}
                      className={styles.loginButton}
                      onClick={() => {
                        navigate("/workScreen");
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
                          pinInput.current.classList.add("wrongInput");
                        }
                        if (pin === user.pin) navigate("/workScreen");
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
                      <button className={styles.loginButton} type="submit">
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
                  <span className={styles.tooltip}>
                    {lang.yourPin}: {user.pin}
                  </span>
                )}
              </>
            )}
            <div className={styles.buttons}>
              <button onClick={() => setLoginStage("start")}>
                <img src={restartIcon} alt={lang.restart} />
              </button>
              <button onClick={() => navigate("/closeScreen")}>
                <img src={powerOffIcon} alt={lang.power} />
              </button>
            </div>
          </div>
        </CSSTransition>
      )}
    </>
  );
};

export default LoginScreen;
