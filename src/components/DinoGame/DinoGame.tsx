import React, { useEffect, useRef, useState } from 'react';
import { Dinosaur } from './Dinosaur';
import { Obstacle } from './Obstacle';
import { Obstacle as ObstacleType } from './Gametypes'
import { characters } from './characterImporter'
import background from '../../assets/background.jpg'
import { useNavigate } from 'react-router-dom';

const DinoGame = () => {
  const [isJumping, setIsJumping] = useState<boolean>(false)
  const obstacles = createObstacles(10);
  const [score, setScore] = useState<number>(0)
  const navigate = useNavigate()
  const gameContainerRef = useRef<HTMLDivElement>(null)
  const [isHit, setIsHit] = useState<boolean>(false)
  const updateGame = () => {
    // Update obstacle position
    //obstacles.positions.forEach((pos) => if())

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
    setIsJumping(true)
    setTimeout(() => {setIsJumping(false)}, 1000)
  };


  return (
    <div tabIndex={0} onKeyUp={handleKeyPress} className="dino-container" ref={gameContainerRef}>
      <div className={'background-container'}>
        <img src={background}/>
        <img src={background}/>
      </div>
      <Dinosaur isJumping={isJumping} characterUrl={characters[0]}/>
      {obstacles.objects.map((obstacle, index) => (
        obstacle
      ))}
      <div className="score">{score}</div>
    </div>
  );

}

const createObstacle = (initial: number): ObstacleType => {
  const [position, setPosition] = useState<number>(initial)
  return {
    position,
    setPosition
  }
}

const createObstacles = (n: number) => {
  const hooks: React.Dispatch<React.SetStateAction<number>>[] = []
  const positions: number[] = []
  const objects: JSX.Element[] = []
  let i = 0
  let pos = 700
  while(i++ < n) {
    let object = createObstacle(pos)
    pos += 700
    hooks.push(object.setPosition)
    positions.push(object.position)
    let cur = <Obstacle obstacle={object}/>
    objects.push(cur)
  }
  return {
    positions,
    hooks,
    objects
  }
}

export default DinoGame;
