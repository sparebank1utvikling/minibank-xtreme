import './leaderboard.scss'
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as fs from "fs";


interface Props {
  gameTitle: string
  filePath: string
}
export const Leaderboard= ({ gameTitle, filePath}: Props) => {

  const [showLeaderboard , setShowLeaderboard] = useState(true)
  const [phone , setPhone] = useState('')

  console.log("Phone: "+ phone)

  useEffect(() => {
    //check if file exist
    if(fs.existsSync(filePath)){
      //process if file exist
    }
    else{
      console.log("File doesn\'t exist.Creating new file")
      fs.writeFile(filePath,'',(err)=>{
        if(err)
          console.log(err);
      })
    }
  })

  const addRowToFile = ( ) => {
    console.log("Attempting write to file with data: "+ phone)
    try{
      fs.appendFileSync(filePath, `${phone};\\n`)
      console.log("data: " + phone + " written to file: " +filePath)
      setPhone('')
    } catch (e) {
      console.log(e)
    }
  }


  // @ts-ignore
  return(
    <div className="leaderboard">

      {showLeaderboard ?
        <>
          <p>{`Leaderboard for game: ${gameTitle}`}</p>
          <p>info her</p>
          <p>info her</p>
          <p>info her</p>
        </>
         :
        <>
          <p>Register player:</p>
          <form onSubmit={() => addRowToFile()}>
            <label>
              Phone:
              <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
            </label>
            <input type="submit" value="Register"/>
          </form>

        </>

      }
      <br/>
      <button onClick={()=>setShowLeaderboard(!showLeaderboard)}>Toggle view</button>
<br/>
      <Link to={"/"}>Back home</Link>
    </div>
  )
}