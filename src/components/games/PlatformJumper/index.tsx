import React, { ReactNode, useEffect, useRef } from "react";
import { GameState } from "@/components/games/PlatformJumper/types";
import {
  handleKeyDown,
  handleKeyUp,
} from "@/components/games/PlatformJumper/handleInput";
import bunnySprite from "./assets/bunny_idle_1.png";
import {
  createPlatforms,
  renderAllPlatforms as renderPlatforms,
  updatePlatforms,
} from "@/components/games/PlatformJumper/platform";
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  GRAVITY,
  PLAYER_ACCELERATION,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
  VIEWPORT_HEIGHT,
} from "@/components/games/PlatformJumper/constants";

function FluffyTower(): ReactNode {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gameState = useRef<GameState>({
    playerX: 100,
    playerY: 100,
    direction: "LEFT",
    speedX: 0, // pixels per second
    speedY: 0,
    isMoving: false,
    isJumping: false,
    platforms: createPlatforms(100, 300, 0),
  });

  function update(deltaTime: number): void {
    const state = gameState.current;
    const previousPlayerY = state.playerY;

    updatePlayerPosition(state, deltaTime);

    const collidingPlatforms = getCollidingPlatforms(gameState.current);

    if (collidingPlatforms.length > 0) {
      // Hit a platform
      if (state.playerY < VIEWPORT_HEIGHT * (2 / 3)) {
        gameState.current.platforms = updatePlatforms(state.platforms, 50);
      }
      state.speedY = 0;
      state.isJumping = false;
      const collidingPlatform = collidingPlatforms[0];
      state.playerY = collidingPlatform.y - PLAYER_HEIGHT + 1;
    } else if (gameState.current.playerY >= CANVAS_HEIGHT - PLAYER_HEIGHT) {
      // Hit the ground
      state.isJumping = false;
      state.speedY = 0;
      state.playerY = CANVAS_HEIGHT - PLAYER_HEIGHT;
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

    if (previousPlayerY - state.playerY > 0) {
      state.platforms = updatePlatforms(
        state.platforms,
        previousPlayerY - state.playerY,
      );
    }
  }

  function render(ctx: CanvasRenderingContext2D, state: GameState): void {
    renderBackground(ctx);
    renderPlayer(ctx, state);
    renderPlatforms(ctx, state.platforms);
  }

  useInputEventListeners(gameState.current);
  useGameLoop(canvasRef, gameState.current, update, render);

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

function updatePlayerPosition(gameState: GameState, deltaTime: number) {
  gameState.playerX += gameState.speedX * deltaTime;
  gameState.playerY += gameState.speedY * deltaTime;
}

function renderBackground(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "#005AA4";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function renderPlayer(ctx: CanvasRenderingContext2D, state: GameState) {
  function loadPlayerSprite(): CanvasImageSource {
    const player = new Image();
    player.src = bunnySprite;
    return player;
  }

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
}

function useGameLoop(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  gameState: GameState,
  update: (deltaTime: number) => void,
  render: (ctx: CanvasRenderingContext2D, state: GameState) => void,
) {
  const requestIdRef = useRef<number | null>(null);
  let lastTime = 0;

  function gameLoop(timestamp: number): void {
    const deltaTime = (timestamp - lastTime) / 1000; // Convert to seconds
    lastTime = timestamp;

    const ctx = canvasRef?.current?.getContext("2d");

    if (!ctx) {
      return;
    }

    update(deltaTime);
    render(ctx, gameState);

    requestIdRef.current = requestAnimationFrame(gameLoop);
  }

  useEffect(() => {
    requestIdRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (requestIdRef.current) {
        cancelAnimationFrame(requestIdRef.current);
      }
    };
  }, [canvasRef, update, render]);
}

function useInputEventListeners(gameState: GameState) {
  useEffect(() => {
    window.addEventListener("keydown", (e) => handleKeyDown(e, gameState));
    window.addEventListener("keyup", (e) => handleKeyUp(e, gameState));

    return () => {
      window.removeEventListener("keydown", (e) => handleKeyDown(e, gameState));
      window.removeEventListener("keyup", (e) => handleKeyUp(e, gameState));
    };
  }, []);
}

/**
 * Returns an array of platforms that the player is colliding with.
 */
function getCollidingPlatforms(state: GameState) {
  // Allow jumping through platforms
  if (state.speedY < 0) {
    return [];
  }

  return state.platforms.filter((platform) => {
    return (
      state.playerX < platform.x + platform.width &&
      state.playerX > platform.x &&
      state.playerY >= platform.y - PLAYER_HEIGHT && // På eller i plattformen
      state.playerY <= platform.y // Ikke lavere enn plattformen
    );
  });
}

export default FluffyTower;
