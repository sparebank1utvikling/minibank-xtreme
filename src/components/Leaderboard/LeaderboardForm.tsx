import React, { useState } from "react";
import { saveStateToFile, ScoreData, sort } from "@/components/Leaderboard/LeaderBoardUtils";
import { useNavigate } from "react-router-dom";

interface Props {
  gameTitle: string
  filePath: string
  score: number
  scoreBoard: ScoreData[],
  sortAscending: boolean
}

export const LeaderboardForm = ({gameTitle, filePath, score, scoreBoard, sortAscending}: Props) => {
  const [ phone, setPhone ] = useState('')
  const [ name, setName ] = useState('')
  const navigate = useNavigate()

  const saveValues = () => {
    const copy = scoreBoard

    copy.push(
      {
        name: name,
        phone: phone,
        score: score
      }
    )

    const sorted = sort(copy, sortAscending)
    setName('')
    setPhone('')

    saveStateToFile(filePath, sorted)
    navigate("..", {relative: "path"})
  }

  return (
    <>
      <p>{`Register player for game ${gameTitle}:`}</p>
      <form onSubmit={() => saveValues()}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
        </label>
        <label>
          Phone:
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}/>
        </label>
        <input type="submit" value="Register"/>
      </form>
    </>
  )
}