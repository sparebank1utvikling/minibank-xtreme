import React, { Component, useEffect, useState } from 'react';
import { Dinosaur } from './Dinosaur';
import { Obstacle } from './Obstacle';
import { Obstacle as ObstacleType } from './Gametypes'
import { characters } from './characterImporter'
import background from '../../assets/background.jpg'

const DinoGame = () => {
  const [isJumping, setIsJumping] = useState<boolean>(false)
  const [obstacles, setObstacles] = useState<ObstacleType[]>([{position: 700}])
  const [score, setScore] = useState<number>(0)

  const updateGame = () => {
    // Update game logic here
  };

  useEffect(() => {
    const gameInterval = setInterval(updateGame, 20)
    return(() => {
      clearInterval(gameInterval)
    })
  }, [])


  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === " ") {
      handleJump()
    }
  }

  const handleJump = () => {
    // Handle jump logic here
    setIsJumping(true)
    setTimeout(() => {setIsJumping(false)}, 200)
  };


  return (
    <div tabIndex={0} onKeyUp={handleKeyPress} className="dino-container" style={{backgroundImage: `url(${background})`}}>
      <Dinosaur isJumping={isJumping} />
      {obstacles.map((obstacle, index) => (
        <Obstacle key={index} obstacle={obstacle} />
      ))}
      <div className="score">{score}</div>
    </div>
  );

}

export default DinoGame;
