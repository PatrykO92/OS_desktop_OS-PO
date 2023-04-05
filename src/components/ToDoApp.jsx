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

  //list of things "to do"
  const [toDoList, setToDoList] = useState([]);

  // TODO - import toDoList from local storage if available
  useEffect(() => {
    console.log(toDoList);
  }, []);

  // TODO - save toDoList to local storage
  useEffect(() => {
    console.log(toDoList);
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
        toDoStatus: true,
      },
    ]);
    // TODO - add display message, todo is added
    setInputValue("");
  };

  // TODO remove
  const removeFromToDoList = (id) => {};

  // TODO extract
  const renderOneToDo = (item) => {};

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
          {toDoList.map((item) => {
            return (
              <div
                className="todo-app__one-todo"
                key={item.toDoID}
                id={item.toDoID}
              >
                <p>{item.toDoDescription}</p>
                <div>
                  <button>
                    {item.toDoStatus ? (
                      <img src={checkIcon} alt={lang.check} />
                    ) : (
                      <img src={uncheckIcon} alt={lang.uncheck} />
                    )}
                  </button>
                  <button>
                    <img src={trashCanIcon} alt={lang.remove} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ToDoApp;
