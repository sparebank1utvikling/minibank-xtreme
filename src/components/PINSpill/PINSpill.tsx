import { Dispatch, useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { InputField } from "../common/InputField"
import { Counter } from "./Counter"
import { BOARD_PIN_PATH } from "@/App";
import { GameComplete } from "../common/GameComplete";

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
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (counterDone) {
      setShowPin(false)
    }
  }, [counterDone])

  const reset = () => {
    setShowPin(true)
    setSuccess(false)
    generatePin(setPin, nSuccesses)
    setCounterDone(false)
    setNSuccesses((old) => old + 1)
  }

  useEffect(() => {
    if (success === true) {
      reset()
    }
  }, [success])

  useEffect(() => {
    if (showPin && ref.current) {
      ref.current.focus();
    }
    if (!showPin && pinFieldRef.current) {
      pinFieldRef.current.focus()
    }
  }, [showPin])

  useEffect(() => {
    if (ref.current)
      ref.current.focus();
  }, [done])

  const navigate = useNavigate()
  const handleInput = (event: React.KeyboardEvent) => {
    if (event.key === '/') {
      navigate("/")
    }
    if (event.key === '+') {
      if (!showPin && !done) {
        setDone(true)
      }
    }
    if (event.key === '-') {
      if (!showPin && done) {
        navigate(`${BOARD_PIN_PATH}/${nSuccesses}`)
      }
    }
  }

  return (
    <div className={'pin-game'} ref={ref} tabIndex={0} onKeyUp={(event) => handleInput(event)}>
      {!done ?
        <>
          <fieldset>
            <legend>Can you remember your new PIN?</legend>
            {showPin ?
              <div className={"terminal-card"} style={{ backgroundColor: "white" }}>
                <header>Your new PIN</header>
                <div className={"pin-game-info-fields"}>{pin}</div>
                <Counter timeGiven={TIMES_GIVEN[Math.min(nSuccesses, TIMES_GIVEN.length - 1)]} setDone={setCounterDone} />
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
                  validator={(inp: string, answer: string) => { return inp === answer }}
                  success={success}
                  successHook={setSuccess}
                  inputRef={pinFieldRef}
                />
                <button
                  className={'btn btn-error'}
                  onClick={() => setDone(true)}
                >
                  Press x to give up
                </button>
              </>
            }
          </fieldset>
          <div className={"score-container"}>Score: {nSuccesses}</div>
        </>
        :
        <GameComplete gamePath={BOARD_PIN_PATH} score={nSuccesses} />
      }
    </div>
  )
}

function generateRandomNumber(digits:number) {
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generatePin = (hook: Dispatch<React.SetStateAction<string>>, nSuccesses: number) => {
  let pin = '1234'

  if (nSuccesses >= 50 && nSuccesses < 100) {
    pin = generateRandomNumber(5).toString();
  }

  else if (nSuccesses >= 100) {
    pin = generateRandomNumber(6).toString();
  }

  else {
    pin = generateRandomNumber(4).toString();
    while (pin.length < 4) {
      pin = `0${pin}`
    }
  }
  hook(pin)
}

export default PINSpill