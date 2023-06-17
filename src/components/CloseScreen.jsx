import { useNavigate } from "react-router-dom";
import "../assets/styles/closeScreen.css";

import { CSSTransition } from "react-transition-group";

const CloseScreen = ({ lang }) => {
  const navigate = useNavigate();

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
            navigate("/startScreen");
          }}
        >
          {lang.startScreen}
        </button>
        <button
          onClick={() => {
            navigate("/loginScreen");
          }}
        >
          {lang.loginScreen}
        </button>
      </div>
    </CSSTransition>
  );
};

export default CloseScreen;
