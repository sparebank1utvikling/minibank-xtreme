import { GameState, Platform } from "@/components/games/PlatformJumper/types";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  PLATFORM_HEIGHT,
  PLAYER_HEIGHT,
} from "@/components/games/PlatformJumper/constants";

const renderPlatform = (ctx: CanvasRenderingContext2D, platform: Platform) => {
  ctx.fillStyle = platform.color;
  ctx.fillRect(platform.x, platform.y, platform.width, PLATFORM_HEIGHT);
};

export const renderAllPlatforms = (
  ctx: CanvasRenderingContext2D,
  platforms: Platform[],
) => {
  platforms.forEach((platform) => {
    renderPlatform(ctx, platform);
  });
};

export const createPlatforms = (n: number, spacing: number, curY: number) => {
  const platformArray: Platform[] = [];

  // Add a full-width platform at the bottom of the viewport
  platformArray.push({
    x: 0,
    y: CANVAS_HEIGHT - 30, // Position it slightly above the bottom edge
    width: CANVAS_WIDTH,
    color: "#33AF85",
  });

  let i = 0;
  while (i < n) {
    const baseWidth = CANVAS_WIDTH / 1.5 - i * 2;
    const width = Math.max(Math.random() * 5 + baseWidth, 50);
    const x = Math.max(Math.random() * CANVAS_WIDTH - width, 0);
    const y = i * spacing - n * spacing + CANVAS_HEIGHT * 1.8;
    const color = "#33AF85";
    platformArray.push({ x, y, width, color });
    i++;
  }
  return platformArray;
};

/**
 * Returns an array of platforms that the player is colliding with.
 */
export function getCollidingPlatforms(state: GameState) {
  return state.platforms.filter((platform) => {
    return (
      state.playerX < platform.x + platform.width &&
      state.playerX > platform.x &&
      state.playerY >= platform.y - PLAYER_HEIGHT && // På eller i plattformen
      state.playerY <= platform.y // Ikke lavere enn plattformen
    );
  })[0];
}
