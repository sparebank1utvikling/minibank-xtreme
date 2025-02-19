import { useEffect } from "react";

export function useKeypad() {
  function handleKeyDown (event: KeyboardEvent) {
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
  function handleKeyUp (event: KeyboardEvent) {
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
}