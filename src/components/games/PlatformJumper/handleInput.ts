import { GameState } from "@/components/games/PlatformJumper/types";

const JUMP_FORCE = -1000;
const SPEED_X = 5;

export const handleKeyDown = (
  event: KeyboardEvent,
  gameState: React.MutableRefObject<GameState>,
) => {
  const state = gameState.current;
  switch (event.key) {
    case "ArrowLeft":
      state.direction = "LEFT";
      state.isMoving = true;
      break;
    case "ArrowRight":
      state.direction = "RIGHT";
      state.isMoving = true;
      break;
    case "ArrowUp":
      if (!state.isJumping) {
        state.speedY = JUMP_FORCE;
        state.isJumping = true;
      }
      break;
    case "ArrowDown":
      state.playerY += state.speedY;
      break;
  }
};

export const handleKeyUp = (
    event: KeyboardEvent,
    gameState: React.MutableRefObject<GameState>,
) => {
  const state = gameState.current;
  switch (event.key) {
    case "ArrowLeft":
      state.isMoving = false;
      break;
    case "ArrowRight":
      state.isMoving = false;
      break;
  }
}