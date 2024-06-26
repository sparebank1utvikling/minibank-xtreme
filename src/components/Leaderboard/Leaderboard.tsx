import "./leaderboard.less";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  readCSVPromise,
  ScoreData,
} from "@/components/Leaderboard/LeaderBoardUtils";
import { LeaderboardForm } from "@/components/Leaderboard/LeaderboardForm";
import { LeaderBoardRender } from "@/components/Leaderboard/LeaderBoardRender";

interface Props {
  gameTitle: string;
  filePath: string;
  registerNew: boolean;
  sortAscending: boolean;
  scoreMetric: string;
}

export const Leaderboard = ({
  gameTitle,
  filePath,
  registerNew,
  sortAscending,
  scoreMetric,
}: Props) => {
  let params = useParams();
  const newScore = params.score ? parseFloat(params.score) : 0.0;
  const emptyScore: ScoreData[] = [];

  const [scoreBoard, setScoreBoard] = useState(emptyScore);

  useEffect(() => {
    fetchData().catch(console.error);
  });

  const fetchData = useCallback(async () => {
    const data = await readCSVPromise(filePath, sortAscending);
    setScoreBoard(data.splice(0, 30));
  }, []);

  return (
    <div className="leaderboard">
      {registerNew && params.score ? (
        <LeaderboardForm
          gameTitle={gameTitle}
          filePath={filePath}
          scoreBoard={scoreBoard}
          score={newScore}
          sortAscending={sortAscending}
        />
      ) : (
        <LeaderBoardRender
          gameTitle={gameTitle}
          scoreBoard={scoreBoard}
          scoreMetric={scoreMetric}
        />
      )}
    </div>
  );
};
