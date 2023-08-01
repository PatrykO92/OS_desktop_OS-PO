import styles from "../assets/styles/startScreen.module.css";

import {
  plFlagIcon,
  usFlagIcon,
  plusCircleIcon,
  loginIcon,
  userIcon,
  arrowLeftIcon,
  defaultUserIcon,
} from "../assets/icons";

import { WholeAppContext } from "../App";

import { useContext, useState } from "react";
import loginToBackend from "../utils/loginToBackend";
import getUserDetail from "../utils/getUserDetail";
import { useNavigate } from "react-router-dom";
import registerAccount from "../utils/registerAccount";

import { CSSTransition } from "react-transition-group";
import { LoadingSpinnerFullscreen } from "./LoadingSpinner";
import axios from "axios";
import useRemoveUser from "../hooks/useRemoveUser";

const GUEST_USER = process.env.REACT_APP_GUEST_USER;
const GUEST_USER_PASSWORD = process.env.REACT_APP_GUEST_USER_PASSWORD;
const API_URL = process.env.REACT_APP_BACKEND_URL;

export default function StartScreen() {
  const { lang } = useContext(WholeAppContext);
  const [step, setStep] = useState(1);
  const changeStep = (val) => {
    setStep((oldVal) => {
      if (oldVal + val <= 0) {
        return 1;
      } else return oldVal + val;
    });
  };

  return (
    <div className={styles.startScreen}>
      <CSSTransition
        in={step >= 2}
        timeout={400}
        classNames="fade"
        unmountOnExit
      >
        <button className={styles.backButton} onClick={() => changeStep(-1)}>
          <img src={arrowLeftIcon} alt={lang.back} />
        </button>
      </CSSTransition>

      {step === 1 && (
        <CSSTransition
          in={true}
          appear={true}
          timeout={1000}
          classNames="slide"
          unmountOnExit
        >
          <StepOne changeStep={changeStep} />
        </CSSTransition>
      )}

      {step === 2 && (
        <CSSTransition
          in={true}
          appear={true}
          timeout={1000}
          classNames="slide"
          unmountOnExit
        >
          <StepTwo changeStep={changeStep} />
        </CSSTransition>
      )}

      {step === 3 && (
        <CSSTransition
          in={true}
          appear={true}
          timeout={1000}
          classNames="slide"
          unmountOnExit
        >
          <StepThree changeStep={changeStep} />
        </CSSTransition>
      )}
    </div>
  );
}

export function StepOne({ changeStep }) {
  const { lang, changeLang } = useContext(WholeAppContext);

  return (
    <div className={styles.stepOne}>
      <p>{lang.chooseLanguage}</p>

      <div className={styles.stepOneButtons}>
        <button
          onMouseOver={() => {
            changeLang("en");
          }}
          onClick={() => {
            changeLang("en");
            changeStep(1);
          }}
        >
          <img src={usFlagIcon} alt="English" />
        </button>
        <button
          onMouseOver={() => {
            changeLang("pl");
          }}
          onClick={() => {
            changeLang("pl");
            changeStep(1);
          }}
        >
          <img src={plFlagIcon} alt="Polski" />
        </button>
      </div>
    </div>
  );
}

export function StepTwo({ changeStep }) {
  const [isLoading, setIsLoading] = useState(false);
  const { lang, changeUser, setIsConnectedToBackend } =
    useContext(WholeAppContext);
  const navigate = useNavigate();
  const removeUser = useRemoveUser();

  const loginToGuestUser = async () => {
    setIsLoading(true);
    const data = await loginToBackend(GUEST_USER, GUEST_USER_PASSWORD);
    if (data.status === 200) {
      setIsConnectedToBackend(true);
      changeUser(await getUserDetail());
      setIsLoading(false);
      return true;
    } else {
      setIsLoading(false);
      return false;
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinnerFullscreen />}
      <div className={styles.stepTwo}>
        <div>
          <p>{lang.startScreenText1}</p>
          <p>{lang.startScreenText2}</p>
        </div>

        <button
          onClick={async () => {
            if (await loginToGuestUser()) navigate("/loginScreen");
          }}
        >
          <img src={userIcon} alt="" />
          <span>{lang.guestUser}</span>
        </button>

        <button
          onClick={() => {
            removeUser();
            changeStep(1);
          }}
        >
          <img src={plusCircleIcon} alt="" />
          <span>{lang.userSetup}</span>
        </button>

        <button
          onClick={async () => {
            removeUser();
            navigate("/loginScreen");
          }}
        >
          <img src={loginIcon} alt="" />
          <span>{lang.alreadyAccount}</span>
        </button>
      </div>
    </>
  );
}

export function StepThree() {
  const { lang } = useContext(WholeAppContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailRegistered, setIsEmailRegistered] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pin, setPin] = useState("");
  const [avatar, setAvatar] = useState(defaultUserIcon);
  const userTag =
    firstName.slice(0, 3).toUpperCase() +
    "_" +
    lastName.slice(0, 3).toUpperCase();

  const [valid, setValid] = useState(false);

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword1(newPassword);
    setValid(validatePassword(newPassword));
  };

  const validatePassword = (password) => {
    // At least 8 characters
    const lengthRegex = /.{8,}/;
    // At least one lowercase letter
    const lowercaseRegex = /[a-z]+/;
    // At least one uppercase letter
    const uppercaseRegex = /[A-Z]+/;
    // At least one digit
    const digitRegex = /\d+/;
    // At least one special character
    const specialCharRegex = /[^A-Za-z0-9]+/;

    return (
      lengthRegex.test(password) &&
      lowercaseRegex.test(password) &&
      uppercaseRegex.test(password) &&
      digitRegex.test(password) &&
      specialCharRegex.test(password)
    );
  };

  const checkPasswordMatch = () => {
    if (password1 !== password2) {
      setPasswordError(lang.samePassword);
    } else {
      setPasswordError("");
    }
  };

  const checkEmailExists = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/account/check_user`,
        { email }
      );
      setIsEmailRegistered(response.data.exists);
    } catch (error) {
      console.error("Error checking email");
    }
  };

  const handleFormSubmit = async () => {
    setIsLoading(true);
    try {
      checkPasswordMatch();

      if (password1 !== password2) {
        return false;
      }

      const data = await registerAccount(
        email,
        password1,
        password2,
        firstName,
        lastName,
        pin,
        userTag,
        avatar
      );
      setIsLoading(false);
      return data.status === 204;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  return (
    <>
      {isLoading && <LoadingSpinnerFullscreen />}
      <div className={styles.stepThree}>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const isSuccess = await handleFormSubmit();

            if (isSuccess) {
              navigate("/loginScreen");
            }
          }}
        >
          <div>
            <div>
              <label htmlFor="emailInput">{lang.emailLabel}</label>
              {isEmailRegistered ? (
                <div className={styles.error}>{lang.alreadyRegistered}</div>
              ) : (
                <div className={styles.required}>*{lang.required}</div>
              )}
            </div>

            <input
              required
              id="emailInput"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={checkEmailExists}
            />
          </div>
          <div>
            <div>
              <label htmlFor="passwordInput1">{lang.password}</label>
              {password1 && (
                <div>
                  {valid ? (
                    <div className={styles.required} style={{ color: "green" }}>
                      {lang.strongPassword}
                    </div>
                  ) : (
                    <div className={styles.error}>{lang.passwordDetails}</div>
                  )}
                </div>
              )}
            </div>

            <input
              required
              minLength={8}
              id="passwordInput1"
              type="password"
              value={password1}
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <div>
              <label htmlFor="passwordInput2">{lang.confirmPassword}</label>
              {passwordError ? (
                <div className={styles.error}>{passwordError}</div>
              ) : (
                <div className={styles.required}>*{lang.required}</div>
              )}
            </div>
            <input
              required
              minLength={8}
              id="passwordInput2"
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              onBlur={checkPasswordMatch}
            />
          </div>
          <div>
            <div>
              <label htmlFor="avatarInput">{lang.yourAvatar}</label>
              <div className={styles.required}>*{lang.required}</div>
            </div>

            <input
              id="avatarInput"
              type="file"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
          </div>
          <div>
            <div>
              <label htmlFor="firstNameInput">{lang.firstName}</label>

              <div className={styles.required}>*{lang.required}</div>
            </div>

            <input
              minLength={3}
              required
              id="firstNameInput"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <div>
              <label htmlFor="lastNameInput">{lang.lastName}</label>
              <div className={styles.required}>*{lang.required}</div>
            </div>

            <input
              required
              minLength={3}
              id="lastNameInput"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="pinInput">{lang.pin}</label>
            <input
              id="pinInput"
              type="number"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
          </div>

          <div>
            <button type="submit">{lang.submit}</button>
          </div>
        </form>
      </div>
    </>
  );
}
