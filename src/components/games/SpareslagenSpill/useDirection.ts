import { useEffect, useState } from "react";

const INITIAL_DIRECTION = 'u';

export const useDirection = () => {
  const [currentDirection, setCurrentDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [nextDirection, setNextDirection] = useState<Direction>(INITIAL_DIRECTION);

  function getNextSnakeDirection() {
    setCurrentDirection(nextDirection)
    return nextDirection;
  }

  const eventKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowLeft":
      case "4":
        if (currentDirection != "r") setNextDirection("l");
        break;
      case "ArrowDown":
      case "2":
        if (currentDirection != "u") setNextDirection("d");
        break;
      case "ArrowRight":
      case "6":
        if (currentDirection != "l") setNextDirection("r");
        break;
      case "ArrowUp":
      case "8":
        if (currentDirection != "d") setNextDirection("u");
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", eventKeyDown);
    return () => {
      window.removeEventListener("keydown", eventKeyDown);
    };
  }, [currentDirection]);
  
  return [currentDirection, getNextSnakeDirection] as const;
}