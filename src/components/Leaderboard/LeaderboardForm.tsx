import './leaderboardForm.scss';
import React, { useState } from "react";
import { saveStateToFile, ScoreData, sort } from "@/components/Leaderboard/LeaderBoardUtils";
import { useNavigate } from "react-router-dom";
import { getEmbedText, isNonAlpha } from "@/components/Leaderboard/t9-input";

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
  const [ workingString, setWorkingString] = useState('')
  const navigate = useNavigate()
  const [counter, setCounter] = useState(0)
  const [prevButtonPressed, setPrevButtonPressed] = useState('')


  const t9 = (button_pressed: React.KeyboardEvent) =>{
    let readyToSave = false

    console.log("Trykket: " + button_pressed.key)
    console.log("Working string: " + workingString)

    const toEmbedText = getEmbedText(button_pressed.key);
    var text = workingString

    var shouldChange = (): boolean => {
      return prevButtonPressed === button_pressed.key && !isNonAlpha(button_pressed.key);
    }

    console.log("embeded text: " + toEmbedText)
    console.log("counter: " + counter)
    console.log("shouldChange: " + shouldChange())

    if (counter < 3) {
      text = name.slice(0, -1);
      console.log("slice: " + text)
      if ((counter > 2) || toEmbedText[counter]==='') {
        setCounter( 0)
        setWorkingString('')
      }
     setCounter(counter +1)
    } else {
      setCounter(1)
    }

    setPrevButtonPressed(button_pressed.key)
    setWorkingString(workingString + toEmbedText[counter])

    if (shouldChange()) {
      const newChar = (toEmbedText[counter] || toEmbedText[0])
      console.log("ny karakter: " + newChar)
      console.log("navn før endring: " + name )
      setWorkingString('')
      // console.log((text + (toEmbedText[counter] || toEmbedText[0])))

      setName(name + newChar)
    }
  }

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
        <div className="form-group">
        <label htmlFor="name">Name</label>
          {/* <input id="name" className="leaderboard-input faktura-spill-input-field" type="text" value={name} onChange={(e) => setName(e.target.value)}/> */}
          <input id="name"
                 className="leaderboard-input faktura-spill-input-field"
                 type="text"
                 value={name}
                 //onChange={(e) => setName(e.target.value)}
                 onKeyUp={(e) => t9(e)}
          />
      </div>
        <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input id="phone" className="leaderboard-input faktura-spill-input-field"  type="text" value={phone} onChange={(e) => setPhone(e.target.value)}/>
        </div>
        <input className={'btn btn-primary'} type="submit" value="Register"/>
      </form>
      </fieldset>
  )
}