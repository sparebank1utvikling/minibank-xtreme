import { ScoreData } from "@/components/Leaderboard/LeaderBoardUtils";
import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  gameTitle: string
 scoreBoard: ScoreData[]
  scoreMetric: string
}

export const LeaderBoardRender =({ gameTitle, scoreBoard, scoreMetric }: Props) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current != null) {
      ref.current.focus()
    }
  }, [])

  const navigate = useNavigate()
  const handleInput = (event: React.KeyboardEvent) => {
    if(event.key === '/') {
      navigate("/")
    }
  }

  return(
    <div tabIndex={0} ref={ref} onKeyUp={(event) => handleInput(event)}>
      <h1 className="leaderboard_title">{`Top 30 - "${gameTitle}"`}</h1>
      <table className="leaderboard_table">
        <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Score <i>({scoreMetric})</i></th>
        </tr>
        </thead>
        <tbody>
        {scoreBoard.map((it, index) => {
          return (
            <tr key={index}>
              <td>{index+1}</td>
              <td className="leaderboard_table--td">{it.name}</td>
              <td>{it.score}</td>
            </tr>)
        })}
        </tbody>
      </table>
      <br/>
      <Link to={'/'}>
        <button className={'btn btn-default'}>⌂ Go back to menu</button>
      </Link>
    </div>
  )
}