import styles from "./SpaceInvadersSpill.module.css";
import {useState} from "react";
import {NUMPAD_HOME} from "@/utils/constants";
import {useNavigate} from "react-router-dom";

export const SpaceInvadersSpill = () => {
  const [playing, setPlaying] = useState(false);
  const navigate = useNavigate();

  const [playerPlacement, setPlayerPlacement] = useState(0);

  // Press ESC to return to main menu
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setPlaying(false);
      navigate(NUMPAD_HOME);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "6" || event.key === "ArrowRight") {
      // Setting the css var --player-placement 10 pixels to the right
      const movementSpeed = window.getComputedStyle(document.body).getPropertyValue("--player-movement-speed").replace("px", "");
      const playerPlacement = window.getComputedStyle(document.body).getPropertyValue("--player-placement").replace("px", "");

      console.log(movementSpeed + playerPlacement);

      document.documentElement.style.setProperty("--player-placement", movementSpeed + playerPlacement);
    }
  });

  if (playing) {
    return (
      <div className={styles.canvas}>
        <div className={styles.player}></div>
      </div>
    )

  }
  return (
    <div id="canvas" className={styles.canvas}>
      <h1>Space Invaders</h1>
      <button onClick={() => setPlaying(true)}>START</button>
    </div>
  )
}