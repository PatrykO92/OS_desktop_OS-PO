import { useContext, useState, useEffect } from "react";

import ColorRadioButton from "./components/ColorRadioButton";
import IconRadioButton from "./components/IconRadioButton";

import styles from "../../assets/styles/calendarApp.module.css";

import { WholeAppContext } from "../../App";

import { weekdays, listOfColors, listOfIcons } from "./utils/constants";

import { commentsIcon } from "../../assets/icons/calendarAppFormIcons";
import axiosInstance from "../../utils/axiosInstance.js";

const CalendarApp = () => {
  // get today date to show current day
  const today = new Date();

  // get language
  const { lang } = useContext(WholeAppContext);

  // get all task from backend, to implement later
  const [allTasks, setAllTasks] = useState([]);

  const [currentTask, setCurrentTask] = useState(null);

  const [date, setDate] = useState(new Date());
  const [showAddTask, setShowAddTask] = useState(false);

  const [startInputValue, setStartInputValue] = useState("");
  const [endInputValue, setEndInputValue] = useState("");
  const [formIcon, setFormIcon] = useState(commentsIcon);
  const [formColor, setFormColor] = useState(listOfColors[0]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/calendar-api/");
        const transformedTasks = response.data.map((task) => ({
          id: task.id,
          startTaskDate: new Date(task.start_task_date).setHours(0),
          endTaskDate: new Date(task.end_task_date).setHours(0),
          color: task.color,
          icon: task.icon,
          title: task.title,
          description: task.description,
        }));
        setAllTasks(transformedTasks);
      } catch (error) {
        // Handle error
        console.error("Error fetching tasks:", error);
      }
    };
    getTasks();
  }, []);

  const addNewTask = async () => {
    try {
      console.log(
        title,
        description,
        formColor,
        formIcon,
        startInputValue,
        endInputValue
      );
      const response = await axiosInstance.post("/api/v1/calendar-api/", {
        title,
        description,
        color: formColor,
        icon: formIcon,
        start_task_date: startInputValue,
        end_task_date: endInputValue,
      });

      const newTask = {
        id: response.data.id,
        startTaskDate: new Date(startInputValue).setHours(0),
        endTaskDate: new Date(endInputValue).setHours(0),
        color: formColor,
        icon: formIcon,
        title,
        description,
      };

      setAllTasks((oldVal) => [...oldVal, newTask]);
      // After adding the task, move Calendar to the start day of the task
      setDate(new Date(startInputValue).setHours(0));
    } catch (error) {
      // Handle error
      console.error("Error adding new task:", error);
    }
  };

  const removeTask = async (id) => {
    try {
      // Make a DELETE request to remove the task by its id
      await axiosInstance.delete(`/api/v1/calendar-api/${id}`);

      // Update the local state to remove the deleted task
      const updatedTasks = allTasks.filter((task) => task.id !== id);
      setAllTasks(updatedTasks);
    } catch (error) {
      // Handle error
      console.error("Error removing task:", error);
    }
  };

  const modifyDate = (type, amount) => {
    if (type === "month" && amount === 0) {
      setDate(today);
    } else {
      setDate((prevDate) => {
        const newDate = new Date(prevDate);
        if (type === "year") {
          newDate.setFullYear(newDate.getFullYear() + amount);
        } else if (type === "month") {
          newDate.setMonth(newDate.getMonth() + amount);
        }
        return newDate;
      });
    }
  };

  // Function to generate calendar data
  const generateCalendarData = () => {
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let firstDayOfWeek = new Date(year, month, 1).getDay();

    // Sunday is counted as 0, so we need to change it to 7, so empty days are rendered properly
    if (firstDayOfWeek === 0) firstDayOfWeek = 7;

    const calendarDays = [];

    // Add empty cells for previous month's days
    for (let i = 0; i < firstDayOfWeek - 1; i++) {
      calendarDays.push({
        type: "empty",
        key: `empty-${i}`,
      });
    }

    // Add cells for current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const targetDate = new Date(year, month, day);

      // Create a list of tasks for the current iterated day.
      const list = allTasks.filter(
        (task) =>
          task.startTaskDate <= targetDate && task.endTaskDate >= targetDate
      );

      calendarDays.push({
        type: "day",
        key: `day-${day}`,
        day,
        isActive: day === new Date(date).getDate(),
        list,
      });
    }
    return calendarDays;
  };

  // Function to render the calendar
  const renderCalendar = () => {
    const calendarDays = generateCalendarData();

    return calendarDays.map((dayData) => {
      if (dayData.type === "empty") {
        return (
          <div
            key={dayData.key}
            className={`${styles.day} ${styles.empty}`}
          ></div>
        );
      } else {
        const year = new Date(date).getFullYear();
        const month = new Date(date).getMonth();

        return (
          <div
            key={dayData.key}
            className={`${styles.day} ${
              dayData.isActive ? styles.activeDay : ""
            }`}
            onClick={(e) => {
              // guard, to prevent event propagation
              if (e.target.closest("div")?.className === styles.listItem)
                return;

              setCurrentTask(null);
              setShowAddTask(true);

              const selectedDate = new Date(year, month, dayData.day);
              const selectedInputDate = new Date(year, month, dayData.day + 1)
                .toISOString()
                .substring(0, 10);

              setDate(selectedDate);
              setStartInputValue(selectedInputDate);
              setEndInputValue(selectedInputDate);
            }}
          >
            <p>{dayData.day}</p>
            <div className={styles.taskList}>
              {/* Render Task List */}
              {dayData.list?.map((item, index) => (
                <div
                  className={styles.listItem}
                  onClick={() => {
                    setShowAddTask(false);
                    setCurrentTask(item);
                  }}
                  key={`${index}${item.id}`}
                  style={{ borderColor: item.color }}
                >
                  <img src={item.icon} alt="icon" />
                  <p>{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        );
      }
    });
  };

  return (
    <div className={styles.app}>
      <header>
        <p>Today: {today.toLocaleDateString(lang.lng)}</p>
      </header>

      <aside>
        <ul>
          <li>
            <button
              onClick={() => {
                setCurrentTask(null);
                setShowAddTask((oldVal) => !oldVal);
                setStartInputValue();
                setEndInputValue();
              }}
            >
              {showAddTask ? "Hide" : "Add new task"}
            </button>
            <button
              onClick={() => {
                console.log(allTasks);
              }}
            >
              Test
            </button>
          </li>
        </ul>

        {showAddTask && (
          <form
            style={{ borderColor: formColor }}
            className={styles.task}
            onSubmit={(e) => {
              e.preventDefault();

              if (
                (new Date(startInputValue) <= new Date(endInputValue)) &
                (new Date(endInputValue) >= new Date(startInputValue))
              ) {
                addNewTask();
                setTitle("");
                setDescription("");
                setStartInputValue();
                setEndInputValue();
                setShowAddTask(false);
              }
            }}
          >
            <label htmlFor="startDate">Start:</label>
            <input
              required
              id="startDate"
              type="date"
              value={startInputValue}
              onChange={(e) => {
                setStartInputValue(e.target.value);
                // set end date also, for better user experience
                setEndInputValue(e.target.value);
              }}
            />
            <label htmlFor="endDate">End:</label>
            <input
              required
              id="endDate"
              type="date"
              value={endInputValue}
              onChange={(e) => setEndInputValue(e.target.value)}
            />

            <div className={styles.taskIcons}>
              {listOfIcons.map((iconUrl, index) => (
                <IconRadioButton
                  defaultChecked={index === 0}
                  onChange={setFormIcon}
                  activeIcon={formIcon}
                  iconUrl={iconUrl}
                  key={iconUrl}
                />
              ))}
            </div>

            <div className={styles.taskColors}>
              {listOfColors.map((color, index) => (
                <ColorRadioButton
                  defaultChecked={index === 0}
                  color={color}
                  onChange={setFormColor}
                  activeColor={formColor}
                  key={`${index}-${color}`}
                />
              ))}
            </div>

            <label htmlFor="title">Title:</label>
            <input
              maxLength={18}
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

        {currentTask ? (
          <div
            className={styles.current}
            style={{ borderColor: currentTask?.color }}
          >
            <p className={styles.currentDate}>
              <span>
                {new Date(currentTask.startTaskDate).toLocaleDateString(
                  lang.lng
                )}
              </span>

              {new Date(currentTask.startTaskDate).toLocaleDateString() !==
              new Date(currentTask.endTaskDate).toLocaleDateString() ? (
                <span>
                  {" - "}
                  {new Date(currentTask.endTaskDate).toLocaleDateString(
                    lang.lng
                  )}
                </span>
              ) : (
                ""
              )}
            </p>
            <p className={styles.currentTitle}>
              <img src={currentTask.icon} alt="icon" />
              {currentTask?.title}
            </p>
            <p className={styles.currentDescription}>
              {currentTask?.description}
            </p>
            <button
              onClick={() => {
                removeTask(currentTask.id);
                setCurrentTask(null);
              }}
            >
              Remove task
            </button>
          </div>
        ) : (
          <></>
        )}
      </aside>

      <main>
        <div className={styles.mainHeader}>
          <p>
            {new Date(date).toLocaleDateString(lang.lng, {
              year: "numeric",
              month: "long",
            })}
          </p>
          <button onClick={() => modifyDate("year", -1)}>Previous Year</button>
          <button onClick={() => modifyDate("month", -1)}>
            Previous Month
          </button>
          <button onClick={() => modifyDate("month", 0)}>Actual Month</button>
          <button onClick={() => modifyDate("month", 1)}>Next Month</button>
          <button onClick={() => modifyDate("year", 1)}>Next Year</button>
        </div>
        <div className={styles.mainBody}>
          {weekdays.map((day, index) => (
            <div key={`weekdays${day}+${index}`} className={styles.dayName}>
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
