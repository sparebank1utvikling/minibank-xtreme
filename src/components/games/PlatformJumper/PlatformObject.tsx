import {PlatformType} from "@/components/games/PlatformJumper/types";
import {VIEWPORT_HEIGHT, VIEWPORT_WIDTH} from "@/components/games/PlatformJumper/constants";

export const renderPlatform = (ctx: CanvasRenderingContext2D, platform: PlatformType) => {
  ctx.fillStyle = platform.color;
  ctx.fillRect(platform.x, platform.y, platform.x, 10);
}

export const renderAllPlatforms = (ctx: CanvasRenderingContext2D, platformArray: PlatformType[]) => {
  platformArray.forEach((platform) => {
    renderPlatform(ctx, platform)
  })
}

export const createPlatforms = (n: number, spacing: number) => {
  const platformArray: PlatformType[] = []
  let i = 0;
  while (i < n) {
    const baseWidth = 100 + (i * 5)
    const width = (Math.random() * 5) + baseWidth;
    const x = (Math.random() * VIEWPORT_WIDTH) - width
    const y = (i * spacing) - (n * spacing) + VIEWPORT_HEIGHT;
    const color = 'green'
    platformArray.push({x, y, width, color})
    i++;
  }
  console.log("Platformarray:", platformArray)
  return platformArray;
}

export const updatePlatforms = (platformArray: PlatformType[], speed: number) => {
  platformArray.forEach((platform) => {
    platform.y += speed;
  })
  return platformArray;
}