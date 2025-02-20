import styles from './SpareslangenSpill.module.less';
import { useState } from "react";
import Mynt from './mynt.svg?url';

const BOARD_SIZE = 20;
const CELL_SIZE = 25;

export const SpareslangenSpill = () => {
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
          }} src={Mynt} alt="Mynt" />
        </div>
      </div>
    </>
  )
}