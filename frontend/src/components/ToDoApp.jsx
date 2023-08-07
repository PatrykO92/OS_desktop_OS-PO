import styles from "../assets/styles/toDoApp.module.css";
import {
  checkIcon,
  uncheckIcon,
  trashCanIcon,
  plusCircleIcon,
} from "../assets/icons";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const ToDoApp = ({ lang, user }) => {
  // input value
  const [inputValue, setInputValue] = useState("");

  // show/hide item added
  const [showMsg, setShowMsg] = useState(false);

  //list of things "to do"
  const [toDoList, setToDoList] = useState([]);

  // import toDoList from local storage, if available, at start of the component
  useEffect(() => {
    const savedToDoList = localStorage.getItem(`toDoList${user.userTag}`);
    if (savedToDoList) {
      setToDoList(JSON.parse(savedToDoList));
    }
  }, [user]);

  // save toDoList to local storage, each time new item is added to toDoList
  useEffect(() => {
    localStorage.setItem(`toDoList${user.userTag}`, JSON.stringify(toDoList));
  }, [user, toDoList]);

  // add things to toDoList, using uuid library to generate a random ID for each toDo task
  // toDoStatus describes if things are already finished or still to do
  // set input value to "", when the thing is added to list
  const addToDoList = (text) => {
    setToDoList([
      {
        toDoID: uuidv4(),
        toDoDescription: text,
        toDoStatus: false,
      },
      ...toDoList,
    ]);
    setShowMsg(true);
    setInputValue("");

    setTimeout(() => {
      setShowMsg(false);
    }, [700]);
  };

  // REMOVE item from toDoList
  const removeFromToDoList = (id) => {
    const updatedToDoList = toDoList.filter((item) => item.toDoID !== id);
    setToDoList(updatedToDoList);
  };

  const changeItemToDoStatus = (id) => {
    const updatedToDoList = toDoList.map((item) => {
      if (item.toDoID === id) {
        return {
          ...item,
          toDoStatus: !item.toDoStatus,
        };
      }
      return item;
    });
    setToDoList(updatedToDoList);
  };

  // function to render one item from toDoList
  const renderOneToDo = (item) => {
    return (
      <div className={styles.oneItem} key={item.toDoID} id={item.toDoID}>
        <p
          style={{
            textDecoration: `${item.toDoStatus ? "line-through" : ""}`,
            color: `${item.toDoStatus ? "var(--red)" : ""}`,
          }}
        >
          {item.toDoDescription}
        </p>
        <div>
          <button onClick={() => changeItemToDoStatus(item.toDoID)}>
            {item.toDoStatus ? (
              <img src={checkIcon} alt={lang.check} />
            ) : (
              <img src={uncheckIcon} alt={lang.uncheck} />
            )}
          </button>
          <button onClick={() => removeFromToDoList(item.toDoID)}>
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
