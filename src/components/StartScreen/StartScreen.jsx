import "../../assets/styles/startScreen.css";

import {
  StartScreenStepOne,
  StartScreenStepTwo,
  StartScreenStepThree,
  StartScreenStepFour,
  StartScreenStepFive,
} from "./src/components";

import { useState } from "react";

const StartScreen = ({ lang, changeLang, changeStage }) => {
  const [startScreenStep, setStartScreenStep] = useState(1);
  const changeStartScreenStep = (val) => {
    setStartScreenStep(val);
  };

  const [userForm, setUserForm] = useState({
    email: "",
    password1: "",
    password2: "",
    avatar: null,
  });

  return (
    <div className="start-screen">
      {startScreenStep === 1 && (
        <StartScreenStepOne
          lang={lang}
          changeLang={changeLang}
          changeStartScreenStep={changeStartScreenStep}
        />
      )}

      {startScreenStep === 2 && (
        <StartScreenStepTwo
          lang={lang}
          changeStartScreenStep={changeStartScreenStep}
          changeStage={changeStage}
        />
      )}
      {startScreenStep === 3 && (
        <StartScreenStepThree
          lang={lang}
          changeStartScreenStep={changeStartScreenStep}
          userForm={userForm}
          setUserForm={setUserForm}
        />
      )}
      {startScreenStep === 4 && (
        <StartScreenStepFour
          lang={lang}
          userForm={userForm}
          setUserForm={setUserForm}
          changeStartScreenStep={changeStartScreenStep}
        />
      )}
      {startScreenStep === 5 && (
        <StartScreenStepFive
          lang={lang}
          changeStartScreenStep={changeStartScreenStep}
          changeStage={changeStage}
          userForm={userForm}
          setUserForm={setUserForm}
        />
      )}
    </div>
  );
};

export default StartScreen;
