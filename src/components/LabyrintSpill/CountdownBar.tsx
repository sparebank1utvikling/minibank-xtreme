import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import styles from './CountdownBar.module.less';

interface CountdownBarProps {
  startTime: number;
  onZero?: () => void;
}

export interface CountdownBarHandle {
  reset: () => void;
  pause: () => void;
  resume: () => void;
}

export const CountdownBar = forwardRef<CountdownBarHandle, CountdownBarProps>(({ startTime, onZero }, ref) => {
  const [count, setCount] = useState(startTime);
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);

  useImperativeHandle(ref, () => ({
    reset() {
      setCount(startTime);
      setGameOver(false);
      setPaused(false);
    },
    pause() {
      setPaused(true);
    },
    resume() {
      setPaused(false);
    }
  }));

  useEffect(() => {
    if (count > 0 && !paused) {
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
  }, [count, paused, onZero]);

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
      <div className={styles.countdownBar} style={{ width: `${(count / startTime) * 100}%`, backgroundColor: getColor() }}></div>
      <div className={styles.countdownText}>{count > 0 ? count : "Game Over"}</div>
    </div>
  );
});