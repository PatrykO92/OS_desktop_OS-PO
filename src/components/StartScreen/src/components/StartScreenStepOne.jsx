import { polishFlagIcon, gbFlagIcon } from "../../../../assets/icons";

const StartScreenStepOne = ({ lang, changeLang, changeFormStep }) => {
  return (
    <div className="start-screen_step-one">
      <div>
        <b>{lang.chooseLanguage}</b>
      </div>

      <div>
        <button
          onMouseOver={() => {
            changeLang("en");
          }}
          onClick={() => {
            changeLang("en");
            changeFormStep(2);
          }}
        >
          <img src={gbFlagIcon} alt="English" />
        </button>
        <button
          onMouseOver={() => {
            changeLang("pl");
          }}
          onClick={() => {
            changeLang("pl");
            changeFormStep(2);
          }}
        >
          <img src={polishFlagIcon} alt="Polski" />
        </button>
      </div>
    </div>
  );
};

export default StartScreenStepOne;
