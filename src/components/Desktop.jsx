import "../assets/styles/desktop.css";

import "intro.js/introjs.css";
import "../assets/styles/introjsMyStyling.css";

import { useState } from "react";
import { Steps } from "intro.js-react";

const Desktop = ({
  lang,
  user,
  // Apps states and handlers
  toDoApp,
  handleStateToDoApp,
  webBrowser,
  handleStateWebBrowser,
  calculator,
  handleStateCalculator,
  tetris,
  handleStateTetris,
}) => {
  const [stepsEnabled, setStepsEnabled] = useState(true);

  const steps = [
    {
      element: ".desktop_icon",
      intro: lang.step1,
    },
    {
      element: ".menu-start-btn",
      intro: lang.step2,
    },
    {
      element: ".task-bar__language-button",
      intro: lang.step3,
    },
    {
      intro: lang.step4,
    },
  ];

  return (
    <div
      className="desktop"
      style={{ backgroundImage: `url(${user.settings.wallpaper})` }}
    >
      <Steps
        enabled={stepsEnabled}
        steps={steps}
        initialStep={0}
        options={{
          nextLabel: lang.next,
          prevLabel: lang.back,
          doneLabel: "Ok",
          showBullets: false,
          dontShowAgain: true,
          dontShowAgainLabel: lang.dontShowAgain,
        }}
        onExit={() => setStepsEnabled(false)}
      />
      <button
        onClick={() => {
          handleStateToDoApp("hidden", false);
          handleStateToDoApp("programEnabled", true);
        }}
        className="desktop_icon"
      >
        <img src={toDoApp.icon} alt={toDoApp.name} />
        <p>{toDoApp.name}</p>
      </button>

      <button
        onClick={() => {
          handleStateWebBrowser("hidden", false);
          handleStateWebBrowser("programEnabled", true);
        }}
        className="desktop_icon"
      >
        <img src={webBrowser.icon} alt={webBrowser.name} />
        <p>{webBrowser.name}</p>
      </button>

      <button
        onClick={() => {
          handleStateCalculator("hidden", false);
          handleStateCalculator("programEnabled", true);
        }}
        className="desktop_icon"
      >
        <img src={calculator.icon} alt={calculator.name} />
        <p>{calculator.name}</p>
      </button>

      <button
        onClick={() => {
          handleStateTetris("hidden", false);
          handleStateTetris("programEnabled", true);
        }}
        className="desktop_icon"
      >
        <img src={tetris.icon} alt={tetris.name} />
        <p>{tetris.name}</p>
      </button>
    </div>
  );
};

export default Desktop;
