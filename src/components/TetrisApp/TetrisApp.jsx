import "./src/styles/tetrisMain.css";

import React, { useState } from "react";

const TetrisApp = () => {
  // To Refactor, just for styling purpouse
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
    ["b", "b", "b", "b", "b", "e", "e", "e", "e", "e"],
    ["b", "b", "b", "e", "b", "e", "e", "e", "e", "e"],
    ["b", "b", "b", "e", "b", "b", "b", "b", "b", "e"],
    ["b", "b", "b", "b", "b", "b", "b", "b", "b", "e"],
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
        </div>
        <div className="tetris__game-board-container">
          {tetrisBoard.map((rows) =>
            rows.map((item) => (
              <div
                className={`tetris__game-board-container__item ${
                  item === "b" && "tetris-item-block"
                }`}
              ></div>
            ))
          )}
        </div>
        {/* To Refactor, just for styling purpouse */}
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
