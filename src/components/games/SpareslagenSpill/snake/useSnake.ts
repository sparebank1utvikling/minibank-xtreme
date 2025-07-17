import { useEffect, useState } from "react";
import { useDirection } from "./useDirection";

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

export const useSnake = () => {
  const [positions, setPositions] = useState<Position[]>(
    createSnake()
  );
  const [currentDirection, getNextDirection] = useDirection();
  const [isPoisoned, setIsPoisoned] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPoisoned) {
        setIsPoisoned(false);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isPoisoned, setIsPoisoned]);

  function eatCoin(direction: Direction) {
    setPositions((prevSnake) => {
      const tail = prevSnake[prevSnake.length - 1];
      return [...createNewSnake(positions, direction), tail];
    });
  }

  function poison() {
    setIsPoisoned(true);
  }

  function move(direction: Direction) {
    setPositions(createNewSnake(positions, direction));
  }

  function getNextHeadPosition(direction: Direction): Position | null {
    const head = positions[0];
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
  }

  return { positions, eatCoin, poison, isPoisoned, currentDirection, getNextDirection, getNextHeadPosition, move };
}
