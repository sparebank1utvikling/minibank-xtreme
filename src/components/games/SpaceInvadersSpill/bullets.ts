import {Dispatch, MutableRefObject, SetStateAction} from "react";
import styles from "@/components/games/SpaceInvadersSpill/SpaceInvadersSpill.module.css";
import {BULLET_START_HEIGHT, PLAYER_SIZE} from "@/components/games/SpaceInvadersSpill/constants";
import {IBullet} from "@/components/games/SpaceInvadersSpill/SpaceInvadersSpill";

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