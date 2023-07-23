import { WholeAppContext } from "../../App";
import "../../assets/styles/startScreen.css";

import {
  StartScreenStepOne,
  StartScreenStepTwo,
  StartScreenStepThree,
  StartScreenStepFour,
  StartScreenStepFive,
} from "./src/components";

import { useContext, useState } from "react";

const StartScreen = () => {
  const { lang, changeLang, changeUser } = useContext(WholeAppContext);
  const [startScreenStep, setStartScreenStep] = useState(1);
  const changeStartScreenStep = (val) => {
    setStartScreenStep(val);
  };

  const [userForm, setUserForm] = useState({
    name: "",
    lastName: "",
    pin: "",
    avatar: null,
    userTag: "",
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
          changeUser={changeUser}
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
          changeUser={changeUser}
          userForm={userForm}
          setUserForm={setUserForm}
        />
      )}
    </div>
  );
};

export default StartScreen;
