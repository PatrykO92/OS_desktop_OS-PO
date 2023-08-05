import { useNavigate } from "react-router-dom";
import styles from "../assets/styles/closeScreen.module.css";

import { CSSTransition } from "react-transition-group";
import { useContext } from "react";
import { WholeAppContext } from "../App";
import useRemoveUser from "../hooks/useRemoveUser";

const CloseScreen = () => {
  const { lang } = useContext(WholeAppContext);
  const removeUser = useRemoveUser();
  const navigate = useNavigate();

  return (
    <CSSTransition
      in={true}
      appear={true}
      timeout={300}
      classNames="fade"
      unmountOnExit
    >
      <div className={styles.closeScreen}>
        <p>{lang.closeScreen1}</p>
        <p>{lang.closeScreen2}</p>
        <button
          onClick={() => {
            removeUser();
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
