import { useEffect, useState } from "react";
import styles from "./SpareslangenSpill.module.less";
import Mynt from "./mynt.svg?url";
import Dnb from "./dnb.svg?url";
import { BOARD_SPARESLANGEN_PATH } from "@/utils/constants";
import { GameComplete } from "@/components/common/GameComplete";
import { whatDoesTheSnakeSay } from "@/components/games/SpareslagenSpill/texts";
import { useDirection } from "@/components/games/SpareslagenSpill/useDirection";
import { Slange } from "@/components/games/SpareslagenSpill/slange";

const BOARD_SIZE = 20;
const CELL_SIZE = 25;

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

const getSpeed = (base: number, nokSaved: number) =>
    base - Math.floor(nokSaved / 2) * 10;


export const SpareslangenSpill = () => {
  const [snakePositions, setSnakePositions] = useState<Position[]>(
    createSnake()
  );
  const [currentSnakeDirection, getNextSnakeDirection] = useDirection();
  const [coinPosition, setCoinPosition] = useState<Position>(
    getNewCoinPosition()
  );
  const [poisonPosition, setPoisonPosition] = useState<Position | null>(null);
  const [isPoisoned, setIsPoisoned] = useState<boolean>(false);
  const [nokSaved, setNokSaved] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [snakeLine, setSnakeLine] = useState<string>("What a nice day to sssssssave some money");

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

  function handleAteCoin(snakeDirection: Direction) {
    setNokSaved(nokSaved + 1);
    setCoinPosition(getNewCoinPosition());
    setSnakeLine(whatDoesTheSnakeSay("coin"));

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
    setSnakeLine(whatDoesTheSnakeSay("dnb"));
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
      const snakeDirection = getNextSnakeDirection();
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
        handleAteCoin(snakeDirection);
      } else if (poisonPosition && nextHeadPosition.x === poisonPosition.x && nextHeadPosition.y === poisonPosition.y) {
        handleAtePoison();
        moveSnake(snakeDirection);
      } else {
        moveSnake(snakeDirection);
      }
    }, getSpeed(200, nokSaved));
    return () => clearInterval(interval);
  }, [snakePositions]);

  if (gameOver) {
    return <GameComplete gamePath={BOARD_SPARESLANGEN_PATH} score={nokSaved} />;
  }

  return (
    <div className={styles.spareslangenSpill}>
      <h1>Spareslangen</h1>
      <div>
        <span className={styles.savings}>
          <h2>
            {nokSaved >= 0 ? "Du har spart " : "Du har gjeld "}{" "}
            <span style={{ color: "orange" }}>{nokSaved}</span>
          </h2>
          <img
            style={{ width: CELL_SIZE, height: CELL_SIZE }}
            src={Mynt}
            alt="Mynt"
          />
        </span>
        <div className={styles.board}>
          <div className={styles.food} onClick={() => handleAteCoin(currentSnakeDirection)}>
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
          {poisonPosition && (<div className={styles.food} onClick={handleAtePoison}>
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
        <Slange positions={snakePositions} isPoisoned={isPoisoned} />
        </div>
        {snakeLine && (
            <span className={styles.snakeLine}>
              🐍{" "}
              <p>"{snakeLine}"</p>
            </span>
        )}
      </div>
    </div>
  );
};
