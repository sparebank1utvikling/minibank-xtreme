import "terminal.css";
import "./App.less";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import { FakturaSpill } from "./components/FakturaSpill/FakturaSpill";
import HowToSequence from "./components/HowToSequence/HowToSequence";
import PinSpill from "./components/PINSpill/PINSpill";
import { Leaderboard } from "@/components/Leaderboard/Leaderboard";
import { createFileForLeaderBoard } from "@/components/Leaderboard/LeaderBoardUtils";
import "./configure-styles";
import { LabyrintSpill } from "./components/LabyrintSpill/LabyrintSpill";

console.log(
  "[App.tsx]",
  `Hello world from Electron ${process.versions.electron}!`
);

export const BOARD_PIN_PATH = "/leaderboardPin";
export const BOARD_PAY_PATH = "/leaderboardPay";
export const BOARD_LABYRINT_PATH = "/leaderboardLabyrint";
export const GAME_TITLE_PIN = "PIN";
export const GAME_TITLE_PAY_INVOICE = "Pay invoice";
export const GAME_TITLE_LABYRINT = "Labyrint";
export const NUMPAD_HOME = "/";

function App() {
  const howToFaktura = [
    "Help! The bills just keeps piling up! In this game - as in real life, it's important to pay your invoices as fast as possible",
    "Use the numpad to enter the kid- and accountnumber, along with the total from the invoice that will appear on the screen",
    "Once the correct value has been filled in, it'll automatically jump to the next field so you can continue.",
    "Goal: Fill out 2 invoices as fast as possible. The timer will start when this screen disappears.",
  ];

  const howToPIN = [
    "Oh no! You seem to have forgotten the PIN-code to your cards!",
    "In this game you will be prompted with new PIN codes for your card. These will only be displayed on the screen for a limited time.",
    "Once they disappear, enter the PIN code you were given in the input field.",
    "Goal: Correctly remember and enter as many PINs as you can! The catch?  The time to remember get shorter each time! Are you attentive enough?",
  ];

  const fakturaFilePath = "./faktura.csv";
  const fakturaSort = false;
  const labyrintFilePath = "./labyrint.csv";
  const pinFilePath = "./pin.csv";
  const pinSort = true;

  //create files
  createFileForLeaderBoard(fakturaFilePath);
  createFileForLeaderBoard(pinFilePath);

  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Menu />} />
        <Route
          path={"/faktura/intro"}
          element={
            <HowToSequence howToPlayList={howToFaktura} gamePath={"/faktura"} />
          }
        />
        <Route path={"/faktura"} element={<FakturaSpill />} />
        <Route
          path={"/pin/intro"}
          element={<HowToSequence howToPlayList={howToPIN} gamePath={"/pin"} />}
        />
        <Route path={"/labyrint"} element={<LabyrintSpill />} />
        <Route
          path={BOARD_LABYRINT_PATH}
          element={
            <Leaderboard
              gameTitle={GAME_TITLE_LABYRINT}
              filePath={labyrintFilePath}
              registerNew={false}
              sortAscending={false}
              scoreMetric="level completed"
            />
          }
        />
        <Route
          path={`${BOARD_LABYRINT_PATH}/:score`}
          element={
            <Leaderboard
              gameTitle={GAME_TITLE_LABYRINT}
              filePath={labyrintFilePath}
              registerNew={true}
              sortAscending={false}
              scoreMetric="sec"
            />
          }
        />
        <Route path={"/pin"} element={<PinSpill />} />
        <Route
          path={BOARD_PAY_PATH}
          element={
            <Leaderboard
              gameTitle={GAME_TITLE_PAY_INVOICE}
              filePath={fakturaFilePath}
              registerNew={false}
              sortAscending={fakturaSort}
              scoreMetric="sec"
            />
          }
        />
        <Route
          path={`${BOARD_PAY_PATH}/:score`}
          element={
            <Leaderboard
              gameTitle={GAME_TITLE_PAY_INVOICE}
              filePath={fakturaFilePath}
              registerNew={true}
              sortAscending={fakturaSort}
              scoreMetric="sec"
            />
          }
        />
        <Route
          path={BOARD_PIN_PATH}
          element={
            <Leaderboard
              gameTitle={GAME_TITLE_PIN}
              filePath={pinFilePath}
              registerNew={false}
              sortAscending={pinSort}
              scoreMetric="pins"
            />
          }
        />
        <Route
          path={`${BOARD_PIN_PATH}/:score`}
          element={
            <Leaderboard
              gameTitle={GAME_TITLE_PIN}
              filePath={pinFilePath}
              registerNew={true}
              sortAscending={pinSort}
              scoreMetric="pins"
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
