import styles from "./snake.module.less";

type Props = {
  positions: Position[];
  isPoisoned: boolean;
}

export const Snake = ({positions, isPoisoned}: Props) => {
  return (
    <>
      {positions.map((position: Position) => (
        <div
          className={styles.snake}
          key={`${position.x}-${position.y}`}
          style={{
            position: "absolute",
            top: `${position.y * 25}px`,
            left: `${position.x * 25}px`,
            width: "25px",
            height: "25px",
            backgroundColor: isPoisoned ? "purple" : "green",
          }}
        />
      ))}
    </>
  )
}
