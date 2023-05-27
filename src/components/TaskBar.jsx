// TODO - SOME SORT OF LOCALIZATION

import "../assets/styles/taskBar.css";
import {
  menuStartIcon,
  gbFlagIcon,
  polishFlagIcon,
  cloudIcon,
  linkIcon,
  linkSlashIcon,
} from "../assets/icons";
import { CalendarButton } from "./";

const TaskBar = ({
  lang,
  handleShowMenuStart,
  handleShowCalendar,
  handleShowWeatherBox,
  changeLang,
  isConnectedToBackend,
  //apps state and handlers
  toDoApp,
  handleStateToDoApp,
  webBrowser,
  handleStateWebBrowser,
  calculator,
  handleStateCalculator,
  tetris,
  handleStateTetris,
  personalize,
  handleStatePersonalize,
  personalizeUser,
  handleStatePersonalizeUser,
  hideAllPrograms,
}) => {
  return (
    <div className="task-bar">
      <div className="programs">
        <button className="menu-start-btn">
          <img
            src={menuStartIcon}
            alt="Menu Start"
            onClick={handleShowMenuStart}
          />
        </button>
        <div className="task-bar_program-buttons">
          {toDoApp.programEnabled && (
            <button
              onClick={() => {
                hideAllPrograms();
                handleStateToDoApp("hidden", !toDoApp.hidden);
              }}
              className="task-bar_program-button"
              style={{
                backgroundColor: `${
                  toDoApp.hidden ? "var(--hidden)" : "var(--showed)"
                }`,
              }}
            >
              <img src={toDoApp.icon} alt={toDoApp.name} />
              <p>{toDoApp.name}</p>
            </button>
          )}

          {webBrowser.programEnabled && (
            <button
              onClick={() => {
                hideAllPrograms();
                handleStateWebBrowser("hidden", !webBrowser.hidden);
              }}
              className="task-bar_program-button"
              style={{
                backgroundColor: `${
                  webBrowser.hidden ? "var(--hidden)" : "var(--showed)"
                }`,
              }}
            >
              <img src={webBrowser.icon} alt={webBrowser.name} />
              <p>{webBrowser.name}</p>
            </button>
          )}

          {calculator.programEnabled && (
            <button
              onClick={() => {
                hideAllPrograms();
                handleStateCalculator("hidden", !calculator.hidden);
              }}
              className="task-bar_program-button"
              style={{
                backgroundColor: `${
                  calculator.hidden ? "var(--hidden)" : "var(--showed)"
                }`,
              }}
            >
              <img src={calculator.icon} alt={calculator.name} />
              <p>{calculator.name}</p>
            </button>
          )}

          {tetris.programEnabled && (
            <button
              onClick={() => {
                hideAllPrograms();
                handleStateTetris("hidden", !tetris.hidden);
              }}
              className="task-bar_program-button"
              style={{
                backgroundColor: `${
                  tetris.hidden ? "var(--hidden)" : "var(--showed)"
                }`,
              }}
            >
              <img src={tetris.icon} alt={tetris.name} />
              <p>{tetris.name}</p>
            </button>
          )}

          {personalize.programEnabled && (
            <button
              onClick={() => {
                hideAllPrograms();
                handleStatePersonalize("hidden", !personalize.hidden);
              }}
              className="task-bar_program-button"
              style={{
                backgroundColor: `${
                  personalize.hidden ? "var(--hidden)" : "var(--showed)"
                }`,
              }}
            >
              <img src={personalize.icon} alt={personalize.name} />
              <p>{personalize.name}</p>
            </button>
          )}

          {personalizeUser.programEnabled && (
            <button
              onClick={() => {
                hideAllPrograms();
                handleStatePersonalizeUser("hidden", !personalizeUser.hidden);
              }}
              className="task-bar_program-button"
              style={{
                backgroundColor: `${
                  personalizeUser.hidden ? "var(--hidden)" : "var(--showed)"
                }`,
              }}
            >
              <img src={personalizeUser.icon} alt={personalizeUser.name} />
              <p>{personalizeUser.name}</p>
            </button>
          )}
        </div>
      </div>

      <div className="additionals">
        <button
          className="task-bar__language-button"
          onClick={() => {
            if (lang.lng === "pl") {
              changeLang("en");
            } else changeLang("pl");
          }}
        >
          <img
            src={lang.lng === "pl" ? polishFlagIcon : gbFlagIcon}
            alt={lang.lng === "pl" ? "polski" : "english"}
          />
          {lang.lng === "pl" ? "PL" : "EN"}
        </button>

        <button className="task-bar__backend-button">
          <img
            src={isConnectedToBackend ? linkIcon : linkSlashIcon}
            alt={
              isConnectedToBackend
                ? lang.connectedToBackend
                : lang.notConnectedToBackend
            }
          />
        </button>

        <button
          className="task-bar__weather-button"
          onClick={handleShowWeatherBox}
        >
          <img src={cloudIcon} alt={lang.weather} />
        </button>

        <CalendarButton lang={lang} handleShowCalendar={handleShowCalendar} />
      </div>
    </div>
  );
};

export default TaskBar;
