import "../assets/styles/toDoApp.css";
import {
  checkIcon,
  uncheckIcon,
  trashCanIcon,
  plusCircleIcon,
} from "../assets/icons";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const ToDoApp = ({ lang }) => {
  // input value
  const [inputValue, setInputValue] = useState("");

  // show/hide item added
  const [showMsg, setShowMsg] = useState(false);

  //list of things "to do"
  const [toDoList, setToDoList] = useState([]);

  // import toDoList from local storage, if available, at start of the component
  useEffect(() => {
    const savedToDoList = localStorage.getItem("toDoList");
    if (savedToDoList) {
      setToDoList(JSON.parse(savedToDoList));
    }
  }, []);

  // save toDoList to local storage, each time new item is added to toDoList
  useEffect(() => {
    localStorage.setItem("toDoList", JSON.stringify(toDoList));
  }, [toDoList]);

  // add things to toDoList, using uuid library to generate a random ID for each toDo task
  // toDoStatus describes if things are already finished or still to do
  // set input value to "", when the thing is added to list
  const addToDoList = (text) => {
    setToDoList([
      ...toDoList,
      {
        toDoID: uuidv4(),
        toDoDescription: text,
        toDoStatus: false,
      },
    ]);
    setShowMsg(true);
    setInputValue("");

    setTimeout(() => {
      setShowMsg(false);
    }, [2500]);
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
      <div className="todo-app__one-todo" key={item.toDoID} id={item.toDoID}>
        <p
          style={{
            textDecoration: `${item.toDoStatus ? "line-through" : ""}`,
            color: `${item.toDoStatus ? "var(--todo-red)" : ""}`,
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
    <div className="todo-app">
      <div className="todo-app__navigation">
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
      <div className="todo-app__list-container">
        <div className="todo-app__list">
          {toDoList.map((item) => renderOneToDo(item))}
        </div>
      </div>
      {showMsg && <div className="todo-app__item-added">Item added</div>}
    </div>
  );
};

export default ToDoApp;
