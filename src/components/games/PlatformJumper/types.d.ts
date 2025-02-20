export interface GameState {
  lastTime: number;
  playerX: number;
  playerY: number;
  speedX: number;
  speedY: number;
}

export interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
}