import "./src/styles/tetrisMain.css";
import { randomTetrominoSequence } from "./src/helpers";
import React, { useState, useEffect } from "react";

const TetrisApp = () => {
  const [pauseGame, setPauseGame] = useState(true);
  const [resumeGame, setResumeGame] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [showHighscore, setShowHighscore] = useState(false);
  const [highscores, setHighscores] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [score, setScore] = useState(232332);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);
  const [tetrisBoard, setTetrisBoard] = useState(
    Array.from({ length: 22 }, () => Array.from({ length: 10 }, () => "e"))
  );
  // prettier-ignore
  const [selectedTetrominoSequence, setSelectedTetrominoSequence] = useState([]);
  const [actualTetromino, setActualTetromino] = useState([]);
  const [actualTetrominoRotation, setActualTetrominoRotation] = useState(0);
  const [actualTetrominoRow, setActualTetrominoRow] = useState(0);
  const [actualTetrominoCol, setActualTetrominoCol] = useState(3);
  const [hasMovedDown, setHasMovedDown] = useState(false);

  const rotateTetromino = () => {
    let blocked = false;
    let rotation = actualTetrominoRotation;
    let tetrominoToCheck;
    if (actualTetrominoRotation < 3) rotation += 1;
    if (actualTetrominoRotation === 3) rotation = 0;
    tetrominoToCheck = selectedTetrominoSequence[rotation];

    tetrominoToCheck?.some((rows, rowsIndex) => {
      rows.some((col, colIndex) => {
        if (col === "t") {
          if (
            rowsIndex + actualTetrominoRow >= 21 ||
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
    setActualTetrominoCol(3);
  };

  const transformTetrominoToBlock = () => {
    const transformedTetrisBoard = tetrisBoard?.map((rows) =>
      rows.map((colItem) => {
        if (colItem === "t") {
          return "b";
        } else {
          return colItem;
        }
      })
    );
    placeTetrominoOnBoard();
    setTetrisBoard(transformedTetrisBoard);
  };

  const removeBlockLineFromBoard = () => {
    let linesRemovedCounter = 0;
    const copiedTetrisBoard = [...tetrisBoard];

    tetrisBoard?.forEach((row, rowsIndex) => {
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
    setActualTetrominoRow((oldVal) => (oldVal += 1));
    setHasMovedDown(true);
  };

  const moveTetrominoRight = () => {
    setActualTetrominoCol((oldVal) => (oldVal += 1));
  };

  const moveTetrominoLeft = () => {
    setActualTetrominoCol((oldVal) => (oldVal -= 1));
  };

  const renderTetromino = () => {
    const tetrominoColumnMove = actualTetrominoCol;
    let blocked = false;

    if (hasMovedDown) {
      actualTetromino?.some((rows, rowsIndex) => {
        rows.some((col, colIndex) => {
          if (col === "t") {
            if (
              rowsIndex + actualTetrominoRow === 22 ||
              tetrisBoard[rowsIndex + actualTetrominoRow][
                colIndex + actualTetrominoCol
              ] === "b"
            ) {
              blocked = true;
              transformTetrominoToBlock();
              placeTetrominoOnBoard();
            }
          }
        });
      });
      setHasMovedDown(false);
    }

    if (blocked) return;

    actualTetromino?.some((rows, rowsIndex) => {
      rows.some((col, colIndex) => {
        if (col === "t")
          if (
            tetrisBoard[rowsIndex + actualTetrominoRow][
              colIndex + actualTetrominoCol
            ] === "b" ||
            colIndex + actualTetrominoCol === -1
          ) {
            blocked = true;
            setActualTetrominoCol(tetrominoColumnMove + 1);
          }
      });
    });

    if (blocked) return;

    actualTetromino?.some((rows, rowsIndex) => {
      rows.forEach((col, colIndex) => {
        if (col === "t")
          if (
            tetrisBoard[rowsIndex + actualTetrominoRow][
              colIndex + actualTetrominoCol
            ] === "b" ||
            colIndex + actualTetrominoCol === 10
          ) {
            blocked = true;
            setActualTetrominoCol(tetrominoColumnMove - 1);
          }
      });
    });

    if (blocked) return;

    const copiedTetrisBoard = tetrisBoard.map((rows) =>
      rows.map((item) => {
        if (item === "t") return "e";
        else return item;
      })
    );

    actualTetromino?.forEach((rows, rowsIndex) => {
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
    tetrisBoard?.some((row, rowIndex) => {
      row.some((colItem) => {
        if (rowIndex <= 4 && colItem === "b") {
          setGameOver(true);
          return true;
        }
        return false;
      });
    });
  };

  const startGameHandler = () => {
    setPauseGame(false);
    placeTetrominoOnBoard();
    setScore(0);
  };

  const pauseGameHandler = () => {
    setPauseGame(true);
    setResumeGame(true);
  };

  const resumeGameHandler = () => {
    setPauseGame(false);
  };

  const handleKeyPress = (event) => {
    const handler = event.key.toUpperCase();
    switch (handler) {
      case "P":
        pauseGameHandler();
        break;

      case "W":
        rotateTetromino();
        break;

      case "A":
        moveTetrominoLeft();
        break;

      case "D":
        moveTetrominoRight();
        break;

      case "S":
        moveTetrominoDown();
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    function keyPress(event) {
      if (!pauseGame) handleKeyPress(event);
    }
    document.addEventListener("keydown", keyPress);
    return () => {
      document.removeEventListener("keydown", keyPress);
    };
  }, [
    pauseGame,
    actualTetromino,
    actualTetrominoCol,
    actualTetrominoRow,
    actualTetrominoRotation,
    selectedTetrominoSequence,
  ]);

  useEffect(() => {
    setActualTetromino(selectedTetrominoSequence[actualTetrominoRotation]);
    renderTetromino();
  }, [
    actualTetromino,
    actualTetrominoCol,
    actualTetrominoRow,
    actualTetrominoRotation,
    selectedTetrominoSequence,
  ]);

  useEffect(() => {
    let interval;
    if (!pauseGame) {
      interval = window.setInterval(() => {
        moveTetrominoDown();
      }, 1000 * (1 / level));
    }

    return () => {
      window.clearInterval(interval);
    };
  }, [pauseGame]);

  return (
    <div className="tetris">
      <div className="tetris__game-window">
        <div className="tetris__game-board">
          {pauseGame ? (
            <div className="tetris__game-board__menu">
              {showMenu ? (
                <div className="tetris__game-board__menu__buttons">
                  {resumeGame ? (
                    <button onClick={resumeGameHandler}>Resume</button>
                  ) : (
                    ""
                  )}

                  <button onClick={startGameHandler}>New game</button>
                  <button
                    onClick={() => {
                      setShowHighscore(true);
                      setShowMenu(false);
                    }}
                  >
                    Highscores
                  </button>
                  <button
                    onClick={() => {
                      setShowHelp(true);
                      setShowMenu(false);
                    }}
                  >
                    Help
                  </button>

                  <button onClick={() => {}}>Quit</button>
                </div>
              ) : (
                ""
              )}

              {showHighscore ? (
                <div className="tetris__game-board__menu__highscores">
                  <div>Highscores</div>

                  {highscores
                    .sort((a, b) => {
                      return b - a;
                    })
                    .slice(0, 8)
                    .map((item, index) => (
                      <div key={index * Math.random()}>
                        <p>{index + 1}.</p>
                        <p>{item}</p>
                      </div>
                    ))}
                  <button
                    onClick={() => {
                      setShowMenu(true);
                      setShowHighscore(false);
                    }}
                  >
                    Back
                  </button>
                </div>
              ) : (
                ""
              )}

              {showHelp ? (
                <div className="tetris__game-board__menu__help">
                  <p>Control keys</p>
                  <p>Move left: "a"</p>
                  <p>Move right: "d"</p>
                  <p>Soft drop: "s"</p>
                  <p>Rotate: "w"</p>
                  <p>Pause: "P"</p>
                  <button
                    onClick={() => {
                      setShowMenu(true);
                      setShowHelp(false);
                    }}
                  >
                    Back
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div className="tetris__game-board-container">
              {tetrisBoard.map((rows, rowsIndex) => {
                if (rowsIndex <= 1) return;
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
          )}
        </div>

        <div className="tetris__score-board">
          <div>
            <p>Lines</p>
            <p>1/30</p>
          </div>
          <div>Loading...</div>
          <button onClick={rotateTetromino}>rotate</button>
          <button onClick={transformTetrominoToBlock}>freeze</button>
          <button onClick={removeBlockLineFromBoard}>removeLine</button>
          <button onClick={gameOverCheck}>gameOverCheck</button>
          <div>
            <p>Time:</p>
            <p>01:25</p>
          </div>
          <div>
            <p>Score:</p>
            <p>{score}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TetrisApp;
