import 'terminal.css'
import './App.scss'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import Menu from './components/Menu/Menu'
import { FakturaSpill } from './components/FakturaSpill/FakturaSpill'

console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`)

function App() {


  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<Menu/>}/>
        <Route path={"/faktura"} element={<FakturaSpill/>}/>
      </Routes>
    </Router>
  )
}

export default App
