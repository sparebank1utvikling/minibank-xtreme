import styles from "./SpaceInvadersSpill.module.css";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {handleKeyDown, handleKeyUp} from "@/components/games/SpaceInvadersSpill/keyEvents";
import {IBullet, moveBullets} from "@/components/games/SpaceInvadersSpill/bullets";

export const SpaceInvadersSpill = () => {
  const [playing, setPlaying] = useState(false);
  const [bullets, setBullets] = useState<IBullet[]>([]);

  const navigate = useNavigate();

  const playerPlacement = useRef(275);

  setInterval(() => moveBullets(bullets), 250);

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