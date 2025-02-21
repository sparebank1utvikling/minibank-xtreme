import { useEffect, useRef, useState } from "react";
import styles from "./SpareslangenSpill.module.less";
import Mynt from "./mynt.svg?url";
import Dnb from "./dnb.svg?url";
import { BOARD_SPARESLANGEN_PATH } from "@/utils/constants";
import { GameComplete } from "@/components/common/GameComplete";
import { whatDoesTheSnakeSay } from "@/components/games/SpareslagenSpill/texts";
import { Direction, Position } from "./types";
import { Slange, SlangeHandle } from "@/components/games/SpareslagenSpill/Slange";

const BOARD_SIZE = 20;
const CELL_SIZE = 25;

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
  const slangeRef = useRef<SlangeHandle>(null);
  const [coinPosition, setCoinPosition] = useState<Position>(
    getNewFoodPosition()
  );
  const [poisonPosition, setPoisonPosition] = useState<Position | null>(null);
  const [nokSaved, setNokSaved] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [snakeLine, setSnakeLine] = useState<string>("What a nice day to sssssssave some money");

  function getNewFoodPosition() {
    while (true) {
      const nextPosition = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      };
      if (slangeRef.current?.occupies(nextPosition)) {
        continue;
      }
      return nextPosition;
    }
  }

  function handleAteCoin() {
    setNokSaved(nokSaved + 1);
    setCoinPosition(getNewFoodPosition());
    setSnakeLine(whatDoesTheSnakeSay("coin"));

    if (!poisonPosition && Math.random() < 0.2) {
      const poisonPosition = getNewFoodPosition();
      setPoisonPosition(poisonPosition);
    }

    slangeRef.current?.grow();
  }

  function handleAtePoison() {
    setNokSaved(nokSaved - 5);
    slangeRef.current?.poison();
    setPoisonPosition(null);
    setSnakeLine(whatDoesTheSnakeSay("dnb"));
  }

  function handleGameOver() {
    setGameOver(true);
  }

  useEffect(() => {
    const head = slangeRef.current?.head;
    if (!head) {
      return;
    }
    if (head.x === coinPosition.x && head.y === coinPosition.y) {
      handleAteCoin();
    }
    if (poisonPosition && head.x === poisonPosition.x && head.y === poisonPosition.y) {
      handleAtePoison();
    }
  }, [slangeRef.current?.head]);


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
          <div className={styles.food} onClick={handleAteCoin}>
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
          <Slange ref={slangeRef} savings={nokSaved} onGameOver={handleGameOver}/>
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
