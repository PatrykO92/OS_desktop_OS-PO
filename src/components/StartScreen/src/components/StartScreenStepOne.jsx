import { plFlagIcon, usFlagIcon } from "../../../../assets/icons";

const StartScreenStepOne = ({ lang, changeLang, changeStartScreenStep }) => {
  return (
    <div className="start-screen_step-one">
      <div>{lang.chooseLanguage}:</div>

      <div>
        <button
          onMouseOver={() => {
            changeLang("en");
          }}
          onClick={() => {
            changeLang("en");
            changeStartScreenStep(2);
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
            changeStartScreenStep(2);
          }}
        >
          <img src={plFlagIcon} alt="Polski" />
        </button>
      </div>
    </div>
  );
};

export default StartScreenStepOne;
