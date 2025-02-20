export interface GameState {
  lastTime: number;
  playerX: number;
  playerY: number;
  speedX: number;
  speedY: number;
  isJumping: boolean;
  speed: number;
}

export interface PlatformType {
  x: number;
  y: number;
  width: number;
  color: string
}