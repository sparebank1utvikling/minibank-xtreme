import styles from "@/components/games/SpareslagenSpill/SpareslangenSpill.module.less";

type Props = {
  positions: Position[];
  isPoisoned: boolean;
}

export const Slange = ({positions, isPoisoned}: Props) => {
  return (
    <>
      {positions.map((snakePosition: Position) => (
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
}