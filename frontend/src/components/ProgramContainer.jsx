import styles from "../assets/styles/programContainer.module.css";
import { windowMinimizeIcon, xmarkIcon } from "../assets/icons";

import { CSSTransition } from "react-transition-group";

const ProgramContainer = ({
  lang,
  programName,
  programIcon,
  programHidden,
  handleProgramState,
  handleDefaultProgramState,
  children,
}) => {
  return (
    <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
      <div
        className={`${styles.container}
          ${programHidden && styles.hidden}
        `}
      >
        <div className={styles.titleBar}>
          <div className={styles.programName}>
            <img src={programIcon} alt={programName} />
            <p>{programName}</p>
          </div>
          <div className={styles.barButtons}>
            <button
              onClick={() => {
                handleProgramState("hidden", true);
              }}
            >
              <img src={windowMinimizeIcon} alt={lang.minimize} />
            </button>
            <button
              onClick={() => {
                handleDefaultProgramState();
              }}
            >
              <img src={xmarkIcon} alt={lang.closeProgram} />
            </button>
          </div>
        </div>
        <div className={styles.mainWindow}>{children}</div>
      </div>
    </CSSTransition>
  );
};

export default ProgramContainer;
