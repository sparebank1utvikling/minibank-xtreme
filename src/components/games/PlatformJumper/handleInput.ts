import { GameState } from "@/components/games/PlatformJumper/types";

const JUMP_FORCE = -1000;
const SPEED_X = 5;

export const handleInput = (
  event: KeyboardEvent,
  gameState: React.MutableRefObject<GameState>,
) => {
  const state = gameState.current;
  switch (event.key) {
    case "ArrowLeft":
      state.playerX -= SPEED_X;
      break;
    case "ArrowRight":
      state.playerX += SPEED_X;
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

