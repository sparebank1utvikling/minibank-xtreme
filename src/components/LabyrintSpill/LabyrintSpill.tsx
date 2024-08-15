import styles from './LabyrintSpill.module.less';
import { useEffect, useState } from "react";

const LOCAL_STORAGE_KEY = 'Labyrint-disk'

export const LabyrintSpill = () => {
  const [gameState, setGameState] = useState('Laster spillet...');

  useEffect(() => {
    // Load the todos on mount
    const gameStateString = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (gameStateString) {
      if (gameStateString === 'xjkT*') {
        setGameState('Prøv å finne veien ut!')
      }
      console.log("gameState: ", gameStateString)
    }
    // Respond to the `storage` event
    function storageEventHandler(event: StorageEvent) {
      if (event.key === LOCAL_STORAGE_KEY && event.newValue) {
        if (event.newValue === 'yJ:o8') {
          setGameState('Du klarte det!')
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
        <iframe
          className={styles.gameEmbed}
          src="/labyrint.html"
          allow="fullscreen; gamepad; autoplay"
          frameBorder="0"
        >
        </iframe>
      </div>
      <p>{gameState}</p>
      <p>Bruk piltastene for å bevege deg. Space for å hoppe.</p>
    </>
  );
}