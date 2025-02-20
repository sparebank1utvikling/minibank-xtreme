export interface GameState {
  lastTime: number;
  playerX: number;
  playerY: number;
  direction: 'LEFT' | 'RIGHT';
  speedX: number;
  speedY: number;
  isMoving: boolean;
  isJumping: boolean;
  speed: number;
  initialized: boolean;
}

export interface PlatformType {
  x: number;
  y: number;
  width: number;
  color: string
}