import styles from "./SpaceInvadersSpill.module.css";
import {useState} from "react";
import {NUMPAD_HOME} from "@/utils/constants";
import {useNavigate} from "react-router-dom";

export const SpaceInvadersSpill = () => {
  const [playing, setPlaying] = useState(false);
  const navigate = useNavigate();

  // Press ESC to return to main menu
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setPlaying(false);
      navigate(NUMPAD_HOME);
    }
  });

  if (playing) {
    return (
      <div className={styles.canvas}>
        <h1>GAME OVER</h1>
      </div>
    )

  }
  return (
    <div className={styles.canvas}>
      <h1>Space Invaders</h1>
      <button onClick={() => setPlaying(true)}>START</button>
    </div>
  )
}