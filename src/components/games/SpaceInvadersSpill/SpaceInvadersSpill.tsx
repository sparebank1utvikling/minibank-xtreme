import styles from "./SpaceInvadersSpill.module.css";
import {Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {handleKeyDown, handleKeyUp} from "@/components/games/SpaceInvadersSpill/keyEvents";
import {
  BULLET_SPEED,
  BULLET_START_HEIGHT,
  PLAYER_SIZE,
  WINDOW_HEIGHT
} from "@/components/games/SpaceInvadersSpill/constants";

type position = {
  x: number;
  y: number;
}

export interface IBullet {
  element: HTMLDivElement;
  position: position;
}

export const SpaceInvadersSpill = () => {
  const [playing, setPlaying] = useState(false);
  const [bullets, setBullets] = useState<IBullet[]>([]);

  const navigate = useNavigate();

  const playerPlacement = useRef(275);

  const moveBullets = () => {
    bullets.map((bullet) => {
      const newBullet = bullet;
      newBullet.position.y += BULLET_SPEED;
      newBullet.element.style.bottom = newBullet.position.y + "px";

      if (newBullet.position.y >= WINDOW_HEIGHT) {
        newBullet.element.remove();
        return null;
      }

      return newBullet;
    }).filter((bullet) => bullet !== null);
  }

  setInterval(() => moveBullets(), 250);

  useEffect(() => {
    document.addEventListener("keydown", (e: KeyboardEvent) =>
      handleKeyDown(e, playerPlacement, setPlaying, navigate));
    document.addEventListener("keyup", (e: KeyboardEvent) =>
      handleKeyUp(e, playerPlacement, bullets, setBullets));

    return () => {
      document.removeEventListener("keydown", (e: KeyboardEvent) =>
        handleKeyDown(e, playerPlacement, setPlaying, navigate));
      document.removeEventListener("keyup", (e: KeyboardEvent) =>
        handleKeyUp(e, playerPlacement, bullets, setBullets));
    };
  }, []);

  if (playing) {
    return (
      <div id="canvas" className={styles.canvas}>
        <div className={styles.player}></div>
      </div>
    )

  }
  return (
    <div id="canvas" className={styles.canvas}>
      <h1>Space Invaders</h1>
      <button onClick={() => setPlaying(true)}>START</button>
    </div>
  )
}