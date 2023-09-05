import React, { useEffect, useRef } from "react";
import { BOARD_PAY_PATH, BOARD_PIN_PATH } from "@/App";
import { Link, useNavigate } from "react-router-dom";

interface GameCompleteProps {
    gamePath: string,
    score: string | number,
  }
  
export const GameComplete = ({gamePath, score}: GameCompleteProps)=> {
    const navigate = useNavigate();
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if(ref.current)
            ref.current.focus()
    }, [])

    const handleInput = (event: React.KeyboardEvent) => {
        if (event.key === '/') {
          navigate("/")
        }
        if (event.key === '+') {
            navigate("/")
        }
        if (event.key === '-') {
            navigate(`${gamePath}/${score}`);
        }
    }

    const getWinStatement = () => {
        let winStatement = ""
        switch(gamePath){
            case BOARD_PAY_PATH:
                winStatement = `You completed the challenge in: ${score} seconds!`;
            break;
            case BOARD_PIN_PATH:
                winStatement = `You managed to remember ${score} pins!`
            break; 
            default:
                winStatement = ""
            break;
        }
        return winStatement;
    }
    return (
        <div className={'terminal-card'} ref={ref} onKeyUp={(event) => handleInput(event)}>
            <header>Well done!</header>
            <div>
                {getWinStatement()} <br/>
                <p style={{color: "white"}}>Do you want to add your name to the scoreboard?</p>
            </div>
            <div className="buttons">
                <Link to={`${gamePath}/${score}`}>
                    <button className={'btn btn-primary'}>✓ Add to scoreboard</button>
                </Link>
                <Link to={'/'}>
                    <button className={'btn btn-default'}>⌂ Back to menu</button>
                </Link>
            </div>
        </div>
    )
}