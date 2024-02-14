import styles from "../assets/styles/desktop.module.css";

import "intro.js/introjs.css";
import "../assets/styles/introjsMyStyling.css";

import { useContext, useState } from "react";
import { Steps } from "intro.js-react";

import { WholeAppContext } from "../App";

const Desktop = () => {
  const {
    user,
    lang,
    toDoApp,
    handleStateToDoApp,
    webBrowser,
    handleStateWebBrowser,
    calculator,
    handleStateCalculator,
    tetris,
    handleStateTetris,
    calendarApp,
    handleStateCalendarApp,
  } = useContext(WholeAppContext);

  const [stepsEnabled, setStepsEnabled] = useState(true);

  // TODO - REFACTOR
  const steps = [
    {
      element: ".icon1",
      title: lang.stepTitle,
      intro: lang.step1,
    },
    {
      element: ".menu-start-btn",
      title: lang.stepTitle,
      intro: lang.step2,
    },
    {
      element: ".task-bar__language-button",
      title: lang.stepTitle,
      intro: lang.step3,
    },
    {
      title: lang.stepTitle,
      intro: lang.step4,
    },
  ];

  return (
    <div
      id="desktop"
      className={styles.desktop}
      style={{ backgroundImage: `url(${user?.settings.wallpaper})` }}
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
        className={`${styles.icon} icon1`}
      >
        <img src={toDoApp.icon} alt={toDoApp.name} />
        <p>{toDoApp.name}</p>
      </button>

      <button
        onClick={() => {
          handleStateWebBrowser("hidden", false);
          handleStateWebBrowser("programEnabled", true);
        }}
        className={styles.icon}
      >
        <img src={webBrowser.icon} alt={webBrowser.name} />
        <p>{webBrowser.name}</p>
      </button>

      <button
        onClick={() => {
          handleStateCalculator("hidden", false);
          handleStateCalculator("programEnabled", true);
        }}
        className={styles.icon}
      >
        <img src={calculator.icon} alt={calculator.name} />
        <p>{calculator.name}</p>
      </button>

      <button
        onClick={() => {
          handleStateTetris("hidden", false);
          handleStateTetris("programEnabled", true);
        }}
        className={styles.icon}
      >
        <img src={tetris.icon} alt={tetris.name} />
        <p>{tetris.name}</p>
      </button>
      <button
        onClick={() => {
          handleStateCalendarApp("hidden", false);
          handleStateCalendarApp("programEnabled", true);
        }}
        className={styles.icon}
      >
        <img src={calendarApp.icon} alt={calendarApp.name} />
        <p>{calendarApp.name}</p>
      </button>
    </div>
  );
};

export default Desktop;
