import { useEffect, useState } from "react";
import styles from "./SpareslangenSpill.module.less";
import Mynt from "./mynt.svg?url";
import Dnb from "./dnb.svg?url";
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
      x: 10,
      y: 10,
    },
    {
      x: 10,
      y: 11,
    },
    {
      x: 10,
      y: 12,
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
};

const getNextHeadPosition = (
  snakePositions: Position[],
  direction: Direction
): Position | null => {
  const head = snakePositions[0];
  switch (direction) {
    case "l":
      if (head.x > 0) {
        return { x: head.x - 1, y: head.y };
      }
      return null;
    case "r":
      if (head.x < 19) {
        return { x: head.x + 1, y: head.y };
      }
      return null;
    case "u":
      if (head.y > 0) {
        return { x: head.x, y: head.y - 1 };
      }
      return null;
    case "d":
      if (head.y < 19) {
        return { x: head.x, y: head.y + 1 };
      }
      return null;
    default:
      return null;
  }
};

export const SpareslangenSpill = () => {
  const [snakePositions, setSnakePositions] = useState<Position[]>(
    createSnake()
  );
  const [snakeDirection, setSnakeDirection] = useState<Direction>("u");
  const [coinPosition, setCoinPosition] = useState<Position>(
    getNewCoinPosition()
  );
  const [poisonPosition, setPoisonPosition] = useState<Position | null>(null);
  const [isPoisoned, setIsPoisoned] = useState<boolean>(false);
  const [nokSaved, setNokSaved] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  function getNewCoinPosition() {
    while (true) {
      const nextPosition = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      };
      if (
        snakePositions.some(
          (it) => it.x === nextPosition.x && it.y === nextPosition.y
        )
      ) {
        continue;
      }
      return nextPosition;
    }
  }

  function handleAteCoin() {
    setNokSaved(nokSaved + 1);
    setCoinPosition(getNewCoinPosition());

    if (!poisonPosition && Math.random() < 0.2) {
      const poisonPosition = getNewCoinPosition();
      setPoisonPosition(poisonPosition);
    }

    setSnakePositions((prevSnake) => {
      const tail = prevSnake[prevSnake.length - 1];
      return [...createNewSnake(snakePositions, snakeDirection), tail];
    });
  }

  function handleAtePoison() {
    setNokSaved(nokSaved - 5);
    setIsPoisoned(true);
    setPoisonPosition(null);
  }

  function handleGameOver() {
    setGameOver(true);
  }

  const moveSnake = (direction: Direction) => {
    setSnakePositions(createNewSnake(snakePositions, direction));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPoisoned) {
        setIsPoisoned(false);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isPoisoned, setIsPoisoned]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextHeadPosition = getNextHeadPosition(
        snakePositions,
        snakeDirection
      );
      if (nextHeadPosition === null) {
        handleGameOver();
      } else if (snakePositions.some((it) => it.x === nextHeadPosition.x && it.y === nextHeadPosition.y)) {
        handleGameOver();
      } else if (
        nextHeadPosition.x === coinPosition.x &&
        nextHeadPosition.y === coinPosition.y
      ) {
        handleAteCoin();
      } else if (poisonPosition && nextHeadPosition.x === poisonPosition.x && nextHeadPosition.y === poisonPosition.y) {
        handleAtePoison();
        moveSnake(snakeDirection);
      } else {
        moveSnake(snakeDirection);
      }
    }, 300);
    return () => clearInterval(interval);
  }, [snakePositions, snakeDirection]);

  const eventKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowLeft":
      case "4":
        if (snakeDirection != "r") setSnakeDirection("l");
        break;
      case "ArrowDown":
      case "2":
        if (snakeDirection != "u") setSnakeDirection("d");
        break;
      case "ArrowRight":
      case "6":
        if (snakeDirection != "l") setSnakeDirection("r");
        break;
      case "ArrowUp":
      case "8":
        if (snakeDirection != "d") setSnakeDirection("u");
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", eventKeyDown);
    return () => {
      window.removeEventListener("keydown", eventKeyDown);
    };
  }, [snakeDirection]);

  if (gameOver) {
    return <GameComplete gamePath={BOARD_SPARESLANGEN_PATH} score={nokSaved} />;
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
        {poisonPosition && (<div className={styles.coin} onClick={handleAtePoison}>
          <img
            style={{
              position: "relative",
              top: poisonPosition.y * CELL_SIZE - CELL_SIZE,
              left: poisonPosition.x * CELL_SIZE,
            }}
            src={Dnb}
            alt="Giftig merkevare"
          />
        </div>)}
        {snakePositions.map((snakePosition: Position) => (
          <div
            className={styles.snake}
            style={{
              position: "absolute",
              top: `${snakePosition.y * 25}px`,
              left: `${snakePosition.x * 25}px`,
              width: "25px",
              height: "25px",
              backgroundColor: isPoisoned ? "purple" : "green",
            }}
          />
        ))}
      </div>
      <button onClick={handleGameOver}>End game</button>
    </>
  );
};
