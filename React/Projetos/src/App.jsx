import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import ListaPessoas from './components/listas_e_renderizacao/ListaPessoas'
import Calculadora from './components/useStates/Calculadora'
import CalculoIMC from './components/useStates/calculadoraIMC'
import Produtos from './Exercicios_Fixacao/Produtos'
import MapsExe from './Exercicios_Fixacao/MapsExe'
import ApiViaCep from './components/fetch/ApiViaCep'



function App() {

  return (
    <>
    <div className='App'>
          <ApiViaCep/>
    </div>
    </>
  )
}

export default App
