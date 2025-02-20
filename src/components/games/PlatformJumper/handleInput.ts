import {GameState} from "@/components/games/PlatformJumper/types";

const JUMP_FORCE = -1000;

export const handleInput = (
  event: KeyboardEvent,
  gameState:  React.MutableRefObject<GameState>
) => {
  const state = gameState.current;
  console.log(event.key)
  switch (event.key) {
    case "ArrowLeft":
      state.playerX -= state.speedX;
      break;
    case "ArrowRight":
      state.playerX += state.speedX;
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
}