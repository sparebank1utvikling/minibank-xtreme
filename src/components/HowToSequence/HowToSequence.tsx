import {useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

interface HowToSequenceProps {
  howToPlayList: Array<string>,
  gamePath: string
}


const HowToSequence = ({howToPlayList, gamePath}: HowToSequenceProps) => {
  const [step, setStep] = useState(0)
  const [stepText, setStepText] = useState("")
  const navigate = useNavigate();
  const divRef = useRef<HTMLDivElement>(null)

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if(e.key !== '/'){
      onButtonClick();
    }
    else {
      navigate("/#");
    }
  }
  const isLastStep = () => {
    return step === howToPlayList.length - 1
  }
  const onButtonClick = () => {
    if(isLastStep()) {
      navigate(gamePath)
    } else {
      setStepText(howToPlayList[step+1])
      setStep(old => old + 1)
    }
  }

  useEffect(() => {
    setStepText(howToPlayList[0])
    divRef.current?.focus()
  }, [])

  return(
    <div tabIndex={0} className={'faktura-spill'} onKeyUp={handleKeyPress} ref={divRef}>
      <div className={'terminal-card intro-card'}>
        <header>How to play</header>
        <div className={'intro-card-content'}>
          <p>{stepText}</p>
          <button onClick={onButtonClick} className={'btn btn-primary'} style={{marginBottom: '15px'}}>{isLastStep() ? 'Start game' : 'Next step'}</button>
        </div>
      </div>
    </div>
  )
}

export default HowToSequence