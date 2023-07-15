import { useState } from "react";

import "../assets/styles/calendarApp.css";

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
  const [date, setDate] = useState(new Date());

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
      calendarDays.push(<div className="calendar--app--main__day">{day}</div>);
    }
    console.log(calendarDays);
    return calendarDays;
  };

  return (
    <div className="calendar--app">
      <header>
        <p>Today: 2023-12-12</p>
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
            <button onClick={prevMonth}>Previous Month</button>
            <h2>
              {date.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <button onClick={nextMonth}>Next Month</button>
          </div>
          <div className="calendar--app--main__body">
            {weekdays.map((day) => (
              <div className="calendar--app--main__day--name">{day}</div>
            ))}
            {renderCalendar()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CalendarApp;
