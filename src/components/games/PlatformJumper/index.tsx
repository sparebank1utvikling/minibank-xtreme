import React, { ReactNode, useEffect, useRef, useState } from "react";
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
    playerX: CANVAS_WIDTH / 2 - PLAYER_WIDTH,
    playerY: CANVAS_HEIGHT - PLAYER_HEIGHT * 4,
    cameraX: 0,
    cameraY: 0,
    direction: "LEFT",
    speedX: 0, // pixels per second
    speedY: 0,
    isMovementInput: false,
    isJumping: false,
    platforms: createPlatforms(100, 230, 0),
  });

  function update(deltaTime: number): void {
    const state = gameState.current;

    updatePlayerPosition(state, deltaTime);
    updateCameraPosition(state, deltaTime);

    const isStandingOnPlatform = handlePlatformCollision(state);

    // handle gravity
    if (!isStandingOnPlatform) {
      state.speedY += GRAVITY * deltaTime;
      state.isJumping = true;
    }

    // det skal være GAMEOVER
    // TODO
    if (state.playerY >= CANVAS_HEIGHT * 2) {
      state.isJumping = false;
      state.speedY = 0;
      state.playerX = CANVAS_WIDTH / 2 - PLAYER_WIDTH; // Reset player position
      state.playerY = CANVAS_HEIGHT - PLAYER_HEIGHT * 4;
      state.platforms = createPlatforms(100, 230, 0); // Reset platforms
    }

    // set player speed based on input
    if (state.isMovementInput) {
      const direction = state.direction === "LEFT" ? -1 : 1;
      state.speedX += PLAYER_ACCELERATION * direction * deltaTime;
    } else if (!state.isJumping) {
      state.speedX = 0;
    }
  }

  /**
   * Update camera position to center on the player with damping for smooth movement
   * @param state Game state
   * @param deltaTime Time since last update in seconds (needed for time-based damping)
   */
  function updateCameraPosition(state: GameState, deltaTime: number) {
    const targetCameraX = state.playerX - CANVAS_WIDTH / 2 + PLAYER_WIDTH / 2;

    const horizontalDamping = 5;
    const verticalDamping = 3;

    state.cameraX +=
      (targetCameraX - state.cameraX) * horizontalDamping * deltaTime;

    // Only update vertical camera position when jumping up
    // if (state.speedY < 0) {
    const targetCameraY = state.playerY - CANVAS_HEIGHT / 2 + PLAYER_HEIGHT / 2;
    state.cameraY +=
      (targetCameraY - state.cameraY) * verticalDamping * deltaTime;
    // } else if (state.playerY < state.cameraY + CANVAS_HEIGHT / 4) {
    // Buffer zone when player is too high in the viewport while falling
    // const targetCameraY = state.playerY - CANVAS_HEIGHT / 4;
    // state.cameraY +=
    //   (targetCameraY - state.cameraY) * verticalDamping * deltaTime;
    // }
  }

  /**
   * Returns true if player is standing on a platform
   */
  function handlePlatformCollision(state: GameState) {
    const collidingPlatform = getCollidingPlatform(gameState.current);
    if (state.speedY < 0 || !collidingPlatform) {
      return false;
    }

    state.speedY = 0;
    state.isJumping = false;
    state.playerY = collidingPlatform.y - PLAYER_HEIGHT;
    return true;
  }

  function render(ctx: CanvasRenderingContext2D, state: GameState): void {
    renderBackground(ctx);

    ctx.save();

    // Apply camera transform - translate everything by negative camera position
    ctx.translate(-state.cameraX, -state.cameraY);

    renderPlayer(ctx, state);
    renderPlatforms(ctx, state.platforms);

    ctx.restore();

    renderDebugInfo(ctx, state);
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

  renderPlayerHitbox(ctx, state);
}

function renderPlayerHitbox(ctx: CanvasRenderingContext2D, state: GameState) {
  const debug = false;
  if (debug) {
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;
    ctx.strokeRect(state.playerX, state.playerY, PLAYER_WIDTH, PLAYER_HEIGHT);
  }
}

/**
 * Renders a debug information box in the top-left corner
 */
function renderDebugInfo(ctx: CanvasRenderingContext2D, state: GameState) {
  const padding = 10;
  const lineHeight = 18;

  // Enable the debug display
  const debug = true;

  if (debug) {
    // Format values to be more readable (fixed decimal places)
    const playerX = state.playerX.toFixed(1);
    const playerY = state.playerY.toFixed(1);
    const cameraX = state.cameraX.toFixed(1);
    const cameraY = state.cameraY.toFixed(1);
    const speedX = state.speedX.toFixed(2);
    const speedY = state.speedY.toFixed(2);

    // Create debug text lines
    const debugInfo = [
      `Player: (${playerX}, ${playerY})`,
      `Camera: (${cameraX}, ${cameraY})`,
      `Speed: (${speedX}, ${speedY})`,
      `Direction: ${state.direction}`,
      `Jumping: ${state.isJumping}`,
      `Movement Input: ${state.isMovementInput}`,
      `Platforms: ${state.platforms.length}`,
    ];

    // Draw semi-transparent background for debug panel
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, 220, debugInfo.length * lineHeight + padding * 2);

    // Draw debug text
    ctx.fillStyle = "white";
    ctx.font = "14px monospace";
    ctx.textBaseline = "top";

    debugInfo.forEach((line, index) => {
      ctx.fillText(line, padding, padding + index * lineHeight);
    });
  }
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

function FluffyTowerWasm() {
  useEffect(() => {
    const scriptSrc = `/mq_js_bundle.js`;

    const script = document.createElement("script");
    script.src = scriptSrc;
    script.async = true;

    script.onload = () => {
      if (typeof window.load === "function") {
        window.load("fluffytower.wasm");
      }
    };

    // Add script to document
    document.body.appendChild(script);

    // Cleanup
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <canvas
      id="glcanvas"
      tabIndex={1}
      style={{
        margin: "0px",
        padding: "0px",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "absolute",
        background: "black",
        zIndex: "0",
        left: "0",
      }}
    ></canvas>
  );
}

export default FluffyTowerWasm;
