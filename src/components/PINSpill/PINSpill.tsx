import { Dispatch, useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { InputField } from "./InputField"
import { Counter } from "./Counter"
import { BOARD_PIN_PATH } from "@/App";
import { GameComplete } from "../common/GameComplete";
import { Icon } from "@sb1/ffe-icons-react";
import FavoriteIcon from '@sb1/ffe-icons/icons/filled/xl/favorite.svg';
import { Delay } from "./Delay";

function shouldGiveADelay(score: number) {
  const SCORE_BEFORE_DELAYS = 20
  const TWENTY_PERCENT = 0.2
  return Math.random() < TWENTY_PERCENT && score > SCORE_BEFORE_DELAYS
}

const LifeBar = ({ numberOfLives } : { numberOfLives: number }) => {
  return (
      <div className="pin-game-life-bar">
        {Array.from({ length: numberOfLives }, (_, i) => i).map((_, index) => {
          return <Icon key={index} className="pin-game-life-bar__heart" size="xl" fileUrl={FavoriteIcon} />
        }
            )}
      </div>
  )
}

const PINSpill = () => {
  const TIMES_GIVEN = [5, 3, 2.5, 2, 1.5, 1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.25, 0.2, 0.15, 0.1]
  const [showDelay, setShowDelay] = useState<boolean>(false)
  const [pin, setPin] = useState("")
  const [done, setDone] = useState<boolean>(false)
  const [showPin, setShowPin] = useState<boolean>(false)
  const [numberOfLives, setNumberOfLives] = useState<number>(3)

  const [counterDone, setCounterDone] = useState<boolean>(false)

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
    // Have to compansate for the score being -1 to start with
    shouldGiveADelay(nSuccesses + 1) ? setShowDelay(true) : setShowDelay(false)
    console.log("This should not happen before the delay is over")
    setShowPin(true)
    setSuccess(false)
    generatePin(setPin, nSuccesses)
    setCounterDone(false)
    setNSuccesses((old) => old + 1)
  }

  useEffect(() => {
    if (success) {
      reset()
    }
  }, [success])

  useEffect(() => {
    if (showPin && ref.current) {
      ref.current.focus();
    }
    if (!showPin && !showDelay && pinFieldRef.current) {
      pinFieldRef.current.focus()
    }
  }, [showPin, showDelay])

  useEffect(() => {
    setInput("")
    if (numberOfLives < 1) setDone(true)
  }, [numberOfLives])

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
        <LifeBar numberOfLives={numberOfLives} />
          <fieldset>
            <legend>Can you remember your new PIN?</legend>
            {showDelay ?
             <Delay setDelay={setShowDelay} /> :
              showPin ?
              <div className={"pin-game-container"} style={{ backgroundColor: "white" }}>
                <header className="pin-game-container-header">Your new PIN</header>
                <p className="pin-game-container-new-pin">{pin}</p>
                <Counter timeGiven={TIMES_GIVEN[Math.min(nSuccesses, TIMES_GIVEN.length - 1)]} setDone={setCounterDone} />
              </div>
              :
              <>
                  <>
                <InputField
                  data={input}
                  setData={setInput}
                  id={"pin-input"}
                  name={"PIN Input"}
                  placeholder={"Enter your PIN"}
                  answer={pin}
                  validator={(inp: string, answer: string) => { 
                    if (inp === answer) return true
                    if (inp.length === answer.length && inp !== answer) {
                      setNumberOfLives(numberOfLives - 1)                 
                    }
                    return false
                   }}
                  success={success}
                  successHook={setSuccess}
                  inputRef={pinFieldRef}
                />
                <button
                  className={'pin-game-give-up-button'}
                  onClick={() => setDone(true)}
                >
                  Press x to give up
                </button>
                    </>
              </>
            }
          </fieldset>
          <p className={"pin-game-score"}>Score: {nSuccesses}</p>
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
