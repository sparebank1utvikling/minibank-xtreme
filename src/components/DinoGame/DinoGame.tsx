import React, { useEffect, useRef, useState } from 'react';
import { Dinosaur } from './Dinosaur';
import { Obstacle } from './Obstacle';
import { Obstacle as ObstacleType } from './Gametypes'
import { characters } from './characterImporter'
import background from '../../assets/background.jpg'
import { useNavigate } from 'react-router-dom';

const DinoGame = () => {
  const [isJumping, setIsJumping] = useState<boolean>(false)
  const [obstacles, setObstacles] = useState<ObstacleType[]>([{position: 700}])
  const [score, setScore] = useState<number>(0)
  const navigate = useNavigate()
  const gameContainerRef = useRef<HTMLDivElement>(null)
  const updateGame = () => {
    // Update game logic here
  };

  useEffect(() => {
    const gameInterval = setInterval(updateGame, 20)
    if (gameContainerRef.current) gameContainerRef.current.focus()
    return(() => {
      clearInterval(gameInterval)
    })
  }, [])


  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === " ") {
      handleJump()
    } else if (event.key === "Escape") {
      navigate("/")
    }
  }

  const handleJump = () => {
    // Handle jump logic here
    setIsJumping(true)
    setTimeout(() => {setIsJumping(false)}, 200)
  };


  return (
    <div tabIndex={0} onKeyUp={handleKeyPress} className="dino-container" ref={gameContainerRef}>
      <div className={'background-container'}>
        <img src={background}/>
        <img src={background}/>
      </div>
      <Dinosaur isJumping={isJumping} characterUrl={characters[0]}/>
      {obstacles.map((obstacle, index) => (
        <Obstacle key={index} obstacle={obstacle} />
      ))}
      <div className="score">{score}</div>
    </div>
  );

}

export default DinoGame;
