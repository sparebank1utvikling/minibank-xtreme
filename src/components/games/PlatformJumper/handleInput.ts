import {GameState} from "@/components/games/PlatformJumper/types";

export const handleInput = (
  event: KeyboardEvent,
  gameState:  React.MutableRefObject<GameState>
) => {
  const state = gameState.current;
  console.log(event.key)
  switch (event.key) {
    case "ArrowLeft":
      state.playerX -= state.speed;
      break;
    case "ArrowRight":
      state.playerX += state.speed;
      break;
    case "ArrowUp":
      state.playerY -= state.speed;
      break;
    case "ArrowDown":
      state.playerY += state.speed;
      break;
  }
}