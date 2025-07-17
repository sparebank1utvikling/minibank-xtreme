import { useEffect, useState } from "react";
import styles from "./SpareslangenSpill.module.less";
import Mynt from "./mynt.svg?url";
import Dnb from "./dnb.svg?url";
import { BOARD_SPARESLANGEN_PATH } from "@/utils/constants";
import { GameComplete } from "@/components/common/GameComplete";
import { whatDoesTheSnakeSay } from "@/components/games/SpareslagenSpill/texts";
import { Snake } from "@/components/games/SpareslagenSpill/snake/snake";
import { useSnake } from "@/components/games/SpareslagenSpill/snake/useSnake";
import { useCoin } from "./coin/useCoin";
import { CELL_SIZE } from "./board";
import { getAvailableCell } from "@/components/games/SpareslagenSpill/board";

const getSpeed = (base: number, nokSaved: number) =>
    base - Math.floor(nokSaved / 2) * 10;

export const SpareslangenSpill = () => {
  const snake = useSnake();
  const [coinPosition, updateCoinPosition] = useCoin();
  const [poisonPosition, setPoisonPosition] = useState<Position | null>(null);
  const [nokSaved, setNokSaved] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [snakeLine, setSnakeLine] = useState<string>("What a nice day to sssssssave some money");

  function handleAteCoin(snakeDirection: Direction) {
    setNokSaved(nokSaved + 1);
    updateCoinPosition(snake.positions);
    setSnakeLine(whatDoesTheSnakeSay("coin"));

    if (!poisonPosition && Math.random() < 0.2) {
      const poisonPosition = getAvailableCell(snake.positions);
      setPoisonPosition(poisonPosition);
    }

    snake.eatCoin(snakeDirection);
  }

  function handleAtePoison() {
    setNokSaved(nokSaved - 5);
    snake.poison();
    setPoisonPosition(null);
    setSnakeLine(whatDoesTheSnakeSay("dnb"));
  }

  function handleGameOver() {
    setGameOver(true);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const snakeDirection = snake.getNextDirection();
      const nextHeadPosition = snake.getNextHeadPosition(snakeDirection);
      if (nextHeadPosition === null) {
        handleGameOver();
      } else if (snake.positions.some((it) => it.x === nextHeadPosition.x && it.y === nextHeadPosition.y)) {
        handleGameOver();
      } else if (
        nextHeadPosition.x === coinPosition.x &&
        nextHeadPosition.y === coinPosition.y
      ) {
        handleAteCoin(snakeDirection);
      } else if (poisonPosition && nextHeadPosition.x === poisonPosition.x && nextHeadPosition.y === poisonPosition.y) {
        handleAtePoison();
        snake.move(snakeDirection);
      } else {
        snake.move(snakeDirection);
      }
    }, getSpeed(200, nokSaved));
    return () => clearInterval(interval);
  }, [snake.positions]);

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
          <div className={styles.food} onClick={() => handleAteCoin(snake.currentDirection)}>
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
        <Snake positions={snake.positions} isPoisoned={snake.isPoisoned} />
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
