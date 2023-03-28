import "../assets/styles/taskBar.css";
import { menuStartIcon } from "../assets/icons";
import { CalendarButton } from "./";

import { useState, useRef } from "react";

import Calendar from "react-calendar";
import "../assets/styles/myCalendar.css";

const TaskBar = ({ lang, handleShowMenuStart }) => {
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
        {/* ##TODO - LIST OF OPENED APPS, DEPENDS ON STATE/PROPS */}
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
