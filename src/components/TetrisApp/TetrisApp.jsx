import "./src/styles/tetrisMain.css";
import { randomTetrominoSequence } from "./src/helpers";
import React, { useState, useEffect } from "react";

const TetrisApp = () => {
  const [pauseGame, setPauseGame] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  const [selectedTetrominoSequence, setSelectedTetrominoSequence] = useState(
    randomTetrominoSequence()
  );

  const [actualTetromino, setActualTetromino] = useState([]);
  const [actualTetrominoRotation, setActualTetrominoRotation] = useState(0);
  const [actualTetrominoRow, setActualTetrominoRow] = useState(0);
  const [actualTetrominoCol, setActualTetrominoCol] = useState(0);

  const [tetrisBoard, setTetrisBoard] = useState(
    Array.from({ length: 24 }, () => Array.from({ length: 10 }, () => "e"))
  );

  const rotateTetromino = () => {
    let blocked = false;
    let rotation = actualTetrominoRotation;
    let tetrominoToCheck;

    if (actualTetrominoRotation < 3) rotation += 1;
    if (actualTetrominoRotation === 3) rotation = 0;

    tetrominoToCheck = selectedTetrominoSequence[rotation];

    /// TODO refactor
    tetrominoToCheck.forEach((rows, rowsIndex) => {
      rows.forEach((col, colIndex) => {
        if (col === "t") {
          if (
            rowsIndex + actualTetrominoRow >= 23 ||
            colIndex + actualTetrominoCol > 9 ||
            colIndex + actualTetrominoCol < 0 ||
            tetrisBoard[rowsIndex + actualTetrominoRow][
              colIndex + actualTetrominoCol
            ] === "b"
          ) {
            blocked = true;
          }
        }
      });
    });

    if (blocked) return;

    if (actualTetrominoRotation < 3)
      setActualTetrominoRotation((oldVal) => (oldVal += 1));
    if (actualTetrominoRotation === 3) setActualTetrominoRotation(0);
  };

  const placeTetrominoOnBoard = () => {
    setSelectedTetrominoSequence(randomTetrominoSequence());
    setActualTetrominoRotation(0);
    setActualTetrominoRow(0);
    setActualTetrominoCol(0);
    setActualTetromino(selectedTetrominoSequence[actualTetrominoRotation]);
  };

  const transformTetrominoToBlock = () => {
    const transformedTetrisBoard = tetrisBoard.map((rows) =>
      rows.map((colItem) => {
        if (colItem === "t") {
          return "b";
        } else {
          return colItem;
        }
      })
    );
    setTetrisBoard(transformedTetrisBoard);
  };

  const removeBlockLineFromBoard = () => {
    let linesRemovedCounter = 0;
    const copiedTetrisBoard = [...tetrisBoard];

    tetrisBoard.forEach((row, rowsIndex) => {
      if (row.every((item) => item === "b")) {
        linesRemovedCounter += 1;
        copiedTetrisBoard.splice(rowsIndex, 1);
      }
    });

    for (let i = 0; i < linesRemovedCounter; i++)
      copiedTetrisBoard.unshift(Array.from({ length: 10 }, () => "e"));

    setTetrisBoard(copiedTetrisBoard);
  };

  const moveTetrominoDown = () => {
    let blocked = false;

    actualTetromino.forEach((rows, rowsIndex) => {
      rows.forEach((col, colIndex) => {
        if (col === "t") {
          if (
            rowsIndex + actualTetrominoRow === 23 ||
            tetrisBoard[rowsIndex + actualTetrominoRow + 1][
              colIndex + actualTetrominoCol
            ] === "b"
          ) {
            blocked = true;
            transformTetrominoToBlock();
          }
        }
      });
    });

    if (blocked) return;

    setActualTetrominoRow((oldVal) => (oldVal += 1));
  };

  const moveTetrominoRight = () => {
    let blocked = false;

    actualTetromino.forEach((rows, rowsIndex) => {
      rows.forEach((col, colIndex) => {
        if (col === "t")
          if (
            tetrisBoard[rowsIndex + actualTetrominoRow][
              colIndex + actualTetrominoCol + 1
            ] === "b" ||
            colIndex + actualTetrominoCol + 1 === 10
          ) {
            blocked = true;
          }
      });
    });

    if (blocked) return;

    setActualTetrominoCol((oldVal) => (oldVal += 1));
  };

  const moveTetrominoLeft = () => {
    let blocked = false;

    actualTetromino.forEach((rows, rowsIndex) => {
      rows.forEach((col, colIndex) => {
        if (col === "t")
          if (
            tetrisBoard[rowsIndex + actualTetrominoRow][
              colIndex + actualTetrominoCol - 1
            ] === "b" ||
            colIndex + actualTetrominoCol - 1 === -1
          )
            blocked = true;
      });
    });

    if (blocked) return;

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

  const gameOverCheck = () => {
    setGameOver(
      tetrisBoard.some((row, rowIndex) => {
        row.some((colItem) => {
          if (rowIndex <= 4 && colItem === "b") {
            return true;
          }
          return false;
        });
      })
    );
  };

  useEffect(() => {
    renderTetromino();
  }, [
    actualTetromino,
    actualTetrominoCol,
    actualTetrominoRow,
    actualTetrominoRotation,
  ]);

  return (
    <div className="tetris">
      <div className="tetris__game-window">
        <div className="tetris__level-loading">
          <div>
            <p>Lines</p>
            <p>1/30</p>
          </div>
          <div>Loading...</div>
          <button onClick={placeTetrominoOnBoard}>Place Tetromino</button>
          <button onClick={moveTetrominoRight}>right</button>
          <button onClick={moveTetrominoLeft}>left</button>
          <button onClick={moveTetrominoDown}>down</button>
          <button onClick={rotateTetromino}>rotate</button>
          <button onClick={transformTetrominoToBlock}>freeze</button>
          <button onClick={removeBlockLineFromBoard}>removeLine</button>
          <button onClick={gameOverCheck}>gameOverCheck</button>
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

        <div className="tetris__score-board">
          <div>
            <p>Time:</p>
            <p>01:25</p>
          </div>
          <div>
            <p>Score:</p>
            <p>250 000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TetrisApp;
