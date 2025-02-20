import React, { useEffect, useRef } from "react";
import {GameState, Player} from "@/components/games/PlatformJumper/types";
import {handleInput} from "@/components/games/PlatformJumper/handleInput";

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 1000;
const GRAVITY = 1000;

const Platform: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // requestId that is returned from requestAnimationFrame is stored here
  // so that we can cancel it when unmounting the component
  const requestIdRef = useRef<number | null>(null);

  const gameState = useRef<GameState>({
    lastTime: 0,
    playerX: 100,
    playerY: 100,
    speedX: 0, // pixels per second
    speedY: 0
  });

  const update = (deltaTime: number): void => {
    gameState.current.speedY += GRAVITY * deltaTime;
    gameState.current.playerX += gameState.current.speedX * deltaTime;
    gameState.current.playerY += gameState.current.speedY * deltaTime;
  };

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

    // Add event listener for keypresses
    window.addEventListener("keydown", e => handleInput(e, gameState));

    // Cleanup function
    return () => {
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
      }
      window.removeEventListener("keydown", e => handleInput(e, gameState))
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
