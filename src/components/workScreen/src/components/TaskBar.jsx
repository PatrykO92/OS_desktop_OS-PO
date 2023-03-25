import { useState, useRef } from "react";

import Calendar from "react-calendar";
import "../assets/styles/myCalendar.css";

import windowIcon from "../assets/icons/windows.svg";
import "../assets/styles/taskBar.css";

import { CalendarButton } from "./";

const TaskBar = ({ lang }) => {
  const calendarRef = useRef(null);
  const [value, onChange] = useState(new Date());

  return (
    <div className="task-bar">
      <div className="programs">
        <button className="menu-start">
          <img src={windowIcon} alt="Menu Start" />
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
