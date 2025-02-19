import SpareBankLogo from "@/assets/rgb_SpareBank1_neg.png";
import {Link, useNavigate} from "react-router-dom";
import {BOARD_LABYRINT_PATH, BOARD_MENU, BOARD_PAY_PATH, BOARD_PIN_PATH} from "@/utils/constants";
import React, {useEffect, useRef} from "react";


// Skammelige mengder copy-paste her 🤷🤷🤷
const LeaderboardMenu = () => {
  const leaderBoardMenu = useRef<HTMLDivElement>(null);
  //Initialization
  useEffect(() => {
    if (leaderBoardMenu.current != null) {
      leaderBoardMenu.current.focus();
    }
  }, []);
  const navigate = useNavigate();
  const handleInput = (event: React.KeyboardEvent) =>{
    switch (event.key) {
      case "7":
        navigate(BOARD_PIN_PATH);
        break;
      case "9":
        navigate(BOARD_PAY_PATH);
        break;
      case "4":
        navigate(BOARD_LABYRINT_PATH);
        break;
      case "3":
        navigate('/');
        break;
    }
  }
  return (
    <>
      <img
        src={SpareBankLogo}
        alt="Sparebank 1's logo"
        className="header-logo"
      />
      <div
        className="menu"
        tabIndex={0}
        onKeyUp={(event) => handleInput(event)}
        ref={leaderBoardMenu}
      >
        <div className={"menu-title"}>
          <h1>MINIBANK XTREME</h1>
        </div>
        <h2>LEADERBOARDS</h2>
        <p className="menu-description">
          Select by pressing the corresponding number on the numpad
        </p>
        <div className="menu-grid">
          <div className={"menu-item--left menu-button"}>
            {" "}
            <h3>
              <Link to={BOARD_PIN_PATH}>7) Top 30 - New PIN code</Link>
            </h3>
          </div>
          <div className={"menu-item--right menu-button"}>
            <h3>
              <Link to={BOARD_PAY_PATH}>9) Top 30 - Pay invoice</Link>
            </h3>
          </div>
          <div className={"menu-item--left menu-button"}>
            {" "}
            <h3>
              <Link to={BOARD_LABYRINT_PATH}>4) Top 30 - Maze</Link>
            </h3>
          </div>
          <div className={"menu-item--right menu-button"}>
            {" "}
            <h3>
              <Link to={
                BOARD_MENU // TODO bytt ut lenken og teksten med det som passer ditt eget spill
              }>6) Top 30 - DITT NYE SPILL</Link>
            </h3>
          </div>
          <div className={"menu-item--left menu-button"}>
            <h3>
              <Link to={BOARD_MENU}>1) Top 30 - Nytt spill 2</Link>
            </h3>
          </div>
          <div className={"menu-item--right menu-button"}>
            {" "}
            <h3>
              <Link to={'/'}>3) Main Menu</Link>
            </h3>
          </div>
        </div>
      </div>
    </>
  )
}
export default LeaderboardMenu