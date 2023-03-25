import { useState } from "react";

import Calendar from "react-calendar";
import "../assets/styles/myCalendar.css";

import windowIcon from "../assets/icons/windows.svg";
import "../assets/styles/taskBar.css";

import { CalendarButton } from "./";

const TaskBar = ({ lang }) => {
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
        <button onClick={() => console.log(lang.lng)}>WiFi</button>
        <CalendarButton />
      </div>
      <div className="calendar-div">
        <Calendar onChange={onChange} value={value} locale={lang.lng} />
      </div>
    </div>
  );
};

export default TaskBar;
