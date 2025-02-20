import {NUMPAD_HOME} from "@/utils/constants";
import {PLAYER_SIZE, PLAYER_SPEED, WINDOW_WIDTH} from "./constants";
import {Dispatch, MutableRefObject, SetStateAction} from "react";
import {type NavigateFunction} from "react-router";
import {createBullet, IBullet} from "@/components/games/SpaceInvadersSpill/bullets";

export const handleKeyDown = (
  event: KeyboardEvent,
  playerPlacement:  MutableRefObject<number>,
  setPlaying: Dispatch<SetStateAction<boolean>>,
  navigate: NavigateFunction) => {
  event.preventDefault();

  if (event.key === "6" || event.key === "ArrowRight") {
    playerPlacement.current = Math.min(playerPlacement.current + PLAYER_SPEED, WINDOW_WIDTH - PLAYER_SIZE);
  }

  if (event.key === "4" || event.key === "ArrowLeft") {
    playerPlacement.current = Math.max(playerPlacement.current - PLAYER_SPEED, 0);
  }

  document.documentElement.style.setProperty("--player-placement", playerPlacement.current + "px");

  if (event.key === "Escape") {
    setPlaying(false);
    navigate(NUMPAD_HOME);
  }
};

export const handleKeyUp = (event: KeyboardEvent, playerPlacement: MutableRefObject<number>, bullets: IBullet[], setBullets: Dispatch<SetStateAction<IBullet[]>>) => {
  event.preventDefault();

  if (event.key === "8" || event.key === "ArrowUp") {
    createBullet(playerPlacement, bullets, setBullets);
  }
};