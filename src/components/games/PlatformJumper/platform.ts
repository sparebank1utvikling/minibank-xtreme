import {GameState, Platform} from "@/components/games/PlatformJumper/types";
import {
  PLATFORM_HEIGHT,
  PLAYER_HEIGHT,
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
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
  let i = 0;
  while (i < n) {
    const baseWidth = VIEWPORT_WIDTH / 1.5 - i * 2;
    const width = Math.max(Math.random() * 5 + baseWidth, 50);
    const x = Math.max(Math.random() * VIEWPORT_WIDTH - width, 0);
    const y = i * spacing - n * spacing + VIEWPORT_HEIGHT * 1.8;
    const color = "green";
    platformArray.push({ x, y, width, color });
    i++;
  }
  return platformArray;
};

export const updatePlatforms = (platformArray: Platform[], speed: number) => {
  platformArray.forEach((platform) => {
    platform.y += speed;
  });
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
  });
}