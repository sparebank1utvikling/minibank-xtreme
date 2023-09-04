import { Dispatch, useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { InputField } from "../common/InputField"
import { Counter } from "./Counter"
import { BOARD_PIN_PATH } from "@/App";

const PINSpill = () => {
  const TIMES_GIVEN = [10, 5, 2.5, 2, 1.5, 1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.25, 0.2, 0.15, 0.1]
  const [pin, setPin] = useState("")
  const [done, setDone] = useState<boolean>(false)
  const [showPin, setShowPin] = useState<boolean>(false)

  const [counterDone, setCounterDone] = useState<boolean>(false)
  const [countdownActive, setCountdownActive] = useState<boolean>(true)

  const [input, setInput] = useState<string>("")
  const [success, setSuccess] = useState<boolean>(false)

  const [nSuccesses, setNSuccesses] = useState<number>(-1)

  const pinFieldRef = useRef<HTMLInputElement>(null)


  useEffect(() => {
    if(counterDone) {
      setShowPin(false)
    }
  }, [counterDone])


  const reset = () => {
    setShowPin(true)
    setSuccess(false)
    generatePin(setPin)
    setCounterDone(false)
    setNSuccesses((old) => old + 1)
  }

  useEffect(() => {
    if(success === true) {
      reset()
    }
  }, [success])

  useEffect(() => {
    if(!showPin && pinFieldRef.current) {
      pinFieldRef.current.focus()
    }
  }, [showPin])

  return(
    <div className={'pin-game'}>
      {!done ?
        <>
        <fieldset>
          <legend>Can you remember your new PIN?</legend>
          {showPin ?
            <div className={"terminal-card"} style={{backgroundColor: "white"}}>
                <header>Your new PIN</header>
                <div className={"pin-game-info-fields"}>{pin}</div>
                <Counter timeGiven={TIMES_GIVEN[Math.min(nSuccesses, TIMES_GIVEN.length-1)]} setDone={setCounterDone}/>
            </div>
            :
            <>
            <InputField
              data={input}
              dataHook={setInput}
              id={"pin-input"}
              name={"PIN Input"}
              placeholder={"Enter your PIN"}
              answer={pin}
              validator={(inp: string, answer: string) => {return inp === answer}}
              success={success}
              successHook={setSuccess}
              inputRef={pinFieldRef}
            />
            <button
              className={'btn btn-error'}
              style={{marginBottom: '15px'}}
              onClick={() => setDone(true)}
            >
              Give up
            </button>
            </>
          }
        </fieldset>
        <div className={"score-container"}>Score: {nSuccesses}</div>
        </>
        :
        <div className={'terminal-card'}>
          <header>Game over!</header>
          <div>
            You managed to remember {nSuccesses} pins, putting you as #x on the scoreboard.
          </div>
          <Link to={`${BOARD_PIN_PATH}/${nSuccesses}`}>
            <button className={'btn btn-primary'} style={{marginBottom: '15px'}}>Register</button>
          </Link>
          <Link to={'/'}>
            <button className={'btn btn-default'} style={{marginBottom: '15px'}}>Back to menu</button>
          </Link>
        </div>
      }
    </div>
  )
}

const generatePin = (hook: Dispatch<React.SetStateAction<string>>) => {
  let pin = Math.floor(Math.random()*9999).toString()
  while(pin.length < 4){
    pin = `0${pin}`
  }
  hook(pin)
}

export default PINSpill