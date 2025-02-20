import { useEffect, useState } from "react";
import styles from "./SpareslangenSpill.module.less";
import Mynt from "./mynt.svg?url";
import { BOARD_SPARESLANGEN_PATH } from "@/utils/constants";
import { GameComplete } from "@/components/common/GameComplete";

const BOARD_SIZE = 20;
const CELL_SIZE = 25;

type Position = {
  x: number;
  y: number;
};

type Direction = "l" | "r" | "u" | "d";

const createSnake = () => {
  return [
    {
      x: 0,
      y: 0,
    },
  ];
};

const createNewSnake = (oldSnake: Position[], direction: Direction) => {
  return oldSnake.map((it, index) => {
    if (index === 0) {
      switch (direction) {
        case "l":
          return { x: it.x - 1, y: it.y };
        case "r":
          return { x: it.x + 1, y: it.y };
        case "u":
          return { x: it.x, y: it.y - 1 };
        case "d":
          return { x: it.x, y: it.y + 1 };
      }
    }
    return oldSnake[index - 1];
  });
}

const isNextValid = (snakePositions: Position[], direction: Direction) => {
  const head = snakePositions[0];
  switch (direction) {
    case "l":
      return head.x > 0;
    case "r":
      return head.x < 19;
    case "u":
      return head.y > 0;
    case "d":
      return head.y < 19;
  }
};

export const SpareslangenSpill = () => {
  const [snakePositions, setSnakePositions] = useState(createSnake());
  const [snakeDirection, setSnakeDirection] = useState<Direction>("r");
  const [coinPosition, setCoinPosition] = useState<Position>({ x: 0, y: 0 });
  const [nokSaved, setNokSaved] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  function handleAteCoin() {
    setNokSaved(nokSaved + 1);
    placeNewCoin();

    setSnakePositions((prevSnake) => {
      const tail = prevSnake[prevSnake.length - 1];
      return [...createNewSnake(snakePositions, snakeDirection), tail];
    })
  }

  function handleGameOver() {
    setGameOver(true);
  }

  const moveSnake = (direction: Direction) => {
    setSnakePositions((snakePositions) => {
      return createNewSnake(snakePositions, direction);
    });
  };

  function placeNewCoin() {
    setCoinPosition({
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isNextValid(snakePositions, snakeDirection)) {
        return;
      }
      moveSnake(snakeDirection);
    }, 300);
    return () => clearInterval(interval);
  }, [snakePositions, snakeDirection]);

  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowLeft":
        case "4":
          setSnakeDirection("l");
          break;
        case "ArrowDown":
        case "2":
          setSnakeDirection("d");
          break;
        case "ArrowRight":
        case "6":
          setSnakeDirection("r");
          break;
        case "ArrowUp":
        case "8":
          setSnakeDirection("u");
          break;
      }
    });
    return () => {
      window.removeEventListener("keydown", () => {});
    };
  }, []);

  if (gameOver) {
    return <GameComplete gamePath={BOARD_SPARESLANGEN_PATH} score={nokSaved} />
  }

  return (
    <>
      <h1>Spareslangen</h1>
      <span className={styles.savings}>
        <h2>
          Så mye har du spart{" "}
          <span style={{ color: "orange" }}>{nokSaved}</span>
        </h2>
        <img
          style={{ width: CELL_SIZE, height: CELL_SIZE }}
          src={Mynt}
          alt="Mynt"
        />
      </span>
      <div className={styles.board}>
        <div className={styles.coin} onClick={handleAteCoin}>
          <img
            style={{
              position: "relative",
              top: coinPosition.y * CELL_SIZE,
              left: coinPosition.x * CELL_SIZE,
            }}
            src={Mynt}
            alt="Mynt"
          />
        </div>
        {snakePositions.map((snakePosition: Position) => (
          <div
            style={{
              position: "absolute",
              top: `${snakePosition.y * 25}px`,
              left: `${snakePosition.x * 25}px`,
              width: "25px",
              height: "25px",
              backgroundColor: "green",
            }}
          />
        ))}
      </div>
      <button onClick={handleGameOver}>End game</button>
    </>
  );
};
