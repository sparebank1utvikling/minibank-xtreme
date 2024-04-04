import { Link, useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import { BOARD_PAY_PATH, BOARD_PIN_PATH } from "@/App";
import SpareBankLogo from "../../assets/rgb_SpareBank1_neg.png";

const Menu = () => {
  const mainMenu = useRef<HTMLDivElement>(null);
  //Initialization
  useEffect(() => {
    if (mainMenu.current != null) {
      mainMenu.current.focus();
    }
  }, []);
  const navigate = useNavigate();
  const handleInput = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "7":
        navigate("/pin/intro");
        break;
      case "9":
        navigate("/faktura/intro");
        break;
      case "1":
        navigate(BOARD_PIN_PATH);
        break;
      case "3":
        navigate(BOARD_PAY_PATH);
        break;
    }
  };
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
        ref={mainMenu}
      >
        <div className={"menu-title"}>
          <h1>MINIBANK XTREME</h1>
        </div>
        <p className="menu-description">
          Select by pressing the corresponding number on the numpad
        </p>
        <div className="menu-grid">
          <div className={"menu-item--left menu-button"}>
            {" "}
            <h3>
              <Link to={"/pin/intro"}>7) New PIN code</Link>
            </h3>
          </div>
          <div className={"menu-item--right menu-button"}>
            <h3>
              <Link to={"/faktura/intro"}>9) Pay invoice</Link>
            </h3>
          </div>
          <div className={"menu-item--left menu-button"}>
            <h3>
              <Link to={BOARD_PIN_PATH}>1) Top 30 - New PIN code</Link>
            </h3>
          </div>
          <div className={"menu-item--right menu-button"}>
            {" "}
            <h3>
              <Link to={BOARD_PAY_PATH}>3) Top 30 - Pay invoice</Link>
            </h3>
          </div>
        </div>
      </div>
      {/* <p><Link to={`${BOARD_PAY_PATH}/9`}>Leaderboard pay new</Link></p> <p><Link to={`${BOARD_PIN_PATH}/9`}>Leaderboard pin new</Link></p> */}
      {/* kommenter inn det over for å legge til ting i scoreboard uten spille spillene */}
    </>
  );
};

export default Menu;
