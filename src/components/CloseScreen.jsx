import "../assets/styles/closeScreen.css";

import { useState } from "react";

import { CSSTransition } from "react-transition-group";

// Whole component made to understand React CSS transistions.
const CloseScreen = () => {
  const [showButton, setShowButton] = useState(false);

  return (
    <div>
      <button
        onClick={() => {
          setShowButton(!showButton);
        }}
      >
        Button
      </button>

      <CSSTransition
        in={showButton}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <div>Hello world!</div>
      </CSSTransition>
    </div>
  );
};

export default CloseScreen;
