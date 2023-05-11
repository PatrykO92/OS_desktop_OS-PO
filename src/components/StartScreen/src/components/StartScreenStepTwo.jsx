import { plusCircleIcon, userIcon } from "../../../../assets/icons";
import { avatarOne } from "../../../../assets/images/avatar-images";

const StartScreenStepTwo = ({
  lang,
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
          changeUser({
            name: "Nicolaus",
            lastName: "Copernicus",
            pin: "",
            avatar: avatarOne,
            userTag: "Nic_Cop",
          });
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
