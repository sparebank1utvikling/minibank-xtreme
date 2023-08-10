import 'terminal.css'
import './App.scss'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Menu from './components/Menu/Menu'
import { FakturaSpill } from './components/FakturaSpill/FakturaSpill'
import HowToSequence from './components/HowToSequence/HowToSequence'

console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`)

function App() {
  const howTo = [
    "In this game you have to pay your invoices as fast as possible",
    "This consists of entering your KID number, the account number of the recipient and the sum of the invoice. This will appear on the screen.",
    "Use the numpad of the terminal to enter the numbers. Once the first field is filled out, the focus will be shifted to next field. So you can just keep typing.",
    "Fill out 5 invoices as fast as possible. The timer will start when this screen disappears."
  ]

  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Menu/>}/>
        <Route path={"/faktura/intro"} element={<HowToSequence howToPlayList={howTo} gamePath={"/faktura"}/>}/>
        <Route path={"/faktura"} element={<FakturaSpill/>}/>
      </Routes>
    </Router>
  )
}

export default App
