import 'terminal.css'
import React, {Dispatch, useEffect, useRef, useState} from "react";

export const FakturaSpill = () => {
  const [ kid, setKid ] = useState<string>()
  const [ konto, setKonto ] = useState<string>()
  const [kontoInput, setKontoInput] = useState<string>("")
  const [kidInput, setKidInput] = useState<string>("")
  const [kidSuccess, setKidSuccess] = useState<boolean>(false)
  const [kontoSuccess, setKontoSuccess] = useState<boolean>(false)

  const kidInputRef = useRef<HTMLInputElement>(null)
  const kontoInputRef = useRef<HTMLInputElement>(null)
  
  useEffect(() => {
    generateKonto(setKonto)
    generateKid(setKid)
    if(kidInputRef.current) kidInputRef.current.focus()
  }, [])

  const reset = () => {
    generateKonto(setKonto)
    generateKid(setKid)
    setKidSuccess(false)
    setKontoSuccess(false)
    if(kidInputRef.current) {
      kidInputRef.current.value = ""
      //kidInputRef.current.focus() // TODO denne funker ikke fordi kidSuccess er enda true når den blir satt
    }
    if(kontoInputRef.current) {
      kontoInputRef.current.value = ""
    }
  }

  useEffect(() => {
    if(!kidSuccess && validate(kidInput, kid)) {
      setKidSuccess(true)
      if(kontoInputRef.current) kontoInputRef.current.focus()
      console.log("KID is success")
    }
    if (!kontoSuccess && validate(kontoInput, konto)) {
      setKontoSuccess(true)
      console.log("Konto is success")
    }
  }, [kontoInput, kidInput, kid, konto])

  useEffect(() => {
    if(kontoSuccess && kidSuccess) {
      console.log("Resetting: Great success!")
      reset()
    }
  }, [kontoSuccess, kidSuccess])

  useEffect(() => {
    if(!kidSuccess && kidInputRef.current) {
      kidInputRef.current.focus()
    }
  }, [kidSuccess])

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
          <input
            ref={kidInputRef}
            id={"kid"}
            name={"KID (9 sifferet)"}
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
            disabled={kontoSuccess}
            maxLength={11}
            placeholder={"Konto nummer (11 sifferet)"}
            onChange={(change) => {setKontoInput(change.currentTarget.value)}}
          />
        </div>
      </fieldset>
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