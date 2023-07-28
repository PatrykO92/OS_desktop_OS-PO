import "../assets/styles/startScreen.css";
import {
  plFlagIcon,
  usFlagIcon,
  plusCircleIcon,
  userIcon,
  defaultUserIcon,
} from "../assets/icons";

import { WholeAppContext } from "../App";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import loginToBackend from "../utils/loginToBackend";
import getUserDetail from "../utils/getUserDetail";

const GUEST_USER = process.env.REACT_APP_GUEST_USER;
const GUEST_USER_PASSWORD = process.env.REACT_APP_GUEST_USER_PASSWORD;

export default function StartScreen() {
  const [step, setStep] = useState(1);
  const changeStep = (val) => {
    setStep(val);
  };

  return (
    <div className="start-screen">
      {step === 1 && <StepOne changeStep={changeStep} />}
      {step === 2 && <StepTwo changeStep={changeStep} />}
      {step === 3 && <StepThree changeStep={changeStep} />}
    </div>
  );
}

export function StepOne({ changeStep }) {
  const { lang, changeLang } = useContext(WholeAppContext);

  return (
    <div className="step-one">
      <p>{lang.chooseLanguage}:</p>

      <div className="buttons">
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
  const { lang, changeUser } = useContext(WholeAppContext);
  const navigate = useNavigate();

  const loginToGuestUser = async () => {
    const data = await loginToBackend(GUEST_USER, GUEST_USER_PASSWORD);
    if (data.status === 200) {
      const { email, first_name, last_name, pin, user_tag, settings } =
        await getUserDetail();
      changeUser({
        email,
        name: first_name,
        lastName: last_name,
        pin,
        avatar: defaultUserIcon,
        userTag: user_tag,
        settings,
      });
      navigate("/loginScreen");
    }
  };

  return (
    <div className="step-two">
      <div>
        <p>{lang.startScreenText1}</p>
        <p>{lang.startScreenText2}</p>
      </div>

      <button
        onClick={() => {
          loginToGuestUser();
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
    </div>
  );
}

export function StepThree({ changeStep }) {
  return <div>Hello world!</div>;
}
