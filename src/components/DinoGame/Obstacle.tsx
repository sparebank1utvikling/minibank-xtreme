import { Obstacle as ObstacleType } from './Gametypes'
import bear from '../../assets/bear.png'
import {useEffect} from 'react'
interface ObstacleProps {
  obstacle: ObstacleType
}
export const Obstacle = ({obstacle}: ObstacleProps) => {

  const updatePosition = () => {
    obstacle.setPosition((old) => old - 5);
  }

  useEffect(() => {
    const interval = setInterval(updatePosition, 10)
    return (() => clearInterval(interval))
  }, [])

  return(
    <div className="obstacle" style={{ left: obstacle.position }}>
      <img src={bear}/>
    </div>
  )
}
