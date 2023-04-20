// TODO - SOME SORT OF LOCALIZATION / WIFI CONNECTION ETC. in WiFi button

import "../assets/styles/taskBar.css";
import { menuStartIcon } from "../assets/icons";
import { CalendarButton } from "./";

const TaskBar = ({
  lang,
  handleShowMenuStart,
  handleShowCalendar,
  //apps state and handlers
  toDoApp,
  handleStateToDoApp,
  webBrowser,
  handleStateWebBrowser,
  calculator,
  handleStateCalculator,
  tetris,
  handleStateTetris,
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
                handleStateToDoApp("hidden", !toDoApp.hidden);
                handleStateWebBrowser("hidden", true);
                handleStateCalculator("hidden", true);
                handleStateTetris("hidden", true);
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
                handleStateWebBrowser("hidden", !webBrowser.hidden);
                handleStateToDoApp("hidden", true);
                handleStateCalculator("hidden", true);
                handleStateTetris("hidden", true);
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
                handleStateCalculator("hidden", !calculator.hidden);
                handleStateWebBrowser("hidden", true);
                handleStateToDoApp("hidden", true);
                handleStateTetris("hidden", true);
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
                handleStateCalculator("hidden", true);
                handleStateWebBrowser("hidden", true);
                handleStateToDoApp("hidden", true);
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
        </div>
      </div>

      <div className="additionals">
        <button>WiFi</button>
        <CalendarButton lang={lang} handleShowCalendar={handleShowCalendar} />
      </div>
    </div>
  );
};

export default TaskBar;
