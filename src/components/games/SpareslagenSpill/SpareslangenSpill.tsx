import { useEffect, useState } from "react";
import styles from "./SpareslangenSpill.module.less";
import Mynt from './mynt.svg?url';
import { BOARD_SPARESLANGEN_PATH } from "@/utils/constants";
import { GameComplete } from "@/components/common/GameComplete";

const BOARD_SIZE = 20;
const CELL_SIZE = 25;

type Position = {
    x: number;
    y: number;
};

type Direction = 'l' | 'r' | 'u' | 'd';

const createSnake = () => {
    return [
        {
            x: 1,
            y: 1,
        },
    ];
};

const isNextValid = (snakePositions: Position[], direction: Direction) => {
    const head = snakePositions[0];
    console.log(head);
    switch (direction) {
        case 'l':
            return head.x > 0;
        case 'r':
            return head.x < 19;
        case 'u':
            return head.y > 0;
        case 'd':
            return head.y < 19;
    }
}

export const SpareslangenSpill = () => {
    const [snakePositions, setSnakePositions] = useState(createSnake());
    const [coinPosition, setCoinPosition] = useState<Position>({x: 0, y: 0});
    const [nokSaved, setNokSaved] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    function handleAteCoin() {
        setNokSaved(nokSaved + 1);
        placeNewCoin();
    }

    function handleGameOver() {
        setGameOver(true);
    }

    const moveSnake = (direction: Direction) => {
        setSnakePositions((snakePositions) => {
            return snakePositions.map((snakePosition, index) => {
                if (index === 0) {
                    switch (direction) {
                        case 'l':
                            return {x: snakePosition.x - 1, y: snakePosition.y};
                        case 'r':
                            return {x: snakePosition.x + 1, y: snakePosition.y};
                        case 'u':
                            return {x: snakePosition.x, y: snakePosition.y - 1};
                        case 'd':
                            return {x: snakePosition.x, y: snakePosition.y + 1};
                    }
                }
                return snakePositions[index - 1];
            });
        });
    };

    function placeNewCoin() {
        setCoinPosition({
            x: Math.floor(Math.random() * BOARD_SIZE),
            y: Math.floor(Math.random() * BOARD_SIZE),
        });
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isNextValid(snakePositions, 'r')) {
                return;
            }
            moveSnake('r');
        }, 300);
        return () => clearInterval(interval);
    }, [snakePositions]);

    if (gameOver) {
        return <GameComplete gamePath={BOARD_SPARESLANGEN_PATH} score={nokSaved} />
    }

    return (
        <>
            <h1>Spareslangen</h1>
            <span className={styles.savings}>
                  <h2>Så mye har du spart <span style={{color: "orange"}}>{nokSaved}</span></h2>
                  <img style={{width: CELL_SIZE, height: CELL_SIZE}} src={Mynt} alt="Mynt"/>
              </span>
            <div className={styles.board}>
                <div className={styles.coin} onClick={handleAteCoin}>
                    <img style={{
                        position: "relative",
                        top: coinPosition.y * CELL_SIZE,
                        left: coinPosition.x * CELL_SIZE,
                    }} src={Mynt} alt="Mynt"
                    />
                </div>
                {snakePositions.map((snakePosition: Position) => (
                    <div
                        style={{
                            position: "absolute",
                            top: `${snakePosition.y * 25}px`,
                            left: `${snakePosition.x * 25}px`,
                            width: "25px",
                            height: "25px",
                            backgroundColor: "green",
                        }}
                    />
                ))}
            </div>
            <button onClick={handleGameOver}>Avslutt</button>
        </>
    );
};
