import styles from "@/components/games/SpareslagenSpill/SpareslangenSpill.module.less";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Direction, Position } from "@/components/games/SpareslagenSpill/types";
import { useDirection } from "@/components/games/SpareslagenSpill/Slange/useDirection";

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

export type SlangeHandle = {
  head: Position;
  grow: () => void;
  poison: () => void;
  occupies: (position: Position) => boolean;
}

const getSpeed = (base: number, nokSaved: number) =>
  base - Math.floor(nokSaved / 2) * 10;

const INITIAL_DIRECTION = "u";

type Props = {
  savings: number,
  onGameOver: () => void,
}

export const Slange = forwardRef<SlangeHandle, Props>(({ savings, onGameOver }, ref) => {
  const [bodyPositions, setBodyPositions] = useState<Position[]>(createSnake());
  const direction = useDirection();
  const [isPoisoned, setIsPoisoned] = useState(false);

  useImperativeHandle(ref, () => ({
    head: bodyPositions[0],
    grow: () => {
      setBodyPositions((oldSnake) => {
        return [createNewSnake(oldSnake, "u")[0], ...oldSnake];
      });
    },
    poison: () => {
      setIsPoisoned(true);
    },
    occupies: (position: Position) => {
      return bodyPositions.some((it) => it.x === position.x && it.y === position.y);
    },
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPoisoned) {
        setIsPoisoned(false);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isPoisoned, setIsPoisoned]);

  const moveSnake = (direction: Direction) => {
    setBodyPositions(createNewSnake(bodyPositions, direction));
  };

  function isCollision() {
    const head = bodyPositions[0];
    const rest = bodyPositions.slice(1);
    return rest.some((it) => it.x === head.x && it.y === head.y);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      moveSnake(direction);
      if (isCollision()) {
        onGameOver();
      }
    }, getSpeed(150, savings));
    return () => clearInterval(interval);
  }, [bodyPositions, direction]);

  return (
    <>
      {bodyPositions.map((snakePosition: Position) => (
        <div
          className={styles.snake}
          key={`${snakePosition.x}-${snakePosition.y}`}
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
    </>
  )
});