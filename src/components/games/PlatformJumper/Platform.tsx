import React, { useEffect, useRef } from "react";
import { GameState, PlatformType } from "@/components/games/PlatformJumper/types";
import {handleKeyDown, handleKeyUp} from "@/components/games/PlatformJumper/handleInput";
import bunnySprite from "./assets/bunny_idle_1.png";
import {
  createPlatforms,
  renderAllPlatforms,
  renderPlatform,
  updatePlatforms
} from "@/components/games/PlatformJumper/PlatformObject";
import {VIEWPORT_HEIGHT, VIEWPORT_WIDTH} from "@/components/games/PlatformJumper/constants";

const CANVAS_WIDTH = VIEWPORT_WIDTH;
const CANVAS_HEIGHT = VIEWPORT_HEIGHT;
const PLAYER_WIDTH = 33;
const PLAYER_HEIGHT = 54;
const GRAVITY = 2000;
const PLAYER_ACELERATION = 500;

function loadPlayerSprite(): CanvasImageSource {
  const player = new Image();
  player.src = bunnySprite;
  return player;
}

const Platform: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // requestId that is returned from requestAnimationFrame is stored here
  // so that we can cancel it when unmounting the component
  const requestIdRef = useRef<number | null>(null);

  const gameState = useRef<GameState>({
    lastTime: 0,
    playerX: 100,
    playerY: 100,
    direction: 'LEFT',
    speedX: 0, // pixels per second
    speedY: 0,
    isMoving: false,
    isJumping: false,
    speed: 100, // pixels per second
  });


  const platformStates = useRef<PlatformType[]>([])

  const update = (deltaTime: number): void => {
    platformStates.current = updatePlatforms(platformStates.current, gameState.current.speed * deltaTime)
    const state = gameState.current;

    state.playerX += gameState.current.speedX * deltaTime;
    state.playerY += gameState.current.speedY * deltaTime;
    if (gameState.current.playerY >= CANVAS_HEIGHT - PLAYER_HEIGHT) {
      state.isJumping = false;
      state.speedY = 0;
      state.playerY = CANVAS_HEIGHT - PLAYER_HEIGHT;
    } else {
      state.speedY += GRAVITY * deltaTime;
    }
    if (state.isMoving) {
        if (state.direction === "LEFT") {
            state.speedX -= PLAYER_ACELERATION * deltaTime;
        } else {
            state.speedX += PLAYER_ACELERATION * deltaTime;
        }
    } else {
      if (!state.isJumping) {
        state.speedX = 0;
      }
    }
  };

  const render = (ctx: CanvasRenderingContext2D): void => {
    const state = gameState.current;

    // Clear canvas with sky blue background
    ctx.fillStyle = "#005AA4";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw player
    ctx.fillStyle = "yellow";
    ctx.drawImage(
      loadPlayerSprite(),
      state.playerX,
      state.playerY,
      PLAYER_WIDTH,
      PLAYER_HEIGHT,
    );
    // ctx.fillRect(state.playerX, state.playerY, PLAYER_WIDTH, PLAYER_HEIGHT);

    // Draw platforms
   // renderPlatform(ctx, {x: 150, y: 250, width: 50, color: "green"});
    renderAllPlatforms(ctx, platformStates.current)
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
    window.addEventListener("keydown", (e) => handleKeyDown(e, gameState));
    window.addEventListener("keyup", (e) => handleKeyUp(e, gameState));

    // Initialize platforms
    platformStates.current = createPlatforms(100, 100)

    // Cleanup function
    return () => {
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
      }
      window.removeEventListener("keydown", (e) => handleKeyDown(e, gameState));
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
