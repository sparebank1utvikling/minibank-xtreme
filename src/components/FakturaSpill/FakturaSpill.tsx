import 'terminal.css'
import React, {Dispatch, useState} from "react";

export const FakturaSpill = () => {
  const [ kid, setKid ] = useState<string>("")
  const [ konto, setKonto ] = useState<string>("")

  return(
    <div className={'faktura-spill'}>
      <fieldset>
        <legend>Betale faktura!</legend>
        <div className={"terminal-card"}>
          <header>Betalingsinformasjon</header>
          <div>Betalingsinfo: Kid: {kid} Kontonr: {konto}</div>
        </div>
        <div className={"form-group"}>
          <label htmlFor={"kid"}>KID:</label>
          <input id={"kid"} name={"KID (9 sifferet)"} type={"text"} placeholder={"KID (9 sifferet)"}></input>
        </div>
        <div className={"form-group"}>
          <label htmlFor={"kontonr"}>Konto nummer:</label>
          <input id={"kontonr"} name={"Konto nummer (11 sifferet)"} type={"text"} placeholder={"Konto nummer (11 sifferet)"}></input>
        </div>
      </fieldset>
      <button onClick={() => {generateKonto(setKonto); generateKid(setKid)}}>Regenerer</button>
    </div>
  )
}

const generateKid = (hook: Dispatch<React.SetStateAction<string>>) => {
  hook(Math.floor(Math.random()*999999999).toString())
}
const generateKonto = (hook: Dispatch<React.SetStateAction<string>>) => {
  hook(Math.floor(Math.random()*99999999999).toString())
}

const validate = (brukerIn: string, konto: string) => {
  return brukerIn === konto;
}