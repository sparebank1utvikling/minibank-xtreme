import { useState } from "react";
import { getAvailableCell } from "@/components/games/SpareslagenSpill/board";

export const useCoin= () => {
  const [position, setPosition] = useState<Position>(getInitialPosition());

  function getInitialPosition() {
    return {
      x: Math.floor(Math.random() * 5 + 1),
      y: Math.floor(Math.random() * 5 + 1),
    };
  }

  function updatePosition(snakePositions: Position[]) {
    setPosition(getAvailableCell(snakePositions));
  }

  return [position, updatePosition] as const;
}