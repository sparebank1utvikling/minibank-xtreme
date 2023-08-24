
interface DinosaurProps {
  isJumping: boolean
  characterUrl: string
}

export const Dinosaur = ({isJumping, characterUrl}: DinosaurProps) => {
  return (
    <div className={`dinosaur ${isJumping ? 'dinosaur-jumping' : ''}`}>
      <img src={characterUrl} className={'dinosaur-normal'}/>
    </div>
  )
}
