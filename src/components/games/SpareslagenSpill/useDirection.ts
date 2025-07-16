import { useEffect, useState } from "react";

const INITIAL_DIRECTION = 'u';

export const useDirection = () => {
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);

  const eventKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowLeft":
      case "4":
        if (direction != "r") setDirection("l");
        break;
      case "ArrowDown":
      case "2":
        if (direction != "u") setDirection("d");
        break;
      case "ArrowRight":
      case "6":
        if (direction != "l") setDirection("r");
        break;
      case "ArrowUp":
      case "8":
        if (direction != "d") setDirection("u");
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", eventKeyDown);
    return () => {
      window.removeEventListener("keydown", eventKeyDown);
    };
  }, [direction]);
  
  return direction
}