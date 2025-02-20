import "terminal.css";
import "./App.less";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./components/Menu/Menu";
import { FakturaSpill } from "@/components/games/FakturaSpill/FakturaSpill";
import HowToSequence from "./components/HowToSequence/HowToSequence";
import PinSpill from "@/components/games/PINSpill/PINSpill";
import { Leaderboard } from "@/components/Leaderboard/Leaderboard";
import { createFileForLeaderBoard } from "@/components/Leaderboard/LeaderBoardUtils";
import "./configure-styles";
import { LabyrintSpill } from "@/components/games/LabyrintSpill/LabyrintSpill";
import {
  BOARD_LABYRINT_PATH, BOARD_MENU,
  BOARD_PAY_PATH,
  BOARD_PIN_PATH,
  GAME_TITLE_LABYRINT,
  GAME_TITLE_PAY_INVOICE,
  GAME_TITLE_PIN, howToFaktura, howToPIN
} from "@/utils/constants";
import LeaderboardMenu from "@/components/Leaderboard/LeaderboardMenu";
import {SpaceInvadersSpill} from "@/components/games/SpaceInvadersSpill/SpaceInvadersSpill";


function App() {
  const fakturaFilePath = "./faktura.csv";
  const fakturaSort = false;
  const labyrintFilePath = "./labyrint.csv";
  const pinFilePath = "./pin.csv";
  const pinSort = true;

  //create files
  createFileForLeaderBoard(fakturaFilePath);
  createFileForLeaderBoard(pinFilePath);
  // TODO legg inn route til ditt nye spill og how-to her
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
        <Route path={"/space-invaders"} element={<SpaceInvadersSpill />} />
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
        <Route
          path={BOARD_MENU}
          element={<LeaderboardMenu/>}
          />
      </Routes>
    </Router>
  );
}

export default App;
