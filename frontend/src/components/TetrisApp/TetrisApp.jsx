// TODO: HUGE CODE REFACTOR

import "./src/styles/tetrisMain.css";
import { pauseIcon } from "./src/icons";
import { randomTetrominoSequence } from "./src/helpers";

import { addTetrisScore, getTetrisHighscores } from "../../utils";
import { useState, useEffect } from "react";

const TetrisApp = ({ lang, user }) => {
  const [pauseGame, setPauseGame] = useState(true);
  const [resumeGame, setResumeGame] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [showHelp, setShowHelp] = useState(false);
  const [showHighscore, setShowHighscore] = useState(false);
  const [highscores, setHighscores] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
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
    setActualTetrominoCol(3);
    setActualTetromino(selectedTetrominoSequence[actualTetrominoRotation]);
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

    const removedBoard = removeBlockLineFromBoard(transformedTetrisBoard);
    setTetrisBoard(removedBoard);
  };

  const removeBlockLineFromBoard = (board) => {
    const copiedTetrisBoard = [...board];
    board.forEach((row, rowsIndex) => {
      if (row.every((item) => item === "b")) {
        setScore((oldVal) => oldVal + level * 100);
        copiedTetrisBoard.splice(rowsIndex, 1);
        copiedTetrisBoard.unshift(Array.from({ length: 10 }, () => "e"));
        setLines((oldVal) => oldVal + 1);
      }
    });

    return copiedTetrisBoard;
  };

  const moveTetrominoDown = () => {
    setActualTetrominoRow((oldVal) => (oldVal += 1));
    setHasMovedDown(true);
  };

  const moveTetrominoRight = () => {
    let blocked = false;

    actualTetromino?.forEach((rows, rowsIndex) => {
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

    actualTetromino?.forEach((rows, rowsIndex) => {
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
    let blocked = false;

    if (hasMovedDown) {
      actualTetromino?.some((rows, rowsIndex) => {
        rows.some((col, colIndex) => {
          if (col !== "t") return false;
          if (
            rowsIndex + actualTetrominoRow === 22 ||
            tetrisBoard[rowsIndex + actualTetrominoRow][
              colIndex + actualTetrominoCol
            ] === "b"
          ) {
            blocked = true;
            transformTetrominoToBlock();
            placeTetrominoOnBoard();
            return true;
          }
          return false;
        });
        if (blocked) return true;
        return false;
      });
      setHasMovedDown(false);
    }

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

  const gameOverCheckHandler = () => {
    tetrisBoard?.some((row, rowIndex) => {
      row.some((colItem) => {
        if (rowIndex <= 1 && colItem === "b") {
          setGameOver(true);
          setPauseGame(true);
          setResumeGame(false);
          return true;
        }
        return false;
      });
      return false;
    });
  };

  const startGameHandler = () => {
    setLevel(1);
    setLines(0);
    setTetrisBoard(
      Array.from({ length: 22 }, () => Array.from({ length: 10 }, () => "e"))
    );
    setPauseGame(false);
    placeTetrominoOnBoard();
    setScore(0);
    setGameOver(false);
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

      case "ARROWUP":
        rotateTetromino();
        break;

      case "A":
        moveTetrominoLeft();
        break;

      case "ARROWLEFT":
        moveTetrominoLeft();
        break;

      case "D":
        moveTetrominoRight();
        break;

      case "ARROWRIGHT":
        moveTetrominoRight();
        break;

      case "S":
        moveTetrominoDown();
        break;

      case "ARROWDOWN":
        moveTetrominoDown();
        break;

      default:
        break;
    }
  };

  // get tetris Highscores from server
  useEffect(() => {
    getTetrisHighscores().then((data) => {
      const transformedData = data.map((game) => [game.game_tag, game.score]);
      setHighscores(transformedData);
    });
  }, [showHighscore]);

  useEffect(() => {
    if (gameOver) addTetrisScore(user.userTag, score);
  }, [gameOver, score, user]);

  useEffect(() => {
    function keyPress(event) {
      if (!pauseGame) handleKeyPress(event);
    }
    document.addEventListener("keydown", keyPress);
    return () => {
      document.removeEventListener("keydown", keyPress);
    };
    // eslint-disable-next-line
  }, [
    pauseGame,
    actualTetromino,
    actualTetrominoCol,
    actualTetrominoRow,
    actualTetrominoRotation,
    selectedTetrominoSequence,
    lines,
  ]);

  useEffect(
    () => {
      setActualTetromino(selectedTetrominoSequence[actualTetrominoRotation]);
      renderTetromino();
      gameOverCheckHandler();
    },
    // eslint-disable-next-line
    [
      actualTetromino,
      actualTetrominoCol,
      actualTetrominoRow,
      actualTetrominoRotation,
      selectedTetrominoSequence,
      lines,
    ]
  );
  useEffect(
    () => {
      let interval;
      if (!pauseGame) {
        interval = window.setInterval(() => {
          moveTetrominoDown();
        }, 1000 * (1 / level));
      }

      return () => {
        window.clearInterval(interval);
      };
    },
    // eslint-disable-next-line
    [
      pauseGame,
      actualTetromino,
      actualTetrominoCol,
      actualTetrominoRow,
      actualTetrominoRotation,
      selectedTetrominoSequence,
      lines,
    ]
  );

  useEffect(() => {
    if (lines > 10) setLevel(2);
    if (lines > 20) setLevel(3);
    if (lines > 30) setLevel(4);
    if (lines > 40) setLevel(5);
    if (lines > 50) setLevel(6);
  }, [lines, level]);

  return (
    <div className="tetris">
      <div className="tetris__game-window">
        <div className="tetris__game-board">
          {pauseGame ? (
            <div className="tetris__game-board__menu">
              <div className="tetris__game-board__menu__title">
                <span>T</span>
                <span>e</span>
                <span>t</span>
                <span>r</span>
                <span>i</span>
                <span>s</span>
              </div>

              {showMenu ? (
                <div className="tetris__game-board__menu__buttons">
                  {resumeGame ? (
                    <button onClick={resumeGameHandler}>
                      {lang.tetrisResume}
                    </button>
                  ) : (
                    ""
                  )}

                  <button onClick={startGameHandler}>
                    {lang.tetrisNewGame}
                  </button>
                  <button
                    onClick={() => {
                      setShowHighscore(true);
                      setShowMenu(false);
                      setGameOver(false);
                    }}
                  >
                    {lang.tetrisHighscores}
                  </button>
                  <button
                    onClick={() => {
                      setShowHelp(true);
                      setShowMenu(false);
                      setGameOver(false);
                    }}
                  >
                    {lang.tetrisHelp}
                  </button>
                </div>
              ) : (
                ""
              )}
              {gameOver ? (
                <div className="tetris__game-board__game-over">
                  <p>{lang.tetrisGameOver}</p>
                  <p>
                    {lang.tetrisYourScore} ({user.userTag})
                  </p>
                  <p>{score}</p>
                  <p>{lang.tetrisHighscore}</p>
                  <p>
                    {highscores && highscores.length > 0
                      ? `${highscores[0][0]} - ${highscores[0][1]}`
                      : lang.firstPlayer}
                  </p>
                </div>
              ) : (
                ""
              )}
              {showHighscore ? (
                <div className="tetris__game-board__menu__highscores">
                  <div>{lang.tetrisHighscores}</div>
                  <div>
                    {highscores.map((item, index) => (
                      <div key={index * Math.random()}>
                        <p>{index + 1}.</p>
                        <p>
                          <span>{item[0]}</span> - <span>{item[1]}</span>
                        </p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      setShowMenu(true);
                      setShowHighscore(false);
                    }}
                  >
                    {lang.tetrisBack}
                  </button>
                </div>
              ) : (
                ""
              )}

              {showHelp ? (
                <div className="tetris__game-board__menu__help">
                  <p>{lang.tetrisControlKeys}</p>
                  <p>{lang.tetrisMoveLeft}: "a"</p>
                  <p>{lang.tetrisMoveRight}: "d"</p>
                  <p>{lang.tetrisSoftDrop}: "s"</p>
                  <p>{lang.tetrisRotate}: "w"</p>
                  <p>{lang.tetrisPause}: "P"</p>
                  <button
                    onClick={() => {
                      setShowMenu(true);
                      setShowHelp(false);
                    }}
                  >
                    {lang.tetrisBack}
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div className="tetris__game-board-container">
              {tetrisBoard.map((rows, rowsIndex) => {
                if (rowsIndex <= 1) return "";
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
          {!pauseGame ? (
            <button onClick={pauseGameHandler}>
              <img
                className="tetris-pause"
                src={pauseIcon}
                alt={lang.tetrisPause}
              />
            </button>
          ) : (
            ""
          )}
          <div>
            <p>{lang.tetrisLines}</p>
            <p>{lines}</p>
          </div>
          <div>
            <p>{lang.tetrisLevel}</p>
            <p>{level}/6</p>
          </div>
          <div>
            <p>{lang.tetrisScore}</p>
            <p>{score}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TetrisApp;
