import { useContext, useState } from "react";

import "../assets/styles/calendarApp.css";
import { WholeAppContext } from "../App";

//for testing
const tasksToDo = [];

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

  const [startInputValue, setStartInputValue] = useState();
  const [endInputValue, setEndInputValue] = useState();

  const [showAddTask, setShowAddTask] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addNewTask = () => {
    const startTaskDate = new Date(startInputValue);
    startTaskDate.setHours(0);
    const endTaskDate = new Date(endInputValue);
    endTaskDate.setHours(0);

    // for easier testing
    // const id = Math.floor(Math.random() * 100000000);
    const id = 2;

    setAllTasks((oldVal) => [
      ...oldVal,
      { id, startTaskDate, endTaskDate, title, description },
    ]);
  };

  const removeTask = (id) => {
    const updatedTasks = allTasks.filter((task) => task.id !== id);
    setAllTasks(updatedTasks);
  };

  const actualMonth = () => {
    const actualDate = new Date();
    actualDate.setDate(1);
    setDate(actualDate);
  };

  const prevYear = () => {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setFullYear(newDate.getFullYear() - 1);
      return newDate;
    });
  };

  const nextYear = () => {
    setDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setFullYear(newDate.getFullYear() + 1);
      return newDate;
    });
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
      calendarDays.push(
        <div
          key={`empty-${i}`}
          className="calendar--app--main__day empty"
        ></div>
      );
    }

    // Add cells for current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const targetDate = new Date(year, month, day);

      // create list of tasks for each day
      const list = allTasks.filter(
        (task) =>
          task.startTaskDate <= targetDate && task.endTaskDate >= targetDate
      );

      calendarDays.push(
        <div
          key={`day-${day}`}
          className={`calendar--app--main__day ${
            day === date.getDate() ? "active--day" : ""
          }`}
          onClick={() => {
            const selectedDate = new Date(year, month, day);
            setDate(selectedDate);
            setStartInputValue(selectedDate.toISOString().substring(0, 10));
            setEndInputValue(selectedDate.toISOString().substring(0, 10));
          }}
        >
          {day}
          <div className="calendar--app--main__day__tasks--list">
            {list?.map((item, index) => (
              <p key={`${index}${item.id}`}>{item.title}</p>
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
            <button
              onClick={() => {
                console.log(allTasks);
                console.log(startInputValue, endInputValue);
              }}
            >
              test
            </button>
            <button onClick={() => removeTask(2)}>Remove</button>
          </li>
        </ul>

        {showAddTask && (
          <form
            className="calendar--app--task"
            onSubmit={(e) => {
              e.preventDefault();
              addNewTask();
              setTitle("");
              setDescription("");
              setStartInputValue();
              setEndInputValue();
              setShowAddTask(false);
            }}
          >
            <label htmlFor="startDate">Start:</label>
            <input
              id="startDate"
              type="date"
              value={startInputValue}
              onChange={(e) => setStartInputValue(e.target.value)}
            />
            <label htmlFor="endDate">End:</label>
            <input
              id="endDate"
              type="date"
              value={endInputValue}
              onChange={(e) => setEndInputValue(e.target.value)}
            />
            <label htmlFor="title">title:</label>
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button type="submit">Add</button>
          </form>
        )}
      </aside>

      <main>
        <div className="calendar--app--main__header">
          <p>
            {date.toLocaleDateString(lang.lng, {
              year: "numeric",
              month: "long",
            })}
          </p>
          <button onClick={prevYear}>Previous Year</button>
          <button onClick={prevMonth}>Previous Month</button>
          <button onClick={actualMonth}>Actual Month</button>
          <button onClick={nextMonth}>Next Month</button>
          <button onClick={nextYear}>Next Year</button>
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
      </main>
    </div>
  );
};

export default CalendarApp;
