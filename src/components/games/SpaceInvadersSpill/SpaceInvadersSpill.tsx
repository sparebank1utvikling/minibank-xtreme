import styles from "./SpaceInvadersSpill.module.css";
import {useEffect, useRef, useState} from "react";
import {NUMPAD_HOME} from "@/utils/constants";
import {useNavigate} from "react-router-dom";

type position = {
  x: number;
  y: number;
}

interface IBullet {
  element: HTMLDivElement;
  position: position;
}

export const SpaceInvadersSpill = () => {
  const [playing, setPlaying] = useState(false);
  const [bullets, setBullets] = useState<IBullet[]>([]);

  const navigate = useNavigate();

  const movementSpeed = 20;
  const playerPlacement = useRef(275);

  const createBullet = () => {
    const id = Math.random().toString();
    const bullet = document.createElement("div");
    bullet.className = styles.bullet;
    bullet.id = id;
    bullet.style.bottom = 70 + "px";
    bullet.style.left = (playerPlacement.current + 25) + "px";

    const bulletElement = {
      id: id,
      element: bullet,
      position: {
        x: playerPlacement.current,
        y: 60
      },
    }
    setBullets([...bullets, bulletElement]);

    document.querySelector("#canvas")?.appendChild(bullet);
  }

  const moveBullets = () => {
    console.log("moveBullets");

    bullets.map((bullet) => {
      const newBullet = bullet;
      newBullet.position.y += 10;
      newBullet.element.style.bottom = newBullet.position.y + "px";

      if (newBullet.position.y > 900) {
        newBullet.element.remove();
        return null;
      }

      return newBullet;
    }).filter((bullet) => bullet !== null);
  }

  setInterval(() => moveBullets(), 250);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();

      if (event.key === "6" || event.key === "ArrowRight") {
        playerPlacement.current = Math.min(playerPlacement.current + movementSpeed, 600 - 50);
      }

      if (event.key === "4" || event.key === "ArrowLeft") {
        playerPlacement.current = Math.max(playerPlacement.current - movementSpeed, 0);
      }

      document.documentElement.style.setProperty("--player-placement", playerPlacement.current + "px");

      if (event.key === "Escape") {
        setPlaying(false);
        navigate(NUMPAD_HOME);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      event.preventDefault();

      if (event.key === "8" || event.key === "ArrowUp") {
        console.log("shoot");
        createBullet();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
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