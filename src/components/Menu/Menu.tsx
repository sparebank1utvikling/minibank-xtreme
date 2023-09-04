import { Link, useNavigate } from "react-router-dom"
import {useRef, useEffect} from "react";
import { BOARD_PAY_PATH, BOARD_PIN_PATH } from "@/App";

const Menu = () => {
    const mainMenu = useRef<HTMLDivElement>(null);
  //Initialization
  useEffect(() => {
      if(mainMenu.current != null) {
          mainMenu.current.focus()
      }
  }, [])
    const navigate = useNavigate()
    const handleInput = (event: React.KeyboardEvent) => {
        switch (event.key) {
            case '7':
                console.log(event)
                navigate("/faktura/intro")
                break
            case '4':
                console.log(event)
                break
            case '1':
                console.log(event)
                break
            case '9':
                console.log(event)
                break
            case '6':
                console.log(event)
                break
            case '3':
                console.log(event)
                break
        }
    }
  return (
    <>
    <div className='menu-grid' tabIndex={0} onKeyUp={(event) => handleInput(event)} ref={mainMenu}>
      <div className={'menu-title'}><h1>MINIBANK XTREME</h1></div>
      <div className={'menu-item--left'} style={{gridArea: 'b'}}> <h3><Link to={"/faktura/intro"}>{'> '}Betal faktura</Link></h3></div>
      <div className={'menu-item--right'} style={{gridArea: 'c'}}><h3><Link to={"/pin/intro"}>Ny PIN på kort{' <'}</Link></h3></div>
      <div className={'menu-item--left'} style={{gridArea: 'd'}}> <h3>{'>'} Jeg er også et spill</h3></div>
      <div className={'menu-item--right'} style={{gridArea: 'e'}}><h3>Jeg er også et spill {'<'}</h3></div>
      <div className={'menu-item--left'} style={{gridArea: 'f'}}> <h3>{'>'} Jeg er også et spill</h3></div>
      <div className={'menu-item--right'} style={{gridArea: 'g'}}><h3>Jeg er også et spill {'<'}</h3></div>
    </div>
     <p><Link to={BOARD_PAY_PATH}>Leaderboard pay</Link></p>
      <p><Link to={BOARD_PIN_PATH}>Leaderboard pin</Link></p>
    {/* <p><Link to={`${BOARD_PAY_PATH}/9`}>Leaderboard pay new</Link></p> <p><Link to={`${BOARD_PIN_PATH}/9`}>Leaderboard pin new</Link></p> */}
      {/* kommenter inn det over for å legge til ting i scoreboard uten spille spillene */}
    </>
  )
}

export default Menu