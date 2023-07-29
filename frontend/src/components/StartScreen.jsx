import styles from "../assets/styles/startScreen.module.css";

import {
  plFlagIcon,
  usFlagIcon,
  plusCircleIcon,
  loginIcon,
  userIcon,
} from "../assets/icons";

import { WholeAppContext } from "../App";

import { useContext, useState } from "react";
import loginToBackend from "../utils/loginToBackend";
import getUserDetail from "../utils/getUserDetail";
import { useNavigate } from "react-router-dom";
import registerAccount from "../utils/registerAccount";

const GUEST_USER = process.env.REACT_APP_GUEST_USER;
const GUEST_USER_PASSWORD = process.env.REACT_APP_GUEST_USER_PASSWORD;

export default function StartScreen() {
  const [step, setStep] = useState(1);
  const changeStep = (val) => {
    setStep(val);
  };

  return (
    <div className={styles.startScreen}>
      {step === 1 && <StepOne changeStep={changeStep} />}
      {step === 2 && <StepTwo changeStep={changeStep} />}
      {step === 3 && <StepThree changeStep={changeStep} />}
    </div>
  );
}

export function StepOne({ changeStep }) {
  const { lang, changeLang } = useContext(WholeAppContext);

  return (
    <div className={styles.stepOne}>
      <p>{lang.chooseLanguage}:</p>

      <div className={styles.stepOneButtons}>
        <button
          onMouseOver={() => {
            changeLang("en");
          }}
          onClick={() => {
            changeLang("en");
            changeStep(2);
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
            changeStep(2);
          }}
        >
          <img src={plFlagIcon} alt="Polski" />
        </button>
      </div>
    </div>
  );
}

export function StepTwo({ changeStep }) {
  const { lang, changeUser, setIsConnectedToBackend } =
    useContext(WholeAppContext);
  const navigate = useNavigate();

  const loginToGuestUser = async () => {
    const data = await loginToBackend(GUEST_USER, GUEST_USER_PASSWORD);
    if (data.status === 200) {
      setIsConnectedToBackend(true);
      changeUser(await getUserDetail());
      return true;
    } else {
      return false;
    }
  };

  return (
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
          changeStep(3);
        }}
      >
        <img src={plusCircleIcon} alt="" />
        <span>{lang.userSetup}</span>
      </button>

      <button
        onClick={async () => {
          navigate("/loginScreen");
        }}
      >
        <img src={loginIcon} alt="" />
        <span>Already have an account</span>
      </button>
    </div>
  );
}

export function StepThree({ changeStep }) {
  const { lang } = useContext(WholeAppContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pin, setPin] = useState("");
  const [userTag, setUserTag] = useState("");
  const [avatar, setAvatar] = useState(null);

  const handleFormSubmit = async () => {
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
    if (data.status === 204) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className={styles.stepThree}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (handleFormSubmit()) navigate("/loginScreen");
        }}
      >
        {/* Input fields for the form */}
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <label>Pin:</label>
          <input
            type="text"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
        </div>
        <div>
          <label>User Tag:</label>
          <input
            type="text"
            value={userTag}
            onChange={(e) => setUserTag(e.target.value)}
          />
        </div>
        <div>
          <label>Avatar:</label>
          {/* Input field for file upload */}
          <input type="file" onChange={(e) => setAvatar(e.target.files[0])} />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}
