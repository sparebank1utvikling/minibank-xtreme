import CatPicture from "@/assets/cat_delay.png";

interface Props {
    setDelay: (delay: boolean) => void
}

function getRandomDelay(delays: number[]): number {
    const randomIndex = Math.floor(Math.random() * delays.length)
    return delays[randomIndex] * 1000
}

export const Delay = ({ setDelay } : Props) => {
    const DELAY_SHOW_PIN_TIMER = [3, 2.75, 2.5, 2.25, 2, 1.75, 1.5]

    setTimeout(() => {
        setDelay(false)
    }, getRandomDelay(DELAY_SHOW_PIN_TIMER))

    return (
        <div className={"pin-game-delay-screen"}>
            <p style={{ color: 'white'}}>Please wait a bit, the PIN is coming soon, our best employee is working on it...</p>
            <img style={{ width: "300px"}} src={CatPicture} alt={""}/>
        </div>
    )
}
