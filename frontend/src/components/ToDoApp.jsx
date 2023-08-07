import styles from "../assets/styles/toDoApp.module.css";
import axiosIntance from "../utils/axiosInstance";

import {
  checkIcon,
  uncheckIcon,
  trashCanIcon,
  plusCircleIcon,
} from "../assets/icons";

import { WholeAppContext } from "../App";
import { useState, useEffect, useContext } from "react";

const ToDoApp = () => {
  const { user, lang } = useContext(WholeAppContext);

  // input value
  const [inputValue, setInputValue] = useState("");

  // show/hide item added
  const [showMsg, setShowMsg] = useState(false);
  const [toDoList, setToDoList] = useState([]);

  useEffect(() => {
    const fetchToDoList = async () => {
      try {
        const response = await axiosIntance.get("/api/v1/todos/");
        console.log(response.data);
        setToDoList(response.data);
      } catch (error) {
        console.error("Error fetching to-do list:", error);
      }
    };
    fetchToDoList();
  }, []);

  const addToDoList = async (text) => {
    try {
      const response = await axiosIntance.post("/api/v1/todos/", {
        task: text,
        done: false,
        user: user.pk,
      });
      setToDoList([response.data, ...toDoList]);
      setShowMsg(true);
      setInputValue("");

      setTimeout(() => {
        setShowMsg(false);
      }, 700);
    } catch (error) {
      console.log(error);
      console.error("Error adding to-do item:", error);
    }
  };

  // REMOVE item from toDoList
  const deleteToDoItem = async (id) => {
    try {
      await axiosIntance.delete(`/api/v1/todos/${id}/`);
      const updatedToDoList = toDoList.filter((item) => item.id !== id);
      setToDoList(updatedToDoList);
    } catch (error) {
      console.error(`Error deleting to-do item with ID ${id}:`, error);
    }
  };

  const toggleToDoStatus = async (id, currentStatus) => {
    try {
      const updatedStatus = !currentStatus;
      await axiosIntance.patch(`/api/v1/todos/${id}/`, {
        done: updatedStatus,
      });
      const updatedToDoList = toDoList.map((item) =>
        item.id === id ? { ...item, done: updatedStatus } : item
      );
      setToDoList(updatedToDoList);
    } catch (error) {
      console.error(
        `Error toggling status for to-do item with ID ${id}:`,
        error
      );
    }
  };

  // function to render one item from toDoList
  const renderOneToDo = (item) => {
    return (
      <div className={styles.oneItem} key={item.id} id={item.toDoID}>
        <p
          style={{
            textDecoration: `${item.done ? "line-through" : ""}`,
            color: `${item.done ? "var(--red)" : ""}`,
          }}
        >
          {item.task}
        </p>
        <div>
          <button onClick={() => toggleToDoStatus(item.id, item.done)}>
            {item.done ? (
              <img src={checkIcon} alt={lang.check} />
            ) : (
              <img src={uncheckIcon} alt={lang.uncheck} />
            )}
          </button>
          <button onClick={() => deleteToDoItem(item.id)}>
            <img src={trashCanIcon} alt={lang.remove} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.todoApp}>
      <div className={styles.navigation}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addToDoList(inputValue);
          }}
        >
          <input
            type="text"
            placeholder={lang.toDoAppInputPlaceholder}
            maxLength={30}
            required
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <button type="submit">
            <img src={plusCircleIcon} alt={lang.add} />
          </button>
        </form>
      </div>
      {toDoList.length >= 1 ? (
        <div className={styles.listContainer}>
          <div className={styles.list}>
            {toDoList.map((item) => renderOneToDo(item))}
          </div>
        </div>
      ) : (
        <div></div>
      )}

      {showMsg && <div className={styles.itemAdded}>{lang.added}</div>}
    </div>
  );
};

export default ToDoApp;
