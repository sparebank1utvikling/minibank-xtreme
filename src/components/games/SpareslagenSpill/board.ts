export const BOARD_SIZE = 20;
export const CELL_SIZE = 25;

export function getAvailableCell(snake: Position[]) {
  while (true) {
    const x = Math.floor(Math.random() * BOARD_SIZE);
    const y = Math.floor(Math.random() * BOARD_SIZE);
    if (!snake.some((it) => it.x === x && it.y === y)) {
      return { x, y };
    }
  }
}
