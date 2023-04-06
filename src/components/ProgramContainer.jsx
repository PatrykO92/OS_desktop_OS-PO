import "../assets/styles/programContainer.css";
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
        className={
          programHidden
            ? "program-container program-container_hidden"
            : "program-container"
        }
      >
        <div className="program-container_title-bar">
          <div className="program-container_title-bar_program-name">
            <img src={programIcon} alt="placeholder to remove" />
            <p>{programName}</p>
          </div>
          <div className="program-container_title-bar_buttons">
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
        <div className="program-container_main-window">{children}</div>
      </div>
    </CSSTransition>
  );
};

export default ProgramContainer;
