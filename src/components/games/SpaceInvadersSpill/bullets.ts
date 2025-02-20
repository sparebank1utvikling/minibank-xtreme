import {Dispatch, MutableRefObject, SetStateAction} from "react";
import styles from "@/components/games/SpaceInvadersSpill/SpaceInvadersSpill.module.css";
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

export const createBullet = (playerPlacement: MutableRefObject<number>, bullets: IBullet[], setBullets: Dispatch<SetStateAction<IBullet[]>>) => {
  const id = Math.random().toString();
  const bullet = document.createElement("div");
  bullet.className = styles.bullet;
  bullet.id = id;
  bullet.style.bottom = BULLET_START_HEIGHT + "px";
  bullet.style.left = (playerPlacement.current + PLAYER_SIZE/2) + "px";

  const bulletElement = {
    id: id,
    element: bullet,
    position: {
      x: playerPlacement.current,
      y: BULLET_START_HEIGHT
    },
  }
  setBullets([...bullets, bulletElement]);

  document.querySelector("#canvas")?.appendChild(bullet);
}

export const moveBullets = (bullets: IBullet[]) => {
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