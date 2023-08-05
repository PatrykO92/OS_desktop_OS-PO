import { useContext } from "react";
import styles from "../assets/styles/customAlertPrompt.module.css";
import { WholeAppContext } from "../App";

function Prompt({ showAlert, handleAccept, handleDismiss }) {
  const { lang } = useContext(WholeAppContext);

  return (
    <>
      <div
        className={`${styles.background} ${
          showAlert ? styles.backgroundShow : " "
        }`}
      ></div>
      <div
        className={`${styles.prompt} ${showAlert ? styles.promptShow : " "}`}
      >
        <div>
          <p>{lang.areYouSure}</p>
          <div>
            <button onClick={handleAccept} className={styles.accept}>
              {lang.accept}
            </button>
            <button onClick={handleDismiss} className={styles.dismiss}>
              {lang.dismiss}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Prompt;
