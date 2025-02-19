import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import styles from './CountdownBar.module.less';

interface CountdownBarProps {
  startTime: number;
  onZero?: () => void;
}

export interface CountdownBarHandle {
  start: () => void;
  reset: () => void;
  pause: () => void;
  resume: () => void;
}

export const CountdownBar = forwardRef<CountdownBarHandle, CountdownBarProps>(({ startTime, onZero }, ref) => {
  const [count, setCount] = useState(startTime);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(true);
  const [resetting, setResetting] = useState(false);

  useImperativeHandle(ref, () => ({
    start() {
      setCount(startTime);
      setPaused(false);
    },
    reset() {
      setResetting(true);
      setTimeout(() => {
        setCount(startTime);
        setGameOver(false);
        setPaused(false);
        setResetting(false);
      }, 3000);
    },
    pause() {
      setPaused(true);
    },
    resume() {
      setPaused(false);
    }
  }));

  useEffect(() => {
    if (count > 0 && !paused && !resetting) {
      const timer = setInterval(() => {
        setCount(prevCount => prevCount - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (count === 0) {
      setGameOver(true);
      if (onZero) {
        onZero();
      }
    }
  }, [count, paused, resetting, onZero]);

  useEffect(() => {
    if (gameOver) {
      console.log("Game Over!");
      // Additional logic for game over can be added here
    }
  }, [gameOver]);

  const getColor = () => {
    const percentage = count / startTime;
    if (percentage > 0.75) return '#4caf50'; // Green
    if (percentage > 0.50) return '#ffeb3b'; // Yellow
    if (percentage > 0.25) return '#ff9800'; // Orange
    return '#f44336'; // Red
  };

  return (
    <div className={styles.countdownContainer}>
      <div
        className={styles.countdownBar}
        style={{
          width: resetting ? '100%' : `${(count / startTime) * 100}%`,
          backgroundColor: getColor(),
          transition: resetting ? 'width 3s linear, background-color 3s linear' : 'width 1s linear, background-color 5s linear'
        }}
      ></div>
      <div className={styles.countdownText}>{count > 0 ? count : "Game Over"}</div>
    </div>
  );
});
