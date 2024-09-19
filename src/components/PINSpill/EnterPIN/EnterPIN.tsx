import { InputField } from "./InputField";

interface Props {
    pin: string
    pinFieldRef: React.RefObject<HTMLInputElement>
    setDone: (done: boolean) => void
    setNumberOfLives: (lives: number) => void
    numberOfLives: number
    input: string
    setInput: (s: string) => void
    success: boolean
    setSuccess: (b: boolean) => void
}

export const EnterPIN = ({ pin, pinFieldRef, setDone, setNumberOfLives, numberOfLives, input, setInput, success, setSuccess }: Props) => {
    return (
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
    )
}
