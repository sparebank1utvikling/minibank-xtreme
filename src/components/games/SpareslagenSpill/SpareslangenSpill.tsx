import { useState } from "react";
import styles from "./SpareslangenSpill.module.less";

type SnakePosition = {
  x: number;
  y: number;
};

const createSnake = () => {
  return [
    {
      x: 2,
      y: 2,
    },
  ];
};

export const SpareslangenSpill = () => {
  const [snakePositions, setSnakePositions] = useState(createSnake());

  return (
    <>
      <h1>Spareslangen</h1>
      <div className={styles.board} />
      {snakePositions.map((snakePosition: SnakePosition) => (
        <div
          style={{
            position: "absolute",
            top: `${snakePosition.y * 10}px`,
            left: `${snakePosition.x * 10}px`,
            width: "10px",
            height: "10px",
            backgroundColor: "green",
          }}
        />
      ))}
    </>
  );
};
