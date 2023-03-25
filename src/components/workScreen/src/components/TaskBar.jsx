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
    <div className="task-bar" style={{ backgroundColor: "hsl(200, 60%, 8%)" }}>
      <div className="programs">
        <button className="menu-start">
          <img src={windowIcon} alt="Menu Start" />
        </button>
        <button></button>
        <button></button>
      </div>

      <div className="additionals">
        <div>
          <button>WiFi</button>
        </div>
        <div onClick={() => calendarRef.current.classList.toggle("hidden")}>
          <CalendarButton />
        </div>
      </div>

      <div className="calendar-div hidden" ref={calendarRef}>
        <Calendar onChange={onChange} value={value} locale={lang.lng} />
      </div>
    </div>
  );
};

export default TaskBar;
