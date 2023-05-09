import { plusCircleIcon, userIcon } from "../../../../assets/icons";

const StartScreenStepTwo = ({ lang, changeStage, changeFormStep }) => {
  return (
    <div className="start-screen_step-two">
      <div>
        <p>{lang.startScreenText1}</p>
        <p>{lang.startScreenText2}</p>
      </div>

      <button
        onClick={() => {
          changeStage("loginScreen");
        }}
      >
        <img src={userIcon} alt="" />
        {lang.defaultUser}
      </button>
      <button
        onClick={() => {
          changeFormStep(3);
        }}
      >
        <img src={plusCircleIcon} alt="" />
        {lang.userSetup}
      </button>
    </div>
  );
};

export default StartScreenStepTwo;
