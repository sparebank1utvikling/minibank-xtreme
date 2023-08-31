import './leaderboard.scss'
import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { readCSVPromise, ScoreData } from "@/components/Leaderboard/LeaderBoardUtils";
import { LeaderboardForm } from "@/components/Leaderboard/LeaderboardForm";

interface Props {
  gameTitle: string
  filePath: string
  registerNew: boolean
  sortAscending: boolean
}

export const Leaderboard = ({gameTitle, filePath, registerNew, sortAscending}: Props) => {
  let params = useParams();
  const newScore = params.score ? parseFloat(params.score).toFixed(2) : 0.00
  const emptyScore: ScoreData[] = []

  const [ scoreBoard, setScoreBoard ] = useState(emptyScore)

  useEffect(() => {
    fetchData()
      .catch(console.error)
  })

  const fetchData = useCallback(async () => {
    const data = await readCSVPromise(filePath, sortAscending);
    // @ts-ignore
    setScoreBoard(data);
  }, [])

  return (
    <div className="leaderboard">

      {registerNew && params.score ?
        <LeaderboardForm gameTitle={gameTitle} filePath={filePath} scoreBoard={scoreBoard} score={newScore} sortAscending={sortAscending}/> :
        <>
          <p>{`Leaderboard for game: ${gameTitle}`}</p>
          {scoreBoard.map((it) => {
            return (<p key={it.phone}>{`Name: ${it.name}, Phone: ${it.phone}, Score: ${it.score}`}</p>)
          })}
          <br/>
        </>
      }
      <br/>
      <Link to={"/"}>Back home</Link>
    </div>
  )
}