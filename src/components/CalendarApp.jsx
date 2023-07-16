import { useContext, useState } from "react";

import "../assets/styles/calendarApp.css";
import { WholeAppContext } from "../App";

//for testing
const tasksToDo = {};

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const CalendarApp = () => {
  // get today date to show current day
  const today = new Date();

  // get language
  const { lang } = useContext(WholeAppContext);

  // get all task from backend, to implement later
  const [allTasks, setAllTasks] = useState(tasksToDo);

  const [date, setDate] = useState(new Date());
  const [inputValue, setInputValue] = useState();
  const [showAddTask, setShowAddTask] = useState(false);
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");

  const addNewTask = () => {
    const keyVal = date.toLocaleDateString();
    const id = Math.floor(Math.random() * 100000000);
    setAllTasks((oldVal) => ({
      ...oldVal,
      [keyVal]: [...(oldVal[keyVal] || []), { id, title: topic, description }],
    }));
  };

  const actualMonth = () => {
    setDate(new Date());
  };

  const prevMonth = () => {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const nextMonth = () => {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const renderCalendar = () => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();

    const calendarDays = [];

    // Add empty cells for previous month's days
    for (let i = 0; i < firstDayOfWeek; i++) {
      calendarDays.push(<div className="calendar--app--main__day empty"></div>);
    }

    // Add cells for current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const targetDate = new Date(year, month, day).toLocaleDateString("pl");
      console.log(targetDate);
      let list = [];
      if (allTasks.hasOwnProperty(targetDate)) {
        list.push(...allTasks[targetDate]);
      }

      calendarDays.push(
        <div
          className={`calendar--app--main__day ${
            day === date.getDate() ? "active--day" : ""
          }`}
          onClick={() => {
            setDate(new Date(year, month, day));
          }}
        >
          {day}
          <div className="calendar--app--main__day__tasks--list">
            {list?.map((item) => (
              <p>{item.title}</p>
            ))}
          </div>
        </div>
      );
    }
    return calendarDays;
  };

  return (
    <div className="calendar--app">
      <header>
        <p>Today: {today.toLocaleDateString(lang.lng)}</p>
      </header>
      <aside>
        <ul>
          <li>
            <button onClick={() => setShowAddTask((oldVal) => !oldVal)}>
              Add new task
            </button>
          </li>
        </ul>
        {showAddTask && (
          <form
            className="calendar--app--task"
            onSubmit={(e) => {
              e.preventDefault();
              addNewTask();
              setTopic("");
              setDescription("");
              setShowAddTask(false);
            }}
          >
            <label>Topic:</label>
            <input
              type="text"
              required
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button type="submit">Add</button>
          </form>
        )}
      </aside>
      <main>
        <div className="calendar--app--main">
          <div className="calendar--app--main__header">
            Date picker:
            <input
              type="date"
              value={inputValue}
              onChange={(val) => {
                setInputValue(val.target.value);
                setDate(new Date(val.target.value));
              }}
            />
            <button onClick={prevMonth}>Previous Month</button>
            <button onClick={actualMonth}>Actual Month</button>
            <button onClick={nextMonth}>Next Month</button>
            <p>{date.toLocaleDateString(lang.lng)}</p>
          </div>
          <div className="calendar--app--main__body">
            {weekdays.map((day, index) => (
              <div
                key={`weekdays${day}+${index}`}
                className="calendar--app--main__day--name"
              >
                {day}
              </div>
            ))}
            {renderCalendar()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CalendarApp;
