import React, { useState } from "react";
import "./assets/styles/customAlertPrompt.css";

function CustomAlertPrompt({ alertText = "Ok?" }) {
  const [showAlert, setShowAlert] = useState(true);

  const handleAccept = () => {
    setShowAlert(false);
  };

  const handleDismiss = () => {
    setShowAlert(false);
  };

  const alertPrompt = <div>{alertText}</div>;

  return (
    <div
      className={`custom-alert-prompt ${
        showAlert && "custom-alert-prompt-show"
      }`}
    >
      <div>
        <p>{alertPrompt}</p>
        <div>
          <button
            onClick={handleAccept}
            className="custom-alert-prompt-accept-btn"
          >
            Accept
          </button>
          <button
            onClick={handleDismiss}
            className="custom-alert-prompt-dismiss-btn"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomAlertPrompt;
