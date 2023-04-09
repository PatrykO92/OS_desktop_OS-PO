import "../assets/styles/closeScreen.css";

import { CSSTransition } from "react-transition-group";

const CloseScreen = ({ lang, changeStage }) => {
  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={300}
      classNames="fade"
      unmountOnExit
    >
      <div className="close-screen">
        <p>{lang.closeScreen1}</p>
        <p>{lang.closeScreen2}</p>
        <button
          onClick={() => {
            changeStage("startScreen");
          }}
        >
          Start Screen
        </button>
        <button
          onClick={() => {
            changeStage("loginScreen");
          }}
        >
          Login Screen
        </button>
      </div>
    </CSSTransition>
  );
};

export default CloseScreen;
