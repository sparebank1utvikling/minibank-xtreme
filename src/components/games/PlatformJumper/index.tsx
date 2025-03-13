import React, { ReactNode, useEffect, useRef } from "react";
import { GameState } from "@/components/games/PlatformJumper/types";
import {
  handleKeyDown,
  handleKeyUp,
} from "@/components/games/PlatformJumper/handleInput";
import bunnySprite from "./assets/bunny_idle_1.png";
import {
  createPlatforms,
  getCollidingPlatforms as getCollidingPlatform,
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
} from "@/components/games/PlatformJumper/constants";

function FluffyTower(): ReactNode {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gameState = useRef<GameState>({
    playerX: 100,
    playerY: 100,
    direction: "LEFT",
    speedX: 0, // pixels per second
    speedY: 0,
    isMovementInput: false,
    isJumping: false,
    platforms: createPlatforms(100, 300, 0),
  });

  function update(deltaTime: number): void {
    const state = gameState.current;
    const previousPlayerY = state.playerY;

    updatePlayerPosition(state, deltaTime);

    const isStandingOnPlatform = handlePlatformCollision(state);

    // handle gravity
    if (!isStandingOnPlatform) {
      // Falling
      state.speedY += GRAVITY * deltaTime;
      state.isJumping = true;
    }

    // det skal være GAMEOVER
    // TODO
    if (gameState.current.playerY >= CANVAS_HEIGHT - PLAYER_HEIGHT) {
      // Hit the ground
      state.isJumping = false;
      state.speedY = 0;
      state.playerY = CANVAS_HEIGHT - PLAYER_HEIGHT;
    }

    // set player speed based on input
    if (state.isMovementInput) {
      const direction = state.direction === "LEFT" ? -1 : 1;
      state.speedX += PLAYER_ACCELERATION * direction * deltaTime;
    } else if (!state.isJumping) {
      state.speedX = 0;
    }

    // move all platforms down when player is moving up
    if (state.speedY < 0) {
      state.platforms = updatePlatforms(
        state.platforms,
        previousPlayerY - state.playerY,
      );
    }
  }

  /**
   * Returns true if player is stanfind on a platform
   */
  function handlePlatformCollision(state: GameState) {
    const collidingPlatform = getCollidingPlatform(gameState.current);
    if (state.speedY <= 0 || !collidingPlatform) {
      return false;
    }

    state.speedY = 0;
    state.isJumping = false;
    state.playerY = collidingPlatform.y - PLAYER_HEIGHT;
    return true;
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

export default FluffyTower;
