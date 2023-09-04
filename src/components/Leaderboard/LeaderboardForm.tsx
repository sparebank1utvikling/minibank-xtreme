import './leaderboardForm.scss';
import React, { useState } from "react";
import { saveStateToFile, ScoreData, sort } from "@/components/Leaderboard/LeaderBoardUtils";
import { useNavigate } from "react-router-dom";
import InputCarousel from "@/components/Leaderboard/InputCarousel";

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
      <fieldset className="leaderboard-form">
        <legend>Register player for <strong>{`${gameTitle}`}</strong></legend>
      <form className="form" onSubmit={() => saveValues()}>
        <InputCarousel/>
        <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input id="phone" className="leaderboard-input faktura-spill-input-field"  type="text" value={phone} onChange={(e) => setPhone(e.target.value)}/>
        </div>
        <input className={'btn btn-primary'} type="submit" value="Register"/>
      </form>
      </fieldset>
  )
}