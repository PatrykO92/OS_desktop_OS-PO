import { useContext, useState } from "react";

import "../assets/styles/calendarApp.css";
import { WholeAppContext } from "../App";

//for testing
const tasksToDo = {
  "2023-7-16": [
    { id: 12312, title: "Do Laundry", description: "do white laundry" },
  ],
  "2023-7-17": [
    { id: 122334, title: "Do Laundry", description: "do white laundry" },
  ],
  "2023-7-11": [
    { id: 1234, title: "Do Laundry", description: "do white laundry" },
  ],
  "2023-7-1": [
    { id: 12434, title: "Do Laundry", description: "do white laundry" },
  ],
  "2023-7-3": [
    { id: 15234, title: "Do Laundry", description: "do white laundry" },
  ],
  "2023-7-5": [
    { id: 16234, title: "Do Laundry", description: "do white laundry" },
  ],
};

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
  const { lang } = useContext(WholeAppContext);
  const today = new Date();
  const [allTasks, setAllTasks] = useState(tasksToDo);
  const [date, setDate] = useState(new Date());
  const [inputValue, setInputValue] = useState();

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
      let list = [];
      if (`${year}-${month + 1}-${day}` === "2023-7-10") {
        list.push(<p>Super</p>);
        list.push(<p>Super</p>);
        list.push(<p>Super</p>);
        list.push(<p>Super</p>);
        list.push(<p>Super</p>);
        list.push(<p>Super</p>);
      }

      if (day === date.getDate()) {
        calendarDays.push(
          <div
            className="calendar--app--main__day active--day"
            onClick={() => {
              setDate(new Date(year, month, day));
            }}
          >
            {day}
            {list?.map((item) => (
              <p>{item}</p>
            ))}
          </div>
        );
      }
      if (day !== date.getDate()) {
        calendarDays.push(
          <div
            className="calendar--app--main__day"
            onClick={() => {
              setDate(new Date(year, month, day));
            }}
          >
            {day}
            <div className="calendar--app--main__day__tasks--list">
              {list?.map((item) => item)}
            </div>
          </div>
        );
      }
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
          <li>Button1</li>
          <li>Button2</li>
          <li>Button3</li>
        </ul>
        <div className="calendar--app--task">Task Window</div>
      </aside>
      <main>
        <div className="calendar--app--main">
          <div className="calendar--app--main__header">
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
