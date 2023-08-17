import chicken from '../../assets/chicken.png'
interface DinosaurProps {
  isJumping: boolean
}

export const Dinosaur = ({isJumping}: DinosaurProps) => {
  return (
    <div className={`dinosaur ${isJumping ? 'dinosaur-jumping' : ''}`}>
      <img src={chicken} className={'dinosaur-normal'}/>
    </div>
  )
}
