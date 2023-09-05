import 'terminal.css'
import React, {Dispatch, useEffect, useRef, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { BOARD_PAY_PATH } from "@/App";
import { GameComplete } from '../common/GameComplete';

export const FakturaSpill = () => {
  const NUM_ROUNDS = 2
  const [ kid, setKid ] = useState<string>()
  const [ konto, setKonto ] = useState<string>()
  const [ sum, setSum ] = useState<string>()
  const [kontoInput, setKontoInput] = useState<string>("")
  const [kidInput, setKidInput] = useState<string>("")
  const [sumInput, setSumInput] = useState<string>("")

  const [kidSuccess, setKidSuccess] = useState<boolean>(false)
  const [kontoSuccess, setKontoSuccess] = useState<boolean>(false)
  const [sumSuccess, setSumSuccess] = useState<boolean>(false)

  const kidInputRef = useRef<HTMLInputElement>(null)
  const kontoInputRef = useRef<HTMLInputElement>(null)
  const sumInputRef = useRef<HTMLInputElement>(null)
  const ref = useRef<HTMLDivElement>(null);

  const [numSuccess, setNumSuccess] = useState<number>(0)
  const [done, setDone] = useState<boolean>(false)
  const [startTime, setStartTime] = useState<number>()
  const [timeUsed, setTimeUsed] = useState<string>("")

  const [curTime, setCurTime] = useState<number>(0)
  const incrementTime = () => {
    setCurTime(old => old + 0.1)
  }

  //Initialization
  useEffect(() => {
    generateKonto(setKonto)
    generateKid(setKid)
    generateSum(setSum)
    if(kidInputRef.current) kidInputRef.current.focus()
    setStartTime(Date.now())
    const interval = setInterval(incrementTime, 100)
    return(() => clearInterval(interval))
  }, [])

  const reset = () => {
    generateKonto(setKonto)
    generateKid(setKid)
    generateSum(setSum)
    setKidSuccess(false)
    setKontoSuccess(false)
    setSumSuccess(false)
    if(kidInputRef.current) {
      kidInputRef.current.value = ""
    }
    if(kontoInputRef.current) {
      kontoInputRef.current.value = ""
    }
    if(sumInputRef.current) {
      sumInputRef.current.value = ""
    }
    if(numSuccess === NUM_ROUNDS - 1) {
      const time = Date.now() - startTime!
      setTimeUsed((time / 1000).toFixed(2))
      setDone(true)
    }
    console.log(`numSuccess: ${numSuccess}`)
    setNumSuccess((old) => old + 1)
  }

  const formatAccountnumber = (accountNumber: string | undefined) => {
    if(!accountNumber)
      return;
    let formattedAccountNumber = '';

    if (accountNumber.length > 0) {
        formattedAccountNumber += accountNumber.substring(0, 4);
    }

    if (accountNumber.length > 4) {
        formattedAccountNumber +=
        '\u00A0' + accountNumber.substring(4, 6);
    }

    if (accountNumber.length > 6) {
        formattedAccountNumber +=
          '\u00A0' + accountNumber.substring(6);
    }

    return formattedAccountNumber;
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
      if(sumInputRef.current) sumInputRef.current.focus()
    }
    //Sum is success
    if(!sumSuccess && validate(sumInput, sum)) {
      setSumSuccess(true)
    }
  }, [kontoInput, kidInput, sumInput, kid, konto, sum])

  //Check if successfully entered both numbers
  useEffect(() => {
    if(kontoSuccess && kidSuccess && sumSuccess) {
      console.log("Resetting: Great success!")
      reset()
    }
  }, [kontoSuccess, kidSuccess, sumSuccess])

  // Change focus to first field on initial and after reset
  useEffect(() => {
    if(!kidSuccess && kidInputRef.current) {
      kidInputRef.current.focus()
    }
  }, [kidSuccess])

    const navigate = useNavigate()
    const handleInput = (event: React.KeyboardEvent) => {
        if(event.key === '/') {
          navigate("/#")
        }
        if(event.key === '-') {
          navigate(`${BOARD_PAY_PATH}/${timeUsed}`)
        }
    }

  return(
    <div className={'faktura-spill'} tabIndex={0} ref={ref} onKeyUp={(event) => handleInput(event)}>
      {!done &&
      <>
      <fieldset>
        <legend>Pay invoice</legend>
        <div className={"terminal-card"}>
          <header>Invoice details</header>
          <span className="faktura-spill-info-fields"><div className="faktura-spill-info-fields-label">Kid:</div> {kid}</span>
          <span className="faktura-spill-info-fields"><div className="faktura-spill-info-fields-label">Account number:</div> {formatAccountnumber(konto)}</span>
          <span className="faktura-spill-info-fields"><div className="faktura-spill-info-fields-label">Total amount:</div> {sum},-</span>
        </div>
        <div className={"form-group"}>
          <label htmlFor={"kid"}>KID:</label>
          <input
            ref={kidInputRef}
            id={"kid"}
            name={"KID (9 digits)"}
            className={"faktura-spill-input-field"}
            type={"text"}
            disabled={kidSuccess}
            maxLength={9}
            placeholder={"KID (9 digits)"}
            onChange={(change) => {setKidInput(change.currentTarget.value)}}
          />

        </div>
        <div className={"form-group"}>
          <label htmlFor={"accountnumber"}>Account number:</label>
          <input
            id={"accountnumber"}
            ref={kontoInputRef}
            name={"Account number (11 digits)"}
            type={"text"}
            className={"faktura-spill-input-field"}
            disabled={kontoSuccess}
            maxLength={11}
            placeholder={"Account number (11 digits)"}
            onChange={(change) => {setKontoInput(change.currentTarget.value)}}
          />
        </div>
          <div className={"form-group"}>
              <label htmlFor={"total"}>Total amount:</label>
              <input
                  id={"total"}
                  ref={sumInputRef}
                  name={"Total amount"}
                  type={"text"}
                  className={"faktura-spill-input-field"}
                  disabled={sumSuccess}
                  maxLength={11}
                  placeholder={"Total amount"}
                  onChange={(change) => {setSumInput(change.currentTarget.value)}}
              />
          </div>
      </fieldset>
          <div className={'faktura-timer'}>Elapsed time: {curTime.toFixed(1)}</div>
        </>
      }
      {done && <GameComplete gamePath={BOARD_PAY_PATH} score={timeUsed} />
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

const generateSum = (hook: Dispatch<React.SetStateAction<string | undefined>>) => {
  hook(Math.floor(Math.random()*99999).toString())
}

const validate = (brukerIn: string, konto: string | undefined) => {
  return brukerIn === konto;
}