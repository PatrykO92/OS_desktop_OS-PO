import "./src/styles/tetrisMain.css";

import React, { useState } from "react";

const TetrisApp = () => {
  // To Refactor, just for styling and testing purpouse
  const [tetrisBoard, setTetrisBoard] = useState([
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "t", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "b", "t", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "t", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "t", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
    ["b", "b", "b", "b", "b", "e", "e", "e", "e", "e"],
    ["b", "b", "b", "e", "b", "e", "e", "e", "e", "e"],
    ["b", "b", "b", "e", "b", "b", "b", "b", "b", "e"],
    ["b", "b", "b", "b", "b", "b", "b", "b", "b", "e"],
  ]);

  const tetrisMovingFunction = (downMove = 0, leftMove = 0, rightMove = 0) => {
    let collisionDetected = false;

    tetrisBoard.forEach((rowsItem, rowsIndex) => {
      rowsItem.forEach((colItem, colIndex) => {
        if (colItem === "t") {
          if (
            rowsIndex + downMove === 20 ||
            colIndex + rightMove === 10 ||
            colIndex - leftMove === -1 ||
            tetrisBoard[rowsIndex + downMove][
              colIndex + rightMove - leftMove
            ] === "b"
          ) {
            collisionDetected = true;
          }
        }
      });
    });

    if (collisionDetected) return;

    const copiedTetrisBoard = [...tetrisBoard];

    for (let rowIndex = 0; rowIndex < 20; rowIndex++) {
      for (let colIndex = 0; colIndex < 10; colIndex++) {
        if (copiedTetrisBoard[rowIndex][colIndex] === "t") {
          copiedTetrisBoard[rowIndex][colIndex] = "e";

          if (leftMove === 1) {
            copiedTetrisBoard[rowIndex][colIndex - leftMove] = "t";
          } else {
            copiedTetrisBoard[rowIndex + downMove][
              colIndex + rightMove - leftMove
            ] += "nt";
          }
        } else if (copiedTetrisBoard[rowIndex][colIndex] === "tnt") {
          copiedTetrisBoard[rowIndex][colIndex] = "t";
          copiedTetrisBoard[rowIndex + downMove][
            colIndex + rightMove - leftMove
          ] += "nt";
        } else if (copiedTetrisBoard[rowIndex][colIndex] === "ent") {
          copiedTetrisBoard[rowIndex][colIndex] = "t";
        }
      }
    }

    setTetrisBoard(copiedTetrisBoard);

    // const resultBoard = copiedTetrisBoard
    //   .map((rows, rowIndex) =>
    //     rows.map((colItem, colIndex) => {
    //       if (colItem === "t") {
    //         copiedTetrisBoard[rowIndex + downMove][
    //           colIndex + rightMove - leftMove
    //         ] += "nt";
    //         return "e";
    //       } else if (colItem === "tnt") {
    //         copiedTetrisBoard[rowIndex + downMove][
    //           colIndex + rightMove - leftMove
    //         ] += "nt";
    //         return colItem;
    //       } else if (colItem === "ent") {
    //         return colItem;
    //       } else {
    //         return colItem;
    //       }
    //     })
    //   )
    //   .map((rows) => {
    //     return rows.map((colItem) => {
    //       if (
    //         colItem === "tnt" ||
    //         colItem === "ent" ||
    //         colItem === "t"
    //       ) {
    //         return "t";
    //       } else {
    //         return colItem;
    //       }
    //     });
    //   });

    // setTetrisBoard(resultBoard);

    // const newGol = copiedTetrisBoard.map((rows, rowIndex) =>
    //   rows.map((colItem, colIndex) => {
    //     if (colItem === "t") {
    //       copiedTetrisBoard[rowIndex + downMove][
    //         colIndex + rightMove - leftMove
    //       ] += "nt";
    //       return "e";
    //     } else if (colItem === "tnt") {
    //       copiedTetrisBoard[rowIndex + downMove][colIndex + rightMove] += "nt";
    //       return "t";
    //     } else if (colItem === "ent") {
    //       return "t";
    //     } else {
    //       return colItem;
    //     }
    //   })
    // );
  };

  return (
    <div className="tetris">
      <div className="tetris__game-window">
        <div className="tetris__level-loading">
          <div>
            <p>Lines</p>
            <p>1/30</p>
          </div>
          <div>Loading...</div>
          <button onClick={() => tetrisMovingFunction(1, 0, 0)}>down</button>
          <button onClick={() => tetrisMovingFunction(0, 1, 0)}>left</button>
          <button onClick={() => tetrisMovingFunction(0, 0, 1)}>right</button>
          <button
            onClick={() => {
              console.log(tetrisBoard);
            }}
          >
            Test button2
          </button>
        </div>
        <div className="tetris__game-board-container">
          {tetrisBoard.map((rows, rowsIndex) =>
            rows.map((item, colIndex) => (
              <div
                key={`indexKey${rowsIndex}${colIndex}`}
                className={`tetris__game-board-container__item ${
                  item === "b" ? "tetris-item-block" : ""
                } ${item === "t" ? "tetris-item-tetrimino" : ""}`}
              ></div>
            ))
          )}
        </div>
        {/* To Refactor, just for styling and testing purpouse */}
        <div className="tetris__score-board">
          <div className="tetris__next-block-container">
            <div className="tetris__next-block-container__item"></div>
            <div className="tetris__next-block-container__item"></div>
            <div className="tetris__next-block-container__item"></div>
            <div className="tetris__next-block-container__item"></div>
            <div className="tetris__next-block-container__item"></div>
            <div className="tetris__next-block-container__item"></div>
            <div className="tetris__next-block-container__item"></div>
            <div className="tetris__next-block-container__item"></div>
            <div className="tetris__next-block-container__item"></div>
            <div className="tetris__next-block-container__item"></div>
            <div className="tetris__next-block-container__item"></div>
            <div className="tetris__next-block-container__item"></div>
            <div className="tetris__next-block-container__item"></div>
            <div className="tetris__next-block-container__item"></div>
            <div className="tetris__next-block-container__item"></div>
            <div className="tetris__next-block-container__item"></div>
            <div className="tetris__next-block-container__item"></div>
            <div className="tetris__next-block-container__item"></div>
            <div className="tetris__next-block-container__item"></div>
            <div className="tetris__next-block-container__item"></div>
            <div className="tetris__next-block-container__item"></div>
            <div className="tetris__next-block-container__item"></div>
            <div className="tetris__next-block-container__item"></div>
            <div className="tetris__next-block-container__item"></div>
            <div className="tetris__next-block-container__item"></div>
          </div>
          <div>
            <p>Time:</p>
            <p>01:25</p>
          </div>
          <div>
            <p>Score:</p>
            <p>250 000</p>
          </div>
          <div>
            <p>HighScore:</p>
            <p>1 250 454</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TetrisApp;
