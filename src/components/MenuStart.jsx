import "../assets/styles/customAlertPrompt.css";
import "../assets/styles/menuStart.css";
import { powerOffIcon, restartIcon } from "../assets/icons";
import { NewsBox } from "./";

import { useState } from "react";

const MenuStart = ({
  lang,
  user,
  changeStage,
  handleStateWebBrowser,
  closeAllPrograms,
}) => {
  const [showAlert, setShowAlert] = useState(false);
  const [nextStage, setNextStage] = useState(null);

  const handleButtonClick = (val) => {
    setShowAlert(true);
    setNextStage(val);
  };

  const handleAccept = () => {
    closeAllPrograms();
    setShowAlert(false);
    changeStage(nextStage);
  };

  const handleDismiss = () => {
    setShowAlert(false);
  };

  return (
    <>
      <div className={`menu-start`}>
        <div className="menu-start-widget">
          <NewsBox lang={lang} handleStateWebBrowser={handleStateWebBrowser} />
        </div>
        <div className="menu-start-utils">
          <button>
            <img
              src={user.avatar}
              alt={`${lang.name} ${lang.lastName}`}
              className="menu-start-avatar"
            />
            <p>{`${user.name} ${user.lastName}`}</p>
          </button>
          <div>
            <button onClick={() => handleButtonClick("loginScreen")}>
              <img
                src={restartIcon}
                alt={lang.restart}
                className="menu-start-button-img"
              />
            </button>
            <button onClick={() => handleButtonClick("closeScreen")}>
              <img
                src={powerOffIcon}
                alt={lang.power}
                className="menu-start-button-img"
              />
            </button>
          </div>
        </div>
      </div>
      <div
        className={`custom-alert-prompt__background ${
          showAlert && "custom-alert-prompt__background-show"
        }`}
      ></div>
      <div
        className={`custom-alert-prompt ${
          showAlert && "custom-alert-prompt-show"
        }`}
      >
        <div>
          <p>{lang.areYouSure}</p>
          <div>
            <button
              onClick={handleAccept}
              className="custom-alert-prompt-accept-btn"
            >
              {lang.accept}
            </button>
            <button
              onClick={handleDismiss}
              className="custom-alert-prompt-dismiss-btn"
            >
              {lang.dismiss}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuStart;
