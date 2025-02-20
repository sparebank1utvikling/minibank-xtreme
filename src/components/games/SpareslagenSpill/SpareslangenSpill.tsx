import { useState } from "react";
import styles from "./SpareslangenSpill.module.less";
import Mynt from './mynt.svg?url';

const BOARD_SIZE = 20;
const CELL_SIZE = 25;

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
    const [coinPosition, setCoinPosition] = useState({ x: 0, y: 0 });

    function placeNewCoin() {
        setCoinPosition({
            x: Math.floor(Math.random() * BOARD_SIZE),
            y: Math.floor(Math.random() * BOARD_SIZE),
        });
    }
    return (
    <>
        <h1>Spareslangen</h1>
        <div className={styles.board}>
            <div className={styles.coin} onClick={placeNewCoin}>
                <img style={{
                    position: "relative",
                    top: coinPosition.y * CELL_SIZE,
                    left: coinPosition.x * CELL_SIZE,
                    }} src={Mynt} alt="Mynt"
                />
            </div>
        </div>
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
