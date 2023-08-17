import 'terminal.css'
import './App.scss'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Menu from './components/Menu/Menu'
import { FakturaSpill } from './components/FakturaSpill/FakturaSpill'
import HowToSequence from './components/HowToSequence/HowToSequence'
import PinSpill from './components/PINSpill/PINSpill'
import DinoGame from './components/DinoGame/DinoGame'

console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`)

function App() {
  const howToFaktura = [
    "These bills just keeps piling up. In this game, as in real life, it is important to pay your invoices as fast as possible",
    "This consists of entering a KID number, the account number of the recipient and the sum of the invoice. This will appear on the screen.",
    "Use the numpad of the terminal to enter the numbers. Once the first field is filled out, the focus will be shifted to next field. So you can just keep typing.",
    "Fill out 5 invoices as fast as possible. The timer will start when this screen disappears."
  ]

  const howToPIN = [
    "You hit your head and now you can't seem to remember your cards PIN-code anymore. We know the feeling",
    "Luckily we are able to generate a new one for you. The important thing is that you remember it.",
    "In this game you will be prompted with new PIN codes for your card. These will be displayed on the screen for a limited time.",
    "Once they disappear you need to show that you remember them by entering them in the input field.",
    "Reenter the PINs after they disappear as many times as possible. Are you attentive enough?"
  ]

  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Menu/>}/>
        <Route path={"/faktura/intro"} element={<HowToSequence howToPlayList={howToFaktura} gamePath={"/faktura"}/>}/>
        <Route path={"/faktura"} element={<FakturaSpill/>}/>
        <Route path={"/pin/intro"} element={<HowToSequence howToPlayList={howToPIN} gamePath={"/pin"}/>}/>
        <Route path={"/pin"} element={<PinSpill/>}/>
        <Route path={"/dino"} element={<DinoGame/>}/>
      </Routes>
    </Router>
  )
}

export default App
