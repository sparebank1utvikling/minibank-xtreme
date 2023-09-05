import './leaderboardForm.scss';
import React, {useEffect, useRef, useState} from "react";
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

  const phoneRef = useRef<HTMLInputElement>(null)

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

  useEffect(() => {
    if(name != '' && phoneRef.current) {
      phoneRef.current.focus()
    }
  }, [name])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      saveValues()
    }
  }

  return (
      <fieldset className="leaderboard-form">
        <legend>Register player for <strong>{`${gameTitle}`}</strong></legend>
        <form className="form">
        <InputCarousel setNameHook={setName}/>
        <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input onKeyUp={handleKeyPress} id="phone" ref={phoneRef} className="leaderboard-input faktura-spill-input-field"  type="text" value={phone} onChange={(e) => setPhone(e.target.value)}/>
        </div>
        <input type="button" className={'btn btn-primary'} onClick={saveValues} value="Register"/>
        </form>
      </fieldset>
  )
}