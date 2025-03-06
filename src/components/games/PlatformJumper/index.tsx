import React, { ReactNode, useEffect, useRef } from "react";
import {
  GameState,
  PlatformType,
} from "@/components/games/PlatformJumper/types";
import {
  handleKeyDown,
  handleKeyUp,
} from "@/components/games/PlatformJumper/handleInput";
import bunnySprite from "./assets/bunny_idle_1.png";
import {
  createPlatforms,
  renderAllPlatforms,
  updatePlatforms,
} from "@/components/games/PlatformJumper/platform";
import {
  VIEWPORT_HEIGHT,
  VIEWPORT_WIDTH,
} from "@/components/games/PlatformJumper/constants";

const CANVAS_WIDTH = VIEWPORT_WIDTH;
const CANVAS_HEIGHT = VIEWPORT_HEIGHT;
const PLAYER_WIDTH = 33;
const PLAYER_HEIGHT = 54;
const GRAVITY = 2000;
const PLAYER_ACCELERATION = 1000;

function loadPlayerSprite(): CanvasImageSource {
  const player = new Image();
  player.src = bunnySprite;
  return player;
}

function FluffyTower(): ReactNode {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestIdRef = useRef<number | null>(null);

  const gameState = useRef<GameState>({
    lastTime: 0,
    playerX: 100,
    playerY: 100,
    direction: "LEFT",
    speedX: 0, // pixels per second
    speedY: 0,
    isMoving: false,
    isJumping: false,
    speed: 100, // pixels per second
    initialized: false,
  });

  const platformStates = useRef<PlatformType[]>([]);
  platformStates.current = createPlatforms(100, 300, 0);

  function getPlatformCollision() {
    const state = gameState.current;
    if (state.speedY < 0) {
      return [];
    }
    return platformStates.current.filter((platform) => {
      return (
        state.playerX < platform.x + platform.width &&
        state.playerX > platform.x &&
        state.playerY >= platform.y - PLAYER_HEIGHT && // På eller i plattformen
        state.playerY <= platform.y
      ); // Ikke lavere enn plattformen
    });
  }

  function update(deltaTime: number): void {
    const state = gameState.current;
    const oldPlayerY = state.playerY;
    state.playerX += gameState.current.speedX * deltaTime;
    state.playerY += gameState.current.speedY * deltaTime;

    const collision = getPlatformCollision();
    if (state.initialized && collision.length > 0) {
      // Hit a platform
      if (state.playerY < VIEWPORT_HEIGHT * (2 / 3)) {
        platformStates.current = updatePlatforms(platformStates.current, 50);
      }
      state.speedY = 0;
      state.isJumping = false;
      const collidingPlatform = collision[0];
      state.playerY = collidingPlatform.y - PLAYER_HEIGHT + 1;
    } else if (gameState.current.playerY >= CANVAS_HEIGHT - PLAYER_HEIGHT) {
      // Hit the ground
      state.isJumping = false;
      state.speedY = 0;
      state.playerY = CANVAS_HEIGHT - PLAYER_HEIGHT;
      state.initialized = true;
    } else {
      // Falling
      state.speedY += GRAVITY * deltaTime;
      state.isJumping = true;
    }
    if (state.isMoving) {
      if (state.direction === "LEFT") {
        state.speedX -= PLAYER_ACCELERATION * deltaTime;
      } else {
        state.speedX += PLAYER_ACCELERATION * deltaTime;
      }
    } else {
      if (!state.isJumping) {
        state.speedX = 0;
      }
    }

    if (oldPlayerY - state.playerY > 0 || !state.initialized) {
      platformStates.current = updatePlatforms(
        platformStates.current,
        oldPlayerY - state.playerY,
      );
    }
  }

  function render(ctx: CanvasRenderingContext2D): void {
    const state = gameState.current;

    ctx.fillStyle = "#005AA4";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw player
    ctx.save();

    if (state.direction === "RIGHT") {
      // Flip context horizontally for right-facing sprite
      ctx.scale(-1, 1);
      ctx.drawImage(
        loadPlayerSprite(),
        -state.playerX - PLAYER_WIDTH, // Adjust x position when flipped
        state.playerY,
        PLAYER_WIDTH,
        PLAYER_HEIGHT,
      );
    } else {
      // Draw normally for left-facing sprite
      ctx.drawImage(
        loadPlayerSprite(),
        state.playerX,
        state.playerY,
        PLAYER_WIDTH,
        PLAYER_HEIGHT,
      );
    }

    ctx.restore();

    renderAllPlatforms(ctx, platformStates.current);
  }

  function gameLoop(timestamp: number): void {
    const state = gameState.current;
    const deltaTime = (timestamp - state.lastTime) / 1000; // Convert to seconds
    state.lastTime = timestamp;

    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    update(deltaTime);
    render(ctx);

    requestIdRef.current = requestAnimationFrame(gameLoop);
  }

  useInputEventListeners(gameState.current);
  useGameLoop(requestIdRef, gameLoop);

  const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  };

  return (
    <div style={containerStyle}>
      <canvas ref={canvasRef} width={CANVAS_WIDTH} height={CANVAS_HEIGHT} />
    </div>
  );
}

function useGameLoop(
  requestIdRef: React.MutableRefObject<number | null>,
  gameLoop: (timestamp: number) => void,
) {
  useEffect(() => {
    requestIdRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
      }
    };
  }, []);
}

function useInputEventListeners(gameState: GameState) {
  useEffect(() => {
    window.addEventListener("keydown", (e) => handleKeyDown(e, gameState));
    window.addEventListener("keyup", (e) => handleKeyUp(e, gameState));

    return () => {
      window.removeEventListener("keydown", (e) => handleKeyDown(e, gameState));
    };
  }, []);
}

export default FluffyTower;
