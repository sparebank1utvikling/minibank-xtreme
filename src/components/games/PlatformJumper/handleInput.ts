import { GameState } from "@/components/games/PlatformJumper/types";

const JUMP_FORCE = -1000;

export const handleKeyDown = (event: KeyboardEvent, state: GameState) => {
  switch (event.key) {
    case "ArrowLeft":
    case "a":
      state.direction = "LEFT";
      state.isMovementInput = true;
      break;
    case "ArrowRight":
    case "d":
      state.direction = "RIGHT";
      state.isMovementInput = true;
      break;
    case "ArrowUp":
    case " ":
      if (!state.isJumping) {
        state.speedY = JUMP_FORCE;
        state.isJumping = true;
      }
      break;
  }
};

export const handleKeyUp = (event: KeyboardEvent, state: GameState) => {
  switch (event.key) {
    case "ArrowLeft":
    case "a":
      state.isMovementInput = false;
      break;
    case "ArrowRight":
    case "d":
      state.isMovementInput = false;
      break;
  }
};
