import { Dispatch, useEffect, useState } from "react"

interface CounterProps {
  timeGiven: number
  setDone: Dispatch<React.SetStateAction<boolean>>
}

export const Countdown = ({timeGiven, setDone}: CounterProps) => {
  const [currentTime, setCurrentTime] = useState<number>(timeGiven)


  const updateTimer = () => {
    setCurrentTime(old => old - 0.1)
  }

  useEffect(() => {
    const interval = setInterval(updateTimer, 100)
    return(() => {
      clearInterval(interval)
    })
  }, [])

  useEffect(() => {
    if(currentTime <= 0){
      setDone(true)
    }
  }, [currentTime])

  const formatTime = (currentTime: number): string => {
    return currentTime.toFixed(2)
  }

  return(
  <div className={"progress-bar progress-bar-show-percent pin-progress-bar"}>
    <div className={"progress-bar-filled pin-progress-bar-filled"}
         style={{width: `${(currentTime / timeGiven)*100}%`}}
         data-filled={`${formatTime(currentTime)} seconds left`}
    />
  </div>
  )
}
