export interface GameState {
  playerX: number;
  playerY: number;
  direction: "LEFT" | "RIGHT";
  speedX: number;
  speedY: number;
  isMovementInput: boolean;
  isJumping: boolean;
  platforms: Platform[];
}

export interface Platform {
  x: number;
  y: number;
  width: number;
  color: string;
}
