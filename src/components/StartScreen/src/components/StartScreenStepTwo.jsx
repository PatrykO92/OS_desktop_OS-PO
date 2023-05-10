import { plusCircleIcon, userIcon, loginIcon } from "../../../../assets/icons";

const StartScreenStepTwo = ({ lang, changeStage, changeStartScreenStep }) => {
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
        {lang.guestUser}
      </button>

      <button
        onClick={() => {
          changeStartScreenStep(3);
        }}
      >
        <img src={plusCircleIcon} alt="" />
        {lang.userSetup}
      </button>

      <button
        onClick={() => {
          changeStage("loginScreen");
        }}
      >
        <img src={loginIcon} alt="" />
        {lang.loginButton}
      </button>
    </div>
  );
};

export default StartScreenStepTwo;
