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
  scoreMetric: string
}

export const Leaderboard = ({ gameTitle, filePath, registerNew, sortAscending, scoreMetric }: Props) => {
  let params = useParams();
  const newScore = params.score ? parseFloat(params.score).toFixed(2) : 0.00
  const emptyScore: ScoreData[] = []

  const [scoreBoard, setScoreBoard] = useState(emptyScore)

  useEffect(() => {
    fetchData()
      .catch(console.error)
  })

  const fetchData = useCallback(async () => {
    const data = await readCSVPromise(filePath, sortAscending);
    // @ts-ignore
    setScoreBoard(data.splice(0,20));
  }, [])

  return (
    <div className="leaderboard">

      {registerNew && params.score ?
        <LeaderboardForm gameTitle={gameTitle} filePath={filePath} scoreBoard={scoreBoard} score={newScore} sortAscending={sortAscending} /> :
        <>
          <h1 className="leaderboard_title">{`Top 20 - "${gameTitle}"`}</h1>
          <table className="leaderboard_table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Score <i>({scoreMetric})</i></th>
              </tr>
            </thead>
            <tbody>
              {scoreBoard.map((it, index) => {
                return (
                  <tr key={index}>
                    <td className="leaderboard_table--td">{it.name}</td>
                    <td>{it.score}</td>
                  </tr>)
              })}
            </tbody>
          </table>
        </>
      }
      <br />
      <Link className="back_link" to={"/"}>Back home</Link>
    </div>
  )
}