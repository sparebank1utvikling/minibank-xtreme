import { Obstacle as ObstacleType } from './Gametypes'
import bear from '../../assets/bear.png'
interface ObstacleProps {
  obstacle: ObstacleType
}
export const Obstacle = ({obstacle}: ObstacleProps) => {
  return(
    <div className="obstacle" style={{ left: obstacle.position }}>
      <img src={bear}/>
    </div>
  )
}
