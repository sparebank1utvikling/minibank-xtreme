import './leaderboard.scss'
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  saveStateToFile,
  ScoreData
} from "@/components/Leaderboard/LeaderBoardUtils";
import * as fs from "fs";
import { parse } from "csv-parse";

interface Props {
  gameTitle: string
  filePath: string
}

export const Leaderboard = ({gameTitle, filePath}: Props) => {
  const emptyScore: ScoreData[] = []
  const headers = [ 'name', 'phone', 'score' ];

  const [ showLeaderboard, setShowLeaderboard ] = useState(true)
  const [ phone, setPhone ] = useState('')
  const [ name, setName ] = useState('')
  const [ score, setScore ] = useState(0)
  const [ scoreBoard, setScoreBoard ] = useState(emptyScore)

  useEffect(() => {
    //check if file exist
    if (fs.existsSync(filePath)) {
      //do process?
    } else {
      console.log("File doesn\'t exist.Creating new file")
      fs.writeFile(filePath, '', (err) => {
        if (err)
          console.log(err);
      })
    }
  })

  const readCSV = (filePath: string) => {
    const fileContent = fs.readFileSync(filePath, {encoding: 'utf-8'});
    parse(fileContent, {
      delimiter: ',',
      columns: headers,
    }, (error, result: ScoreData[]) => {
      if (error) {
        console.error(error);
      }
      //sort results
      result = result.sort((a,b) => b.score - a.score)
      setScoreBoard(result)
    });
    setScoreBoard([])
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

    const sorted = copy.sort((a,b) => b.score - a.score)
    setScore(0)
    setName('')
    setPhone('')

    saveStateToFile(filePath, sorted)
    setShowLeaderboard(true)
  }

  return (
    <div className="leaderboard">

      {showLeaderboard ?
        <>
          <p>{`Leaderboard for game: ${gameTitle}`}</p>

          {scoreBoard.map((it) => {
            return (<p key={it.phone}>{`Navn: ${it.name}, Telefon: ${it.phone}, Score: ${it.score}`}</p>)
          })}

          <button onClick={()=> readCSV(filePath)}>Load</button>
        </>
        :
        <>
          <p>Register player:</p>
          <form onSubmit={() => saveValues()}>
            <label>
              Name:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
            </label>
            <label>
              Phone:
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)}/>
            </label>
            <label>
              Score:
              <input type="text" value={score} onChange={(e) => setScore(parseInt(e.target.value))}/>
            </label>
            <input type="submit" value="Register"/>
          </form>
        </>
      }
      <br/>
      <button onClick={() => setShowLeaderboard(!showLeaderboard)}>Toggle view</button>
      <br/>
      <Link to={"/"}>Back home</Link>
    </div>
  )
}