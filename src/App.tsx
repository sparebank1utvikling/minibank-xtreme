import { useState } from 'react'
import 'terminal.css'
import './App.scss'

console.log('[App.tsx]', `Hello world from Electron ${process.versions.electron}!`)

function App() {


  return (
    <div className='menu-grid'>
      <div className={'menu-title'}><h1>MINIBANK XTREME</h1></div>
      <div className={'menu-item--left'} style={{gridArea: 'b'}}> <h3>{'>'} Jeg er et spill</h3></div>
      <div className={'menu-item--right'} style={{gridArea: 'c'}}><h3>Jeg er også et spill {'<'}</h3></div>
      <div className={'menu-item--left'} style={{gridArea: 'd'}}> <h3>{'>'} Jeg er også et spill</h3></div>
      <div className={'menu-item--right'} style={{gridArea: 'e'}}><h3>Jeg er også et spill {'<'}</h3></div>
      <div className={'menu-item--left'} style={{gridArea: 'f'}}> <h3>{'>'} Jeg er også et spill</h3></div>
      <div className={'menu-item--right'} style={{gridArea: 'g'}}><h3>Jeg er også et spill {'<'}</h3></div>

    </div>
  )
}

export default App
