import styles from "../assets/styles/calendarButton.module.css";

import { useState, useEffect } from "react";

const CalendarButton = ({ lang, handleShowCalendar }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  let formattedDate;
  if (lang.lng === "en-us") {
    formattedDate = `${(now.getMonth() + 1).toString().padStart(2, "0")}/${now
      .getDate()
      .toString()
      .padStart(2, "0")}/${now.getFullYear()}`;
  } else {
    formattedDate = `${now.getDate().toString().padStart(2, "0")}.${(
      now.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}.${now.getFullYear()}`;
  }

  const formattedTime = `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  return (
    <button className={styles.button} onClick={handleShowCalendar}>
      <p>{formattedTime}</p>
      <p>{formattedDate}</p>
    </button>
  );
};

export default CalendarButton;
