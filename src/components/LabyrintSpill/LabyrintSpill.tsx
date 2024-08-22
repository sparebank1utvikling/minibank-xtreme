import styles from './LabyrintSpill.module.less';
import { useEffect, useRef, useState } from "react";
import { useKeypad } from "@/components/LabyrintSpill/useKeypad";
import { CountdownBar, CountdownBarHandle } from "@/components/LabyrintSpill/CountdownBar";

const LOCAL_STORAGE_KEY = 'Labyrint-disk'
const BEGYNT_PTR = 'vR6g$';
const VUNNET_PTR = 'C6dXu';

enum GameState {
  LOADING = 'Laster spillet...',
  PLAYING = 'Prøv å finne veien ut!',
  WON = 'Du klarte det!',
  GAME_OVER = 'Tiden er ute!'
}

export const LabyrintSpill = () => {
  const [gameState, setGameState] = useState(GameState.LOADING);
  const [count, setCount] = useState(3);
  const [level, setLevel] = useState(1);
  const countdownRef = useRef<CountdownBarHandle>(null);

  useKeypad();

  useEffect(() => {
    if (gameState === GameState.LOADING) {
      const timer = setInterval(() => {
        setCount(prevCount => prevCount - 1);
      }, 1000);

      const timeout = setTimeout(() => {
        setGameState(GameState.PLAYING);
        countdownRef.current?.start();
        clearInterval(timer);
      }, 3000);

      return () => {
        clearInterval(timer);
        clearTimeout(timeout);
      };
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState === GameState.WON) {
      countdownRef.current?.pause();
      const delay = setTimeout(() => {
        setLevel(level + 1);
        setGameState(GameState.LOADING);
        setCount(3);
        countdownRef.current?.reset();
      }, 2000);

      return () => clearTimeout(delay);
    }

  }, [gameState]);

  useEffect(() => {
    // Respond to the `storage` event
    function storageEventHandler(event: StorageEvent) {
      if (event.key === LOCAL_STORAGE_KEY && event.newValue) {
        if (event.newValue === BEGYNT_PTR) {
          setGameState(GameState.PLAYING);
        } else if (event.newValue === VUNNET_PTR) {
          setGameState(GameState.WON);
        }
        console.log("gameState: ", event.newValue)
      }
    }

    // Hook up the event handler
    window.addEventListener("storage", storageEventHandler);
    return () => {
      // Remove the handler when the component unmounts
      window.removeEventListener("storage", storageEventHandler);
    };
  }, [count]);

  return (
    <>
      <div className={styles.wrapper}>
        { gameState === GameState.LOADING
          ? <div className={styles.countdown}>
              <div className={styles.count}>{count}</div>
            </div>
          : gameState !== GameState.GAME_OVER
            ? <iframe
                className={styles.gameEmbed}
                src="/labyrint.html"
                allow="fullscreen; gamepad; autoplay"
                frameBorder="0"
              />
            : <div className={styles.gameOver}>
                <h1>Game Over!</h1>
              </div>
        }
      </div>
      <CountdownBar
        startTime={30}
        ref={countdownRef}
        onZero={() => {
          const delay = setTimeout(() => {
            setGameState(GameState.GAME_OVER);
          }, 1000);

          return () => clearTimeout(delay);
        }}
      />
      <h1 style={{ display: 'inline-block' }}>Level {level}</h1>
      <p style={{ color: 'white' }}>{gameState}</p>
      <p style={{ color: 'white' }}>Bruk piltastene for å bevege deg. Mellomrom eller 0 for å hoppe.</p>
    </>
  );
}