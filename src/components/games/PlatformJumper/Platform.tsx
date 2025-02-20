import React, { useEffect, useRef } from "react";

interface GameState {
  lastTime: number;
  playerX: number;
  playerY: number;
  speed: number;
}

interface Player {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
}

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 600;

const Platform: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestIdRef = useRef<number | null>(null);

  const gameState = useRef<GameState>({
    lastTime: 0,
    playerX: 100,
    playerY: 100,
    speed: 100, // pixels per second
  });

  const update = (deltaTime: number): void => {};

  const render = (ctx: CanvasRenderingContext2D): void => {
    const state = gameState.current;

    // Clear canvas with sky blue background
    ctx.fillStyle = "#87CEEB";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw player
    ctx.fillStyle = "yellow";
    ctx.fillRect(state.playerX, state.playerY, 50, 50);
  };

  const gameLoop = (timestamp: number): void => {
    const state = gameState.current;
    const deltaTime = (timestamp - state.lastTime) / 1000; // Convert to seconds
    state.lastTime = timestamp;

    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    update(deltaTime);
    render(ctx);

    // Continue the game loop
    requestIdRef.current = requestAnimationFrame(gameLoop);
  };

  useEffect(() => {
    // Start the game loop
    requestIdRef.current = requestAnimationFrame(gameLoop);

    // Cleanup function
    return () => {
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
      }
    };
  }, []);

  const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  };

  return (
    <div style={containerStyle}>
      <canvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        style={{ border: "1px solid #ccc" }}
      />
    </div>
  );
};

export default Platform;
