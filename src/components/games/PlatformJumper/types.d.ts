export interface GameState {
  lastTime: number;
  playerX: number;
  playerY: number;
  speed: number;
}

export interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
}