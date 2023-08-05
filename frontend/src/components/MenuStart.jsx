import styles from "../assets/styles/menuStart.module.css";
import { powerOffIcon, restartIcon } from "../assets/icons";
import { useContext, useState } from "react";
import { WholeAppContext } from "../App";
import { useNavigate } from "react-router-dom";
import Prompt from "./Prompt";

const MenuStart = ({ children }) => {
  const navigate = useNavigate();
  const {
    lang,
    user,
    closeAllPrograms,
    handleStatePersonalizeUser,
    hideAllPrograms,
  } = useContext(WholeAppContext);

  const [showAlert, setShowAlert] = useState(false);
  const [nextStage, setNextStage] = useState(null);

  const handleButtonClick = (val) => {
    setShowAlert(true);
    setNextStage(val);
  };

  const handleAccept = () => {
    closeAllPrograms();
    setShowAlert(false);
    navigate(`/${nextStage}`);
  };

  const handleDismiss = () => {
    setShowAlert(false);
  };

  return (
    <>
      <div className={styles.menuStart}>
        {children}
        <div className={styles.utils}>
          <button
            className={styles.menuStartButton}
            onClick={() => {
              hideAllPrograms();
              handleStatePersonalizeUser("programEnabled", true);
              handleStatePersonalizeUser("hidden", false);
            }}
          >
            <img
              src={user.avatar}
              alt={`${lang.name} ${lang.lastName}`}
              className={styles.avatar}
            />
            <p>{`${user.name} ${user.lastName}`}</p>
          </button>
          <div>
            <button
              className={styles.menuStartButton}
              onClick={() => handleButtonClick("loginScreen")}
            >
              <img
                src={restartIcon}
                alt={lang.restart}
                className={styles.button}
              />
            </button>
            <button
              className={styles.menuStartButton}
              onClick={() => handleButtonClick("closeScreen")}
            >
              <img
                src={powerOffIcon}
                alt={lang.power}
                className={styles.button}
              />
            </button>
          </div>
        </div>
        <Prompt
          showAlert={showAlert}
          handleAccept={handleAccept}
          handleDismiss={handleDismiss}
        />
      </div>
    </>
  );
};

export default MenuStart;
