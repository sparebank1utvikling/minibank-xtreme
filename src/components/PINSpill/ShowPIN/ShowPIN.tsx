import { Countdown } from "./Countdown";

interface Props {
    pin: string
    timeGiven: number
    setCountdownDone: (done: boolean) => void
}

export const ShowPIN = ({ pin, timeGiven, setCountdownDone }: Props) => {
    return (
        <div className={"pin-game-container"} style={{backgroundColor: "white"}}>
            <header className="pin-game-container-header">Your new PIN</header>
            <p className="pin-game-container-new-pin">{pin}</p>
            <Countdown timeGiven={timeGiven} setDone={setCountdownDone}/>
        </div>
    )
}
