import React from 'react'
import { Navbar } from '../../components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import './NoEncontrada.css'

function NoEncontrada() {
  return (
    <>
      <Navbar/>
      <div className="paginaDesconocida">
        <p>No hay nada aquí! Error 404</p>
      </div>



      <Footer/>
    
    </>
  )
}

export default NoEncontrada