import 'terminal.css'
import React, {Dispatch, useEffect, useRef, useState} from "react";
import { Link } from 'react-router-dom';

export const FakturaSpill = () => {
  const NUM_ROUNDS = 2
  const [ kid, setKid ] = useState<string>()
  const [ konto, setKonto ] = useState<string>()
  const [kontoInput, setKontoInput] = useState<string>("")
  const [kidInput, setKidInput] = useState<string>("")
  const [kidSuccess, setKidSuccess] = useState<boolean>(false)
  const [kontoSuccess, setKontoSuccess] = useState<boolean>(false)

  const kidInputRef = useRef<HTMLInputElement>(null)
  const kontoInputRef = useRef<HTMLInputElement>(null)

  const [numSuccess, setNumSuccess] = useState<number>(0)
  const [done, setDone] = useState<boolean>(false)
  const [startTime, setStartTime] = useState<number>()
  const [timeUsed, setTimeUsed] = useState<string>("")

  //Initialization
  useEffect(() => {
    generateKonto(setKonto)
    generateKid(setKid)
    if(kidInputRef.current) kidInputRef.current.focus()
    setStartTime(Date.now())
  }, [])

  const reset = () => {
    generateKonto(setKonto)
    generateKid(setKid)
    setKidSuccess(false)
    setKontoSuccess(false)
    if(kidInputRef.current) {
      kidInputRef.current.value = ""
    }
    if(kontoInputRef.current) {
      kontoInputRef.current.value = ""
    }
    if(numSuccess === NUM_ROUNDS - 1) {
      const time = Date.now() - startTime!
      setTimeUsed(Math.round(time / 1000).toFixed(2))
      setDone(true)
    }
    console.log(`numSuccess: ${numSuccess}`)
    setNumSuccess((old) => old + 1)
  }

  // Validate input fields and switch focus to konto if kid is success
  useEffect(() => {
    //KID is success
    if(!kidSuccess && validate(kidInput, kid)) {
      setKidSuccess(true)
      if(kontoInputRef.current) kontoInputRef.current.focus()
    }
    //Konto is success
    if (!kontoSuccess && validate(kontoInput, konto)) {
      setKontoSuccess(true)
    }
  }, [kontoInput, kidInput, kid, konto])

  //Check if successfully entered both numbers
  useEffect(() => {
    if(kontoSuccess && kidSuccess) {
      console.log("Resetting: Great success!")
      reset()
    }
  }, [kontoSuccess, kidSuccess])

  // Change focus to first field on initial and after reset
  useEffect(() => {
    if(!kidSuccess && kidInputRef.current) {
      kidInputRef.current.focus()
    }
  }, [kidSuccess])

  return(
    <div className={'faktura-spill'}>
      {!done &&
      <fieldset>
        <legend>Betale faktura!</legend>
        <div className={"terminal-card"}>
          <header>Betalingsinformasjon</header>
          <div className={"terminal-alert terminal-alert-primary faktura-spill-info-fields"}>Kid: {kid}</div>
          <div className={"terminal-alert terminal-alert-primary faktura-spill-info-fields"}>Kontonr: {konto}</div>
        </div>
        <div className={"form-group"}>
          <label htmlFor={"kid"}>KID:</label>
          <input
            ref={kidInputRef}
            id={"kid"}
            name={"KID (9 sifferet)"}
            className={"faktura-spill-input-field"}
            type={"text"}
            disabled={kidSuccess}
            maxLength={9}
            placeholder={"KID (9 sifferet)"}
            onChange={(change) => {setKidInput(change.currentTarget.value)}}
          />

        </div>
        <div className={"form-group"}>
          <label htmlFor={"kontonr"}>Konto nummer:</label>
          <input
            id={"kontonr"}
            ref={kontoInputRef}
            name={"Konto nummer (11 sifferet)"}
            type={"text"}
            className={"faktura-spill-input-field"}
            disabled={kontoSuccess}
            maxLength={11}
            placeholder={"Konto nummer (11 sifferet)"}
            onChange={(change) => {setKontoInput(change.currentTarget.value)}}
          />
        </div>
      </fieldset>}
      {done &&
          <div className={'terminal-card'}>
              <header>Well done!</header>
              <div>
                  You completed the challenge in {timeUsed} seconds. Ranking you #x on the scoreboard
              </div>
              <Link to={'/'}>
                <button className={'btn btn-primary'} style={{marginBottom: '15px'}}>Back to menu</button>
              </Link>
          </div>
      }
    </div>
  )
}

const generateKid = (hook: Dispatch<React.SetStateAction<string | undefined>>) => {
  hook(Math.floor(Math.random()*999999999).toString())
}
const generateKonto = (hook: Dispatch<React.SetStateAction<string | undefined>>) => {
  hook(Math.floor(Math.random()*99999999999).toString())
}

const validate = (brukerIn: string, konto: string | undefined) => {
  return brukerIn === konto;
}