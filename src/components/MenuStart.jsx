import "../assets/styles/customAlertPrompt.css";
import "../assets/styles/menuStart.css";
import { powerOffIcon, restartIcon } from "../assets/icons";
import { NewsBox } from "./";

import { useState, useEffect } from "react";

import { CSSTransition } from "react-transition-group";

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
      <CSSTransition
        in={showMenuStart}
        timeout={300}
        classNames="menu-start"
        unmountOnExit
      >
        <div className={`menu-start`}>
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
      </CSSTransition>
    </>
  );
};

export default MenuStart;
