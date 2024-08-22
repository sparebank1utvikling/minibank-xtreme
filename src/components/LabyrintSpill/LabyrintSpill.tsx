import styles from './LabyrintSpill.module.less';
import { useEffect, useState } from "react";

const LOCAL_STORAGE_KEY = 'Labyrint-disk'
const BEGYNT_PTR = 'vR6g$';
const VUNNET_PTR = 'C6dXu';

export const LabyrintSpill = () => {
  const [gameState, setGameState] = useState('Laster spillet...');

  function handleKeyDown (event) {
    switch (event.key) {
      case '8':
        window.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowUp' }))
        break;
      case '2':
        event.stopImmediatePropagation(); // unngå å lagre tilstand
        window.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowDown' }))
        break;
      case '4':
        event.stopImmediatePropagation(); // unngå å laste tilstand
        window.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowLeft' }))
        break;
      case '6':
        window.dispatchEvent(new KeyboardEvent('keydown', { code: 'ArrowRight' }))
        break;
      case '0':
        window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }))
        break;
    }
  }
  function handleKeyUp (event) {
    switch (event.key) {
      case '8':
        window.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowUp' }))
        break;
      case '2':
        window.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowDown' }))
        break;
      case '4':
        window.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowLeft' }))
        break;
      case '6':
        window.dispatchEvent(new KeyboardEvent('keyup', { code: 'ArrowRight' }))
        break;
      case '0':
        window.dispatchEvent(new KeyboardEvent('keyup', { code: 'Space' }))
        break;
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

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
        <iframe
          className={styles.gameEmbed}
          src="/labyrint.html"
          allow="fullscreen; gamepad; autoplay"
          frameBorder="0"
        >
        </iframe>
      </div>
      <p style={{color: 'white'}}>{gameState}</p>
      <p style={{color: 'white'}}>Bruk piltastene for å bevege deg. Mellomrom eller 0 for å hoppe.</p>
    </>
  );
}