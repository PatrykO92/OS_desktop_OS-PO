import windowIcon from "../assets/icons/windows.svg";
import "../assets/styles/taskBar.css";

import { CalendarButton } from "./";

const TaskBar = () => {
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
        <button>1</button>
        <CalendarButton />
      </div>
    </div>
  );
};

export default TaskBar;
