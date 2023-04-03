import "../assets/styles/taskBar.css";
import { menuStartIcon } from "../assets/icons";
import { CalendarButton } from "./";

import { useState, useRef } from "react";

import Calendar from "react-calendar";
import "../assets/styles/myCalendar.css";

const TaskBar = ({
  lang,
  handleShowMenuStart,
  toDoApp,
  handleStateToDoApp,
  webBrowser,
  handleStateWebBrowser,
}) => {
  const calendarRef = useRef(null);
  const [value, onChange] = useState(new Date());

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
        </div>
      </div>

      <div className="additionals">
        {/* ##TODO - SOME SORT OF LOCALIZATION / WIFI CONNECTION ETC. */}
        <div>
          <button>WiFi</button>
        </div>

        <div
          onClick={() =>
            calendarRef.current.classList.toggle("hidden-calendar")
          }
        >
          <CalendarButton />
        </div>
      </div>
      {/* TODO - REFRACTOR - MOVE CALENDAR TO MAIN WORK SCREEN */}
      <div className="calendar-div hidden-calendar" ref={calendarRef}>
        <Calendar onChange={onChange} value={value} locale={lang.lng} />
      </div>
    </div>
  );
};

export default TaskBar;
