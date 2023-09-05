import React, {useEffect, useRef, useState} from "react";
import './inputCarousel.scss'

interface InputCarouselProps {
  setNameHook: React.Dispatch<React.SetStateAction<string>>
}

const ARRAY_LENGTH = 26

const InputCarousel = ({setNameHook}: InputCarouselProps) => {
  const alpha = Array.from(Array(ARRAY_LENGTH)).map((e, i) => i + 97);
  const alphabet = alpha.map((x) => String.fromCharCode(x));

  const [indices, setIndices] = useState([0,0,0])
  const [curFocus, setCurFocus] = useState<number>(0)
  const carouselRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    if(carouselRef.current) {
      carouselRef.current.focus()
    }
  }, [carouselRef.current])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    let i = indices
    switch(e.key) {
      case 'ArrowUp':
        if(i[curFocus] === 0) {
          i[curFocus] = ARRAY_LENGTH - 1
        } else {
          i[curFocus] = i[curFocus] - 1
        }
        break
      case 'ArrowDown': i[curFocus] = (i[curFocus] + 1) % ARRAY_LENGTH
        break
      case 'ArrowLeft': if (curFocus != 0) {
        setCurFocus(old => old - 1)
      }
        break
      case 'ArrowRight': if (curFocus != 2) {
        setCurFocus(old => old + 1)
      }
        break
      case 'Enter': setNameHook(`${alphabet[indices[0]]}${alphabet[indices[1]]}${alphabet[indices[2]]}`)
      default: console.log("Ingen treff")
    }
    setIndices(i)
  }

  // {String.fromCharCode(0x25B2)} opp
  // {String.fromCharCode(0x25BC)} ned
  return(
    <div tabIndex={0} ref={carouselRef} onKeyUp={handleKeyPress} className={'carousel-container'}>
      <div key={0} className={'with-arrows'}>
        <span className={'arrow'}>{String.fromCharCode(0x25B2)}</span>
        <div className={`selection ${curFocus === 0 ? 'focused' : ''}`}>
        {alphabet[indices[0]]}
        </div>
        <span className={'arrow'}>{String.fromCharCode(0x25BC)}</span>
      </div>
      <div key={1} className={'with-arrows'}>
        <span className={'arrow'}>{String.fromCharCode(0x25B2)}</span>
        <div className={`selection ${curFocus === 1 ? 'focused' : ''}`}>
          {alphabet[indices[1]]}
        </div>
        <span className={'arrow'}>{String.fromCharCode(0x25BC)}</span>
      </div>
      <div key={2} className={'with-arrows'}>
        <span className={'arrow'}>{String.fromCharCode(0x25B2)}</span>
        <div className={`selection ${curFocus === 2 ? 'focused' : ''}`}>
          {alphabet[indices[2]]}
        </div>
        <span className={'arrow'}>{String.fromCharCode(0x25BC)}</span>
      </div>
    </div>
  )
}

export default InputCarousel