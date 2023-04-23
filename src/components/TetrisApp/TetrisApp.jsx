import "./src/styles/tetrisMain.css";
import { randomTetrominoSequence } from "./src/helpers";
import React, { useState, useEffect } from "react";

const TetrisApp = () => {
  const [selectedTetrominoSequence, setSelectedTetrominoSequence] = useState(
    randomTetrominoSequence()
  );
  const [actualTetrominoRotation, setActualTetrominoRotation] = useState(0);
  const [actualTetromino, setActualTetromino] = useState([]);
  const [actualTetrominoRow, setActualTetrominoRow] = useState(0);
  const [actualTetrominoCol, setActualTetrominoCol] = useState(0);

  // To Refactor, just for styling and testing purpouse
  const [tetrisBoard, setTetrisBoard] = useState([
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
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
    ["e", "e", "e", "e", "e", "e", "e", "e", "e", "e"],
  ]);

  useEffect(() => {
    setActualTetromino(selectedTetrominoSequence[actualTetrominoRotation]);
  }, [actualTetrominoRotation, selectedTetrominoSequence]);

  useEffect(() => {
    renderTetromino();
  }, [
    actualTetromino,
    actualTetrominoCol,
    actualTetrominoRow,
    actualTetrominoRotation,
  ]);

  const chooseRandomTetrominoSequence = () => {
    setSelectedTetrominoSequence(randomTetrominoSequence());
    setActualTetrominoRotation(0);
    setActualTetrominoRow(0);
    setActualTetrominoCol(0);
  };

  const chooseTetromin = () => {
    setActualTetromino(selectedTetrominoSequence[actualTetrominoRotation]);
  };

  const rotateTetromino = () => {
    if (actualTetrominoRotation < 3)
      setActualTetrominoRotation((oldVal) => (oldVal += 1));
    if (actualTetrominoRotation === 3) setActualTetrominoRotation(0);
  };

  const placeTetrominoOnBoard = () => {
    setActualTetrominoRotation(0);
    setActualTetrominoRow(0);
    setActualTetrominoCol(0);
  };

  const moveTetrominoDown = () => {
    setActualTetrominoRow((oldVal) => (oldVal += 1));
  };

  const moveTetrominoRight = () => {
    setActualTetrominoCol((oldVal) => (oldVal += 1));
  };

  const moveTetrominoLeft = () => {
    setActualTetrominoCol((oldVal) => (oldVal -= 1));
  };

  const renderTetromino = () => {
    const copiedTetrisBoard = tetrisBoard.map((rows) =>
      rows.map((item) => {
        if (item === "t") return "e";
        else return item;
      })
    );

    actualTetromino.forEach((rows, rowsIndex) => {
      rows.forEach((col, colIndex) => {
        if (col === "t")
          copiedTetrisBoard[rowsIndex + actualTetrominoRow][
            colIndex + actualTetrominoCol
          ] = col;
      });
    });
    setTetrisBoard(copiedTetrisBoard);
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
          <button onClick={chooseRandomTetrominoSequence}>choose seq</button>
          <button onClick={chooseTetromin}>choose tetrom</button>
          <button onClick={moveTetrominoRight}>right</button>
          <button onClick={moveTetrominoLeft}>left</button>
          <button onClick={moveTetrominoDown}>down</button>
          <button onClick={rotateTetromino}>rotate</button>
          <button
            onClick={() => {
              placeTetrominoOnBoard();
            }}
          >
            Test
          </button>
        </div>

        <div className="tetris__game-board-container">
          {tetrisBoard.map((rows, rowsIndex) => {
            if (rowsIndex <= 3) return;

            return rows.map((item, colIndex) => (
              <div
                key={`indexKey${rowsIndex}${colIndex}`}
                className={`tetris__game-board-container__item
                ${item === "b" ? "tetris-item-block" : ""}
                ${item === "t" ? "tetris-item-tetromino" : ""}
                `}
              ></div>
            ));
          })}
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
