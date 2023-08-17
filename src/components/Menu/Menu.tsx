import { Link, useNavigate } from "react-router-dom"
import {useRef, useEffect} from "react";

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
    <div className='menu-grid' tabIndex={0} onKeyUp={(event) => handleInput(event)} ref={mainMenu}>
      <div className={'menu-title'}><h1>MINIBANK XTREME</h1></div>
      <div className={'menu-item--left'} style={{gridArea: 'b'}}> <h3><Link to={"/faktura/intro"}>{'> '}Betal faktura</Link></h3></div>
      <div className={'menu-item--right'} style={{gridArea: 'c'}}><h3><Link to={"/pin/intro"}>Ny PIN på kort{' <'}</Link></h3></div>
      <div className={'menu-item--left'} style={{gridArea: 'd'}}> <h3><Link to={"/dino"}>{'>'} DINO</Link></h3></div>
      <div className={'menu-item--right'} style={{gridArea: 'e'}}><h3>Jeg er også et spill {'<'}</h3></div>
      <div className={'menu-item--left'} style={{gridArea: 'f'}}> <h3>{'>'} Jeg er også et spill</h3></div>
      <div className={'menu-item--right'} style={{gridArea: 'g'}}><h3>Jeg er også et spill {'<'}</h3></div>
    </div>
  )
}

export default Menu