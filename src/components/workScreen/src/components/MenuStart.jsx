import React, { useState, useEffect } from "react";
import "../assets/styles/customAlertPrompt.css";
import "../assets/styles/menuStart.css";
import { powerOffIcon, restartIcon } from "../assets/icons";
import { NewsBox } from ".";

const MenuStart = ({ showMenuStart, lang, user, changeStage }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [nextStage, setNextStage] = useState(null);

  const handleButtonClick = (val) => {
    setShowAlert(true);
    setNextStage(val);
  };

  const handleAccept = () => {
    setShowAlert(false);
    changeStage(nextStage);
  };

  const handleDismiss = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    setShowAlert(false);
  }, [showMenuStart]);

  return (
    <>
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
      <div className={`menu-start ${showMenuStart ? "hidden-menu-start" : ""}`}>
        <div className="menu-start-widget">
          <NewsBox lang={lang} />
        </div>
        <div className="menu-start-utils">
          <button>
            <img
              src={user.avatar}
              alt={`${lang.name} ${lang.surname}`}
              className="menu-start-avatar"
            />
            <p>{`${user.name} ${user.surname}`}</p>
          </button>
          <div>
            <button onClick={() => handleButtonClick("loginScreen")}>
              <img
                src={restartIcon}
                alt={lang.restart}
                className="menu-start-button-img"
              />
            </button>
            <button onClick={() => handleButtonClick("loginScreen")}>
              <img
                src={powerOffIcon}
                alt={lang.power}
                className="menu-start-button-img"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuStart;
