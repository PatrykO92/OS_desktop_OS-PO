import { arrowLeftIcon, checkIcon } from "../../../../assets/icons";

import { loginInToBackend } from "../../../../utils";

import { useState } from "react";

const StartScreenStepFive = ({
  lang,
  changeStartScreenStep,
  changeStage,
  changeUser,
  userForm,
}) => {
  const [showPin, setShowPin] = useState(false);

  const handleSubmit = () => {
    loginInToBackend();
    // const userTag =
    //   userForm.name.slice(0, 3) + "_" + userForm.lastName.slice(0, 3);
    // changeUser({ ...userForm, userTag });
    // changeStage("loginScreen");
  };

  return (
    <div className="start-screen_step-five">
      <div className="start-screen_step-five_description">
        <p>{lang.finalSummary}</p>
        <p>{lang.finalSummaryDes}</p>
        <p>
          {userForm.name} {userForm.lastName}
        </p>
        <p>
          PIN:
          <span
            onMouseOver={() => setShowPin(true)}
            onMouseOut={() => setShowPin(false)}
          >
            {showPin ? userForm.pin : lang.showPin}
          </span>
        </p>
      </div>
      <div className="start-screen_step-five_avatar">
        <img src={userForm.avatar} alt="user avatar" />
      </div>
      <div className="start-screen_step-five_buttons">
        <button onClick={() => changeStartScreenStep(4)}>
          <img src={arrowLeftIcon} alt="" />
          {lang.back}
        </button>
        <button onClick={handleSubmit}>
          <img src={checkIcon} alt="" />
          {lang.submit}
        </button>
      </div>
    </div>
  );
};

export default StartScreenStepFive;
