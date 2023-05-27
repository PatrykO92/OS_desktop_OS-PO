import { plusCircleIcon, userIcon } from "../../../../assets/icons";
import { loginInToBackend, defaultUser } from "../../../../utils";

const StartScreenStepTwo = ({
  lang,
  setIsConnectedToBackend,
  changeStage,
  changeStartScreenStep,
  changeUser,
}) => {
  return (
    <div className="start-screen_step-two">
      <div>
        <p>{lang.startScreenText1}</p>
        <p>{lang.startScreenText2}</p>
      </div>

      <button
        onClick={() => {
          const login = loginInToBackend();
          login
            .then((res) => {
              if (res) setIsConnectedToBackend(true);
            })
            .catch((err) => {
              setIsConnectedToBackend(false);
            });
          changeUser(defaultUser);
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
    </div>
  );
};

export default StartScreenStepTwo;
