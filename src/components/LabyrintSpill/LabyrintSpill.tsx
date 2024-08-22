import styles from './LabyrintSpill.module.less';
import { useEffect, useRef, useState } from "react";
import { useKeypad } from "@/components/LabyrintSpill/useKeypad";
import { CountdownBar, CountdownBarHandle } from "@/components/LabyrintSpill/CountdownBar";

const LOCAL_STORAGE_KEY = 'Labyrint-disk'
const BEGYNT_PTR = 'vR6g$';
const VUNNET_PTR = 'C6dXu';

export const LabyrintSpill = () => {
  const [gameState, setGameState] = useState('Laster spillet...');
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(3);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const countdownRef = useRef<CountdownBarHandle>(null);

  useKeypad();

  useEffect(() => {
    if (loading) {
      const timer = setInterval(() => {
        setCount(prevCount => prevCount - 1);
      }, 1000);

      const timeout = setTimeout(() => {
        setLoading(false);
        clearInterval(timer);
      }, 3000);

      return () => {
        clearInterval(timer);
        clearTimeout(timeout);
      };
    }
  }, [loading]);

  useEffect(() => {
    if (gameState === 'Du klarte det!') {
      countdownRef.current?.pause();
      const delay = setTimeout(() => {
        setLevel(level + 1);
        setLoading(true);
        setCount(3);
        setGameState('Laster spillet...');
      }, 2000);
    }
  }, [gameState]);

  useEffect(() => {
    // Load the todos on mount
    const gameStateString = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (gameStateString) {
      if (gameStateString === BEGYNT_PTR) {
        setGameState('Prøv å finne veien ut!');
      }
      console.log("gameState: ", gameStateString);
    }

    // Respond to the `storage` event
    function storageEventHandler(event: StorageEvent) {
      if (event.key === LOCAL_STORAGE_KEY && event.newValue) {
        if (event.newValue === BEGYNT_PTR) {
          setGameState('Prøv å finne veien ut!');
        } else if (event.newValue === VUNNET_PTR) {
          setGameState('Du klarte det!');
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
  }, []);

  return (
    <>
      <div className={styles.wrapper}>
        { loading
          ? <div className={styles.countdown}>
              <div className={styles.count}>{count}</div>
            </div>
          : <>
              <iframe
                className={styles.gameEmbed}
                src="/labyrint.html"
                allow="fullscreen; gamepad; autoplay"
                frameBorder="0"
              />
              <CountdownBar startTime={30} ref={countdownRef} onZero={() => {
                setGameOver(true)
                setGameState('Tiden er ute!')
              }} />
          </>
        }
      </div>
      <h1 style={{ display: 'inline-block' }}>Level {level}</h1>
      <p style={{ color: 'white' }}>{gameState}</p>
      <p style={{ color: 'white' }}>Bruk piltastene for å bevege deg. Mellomrom eller 0 for å hoppe.</p>
    </>
  );
}