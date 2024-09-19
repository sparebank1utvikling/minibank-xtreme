import { Counter } from "./Counter";

interface Props {
    pin: string
    timeGiven: number
    setCounterDone: (done: boolean) => void
}

export const PIN = ({ pin, timeGiven, setCounterDone }: Props) => {
    return (
        <div className={"pin-game-container"} style={{backgroundColor: "white"}}>
            <header className="pin-game-container-header">Your new PIN</header>
            <p className="pin-game-container-new-pin">{pin}</p>
            <Counter timeGiven={timeGiven} setDone={setCounterDone}/>
        </div>
    )
}
