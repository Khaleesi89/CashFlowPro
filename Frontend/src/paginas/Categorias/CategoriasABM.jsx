import React from 'react';
import { Navbar } from '../../components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import { useState } from 'react';

function CategoriasABM() {

  
    const [categorias, setCategorias] = useState([]);
  
    // Resto del código del componente
  

  
/* FUNCION PARA TRAER LAS CATEGORIAS DEL USUARIO LOGUEADO */
  const categoriasUsuario = () => {

  }
/* FUNCION PARA HACER EL PDF */
  const generarPDF = () =>{
    const doc = new jsPDF();

    
  }
  
  const generarXL = () =>{
    const doc = new jsPDF();

    
  }
  

  return (
    <>
    
    <Navbar/>

    <div className="tabla m-5 p-5">
        <div className="titulo-seccion">
          <h2>Listado de categorías</h2>
        </div>
        <a href="/categorias-crear"> <button className='btn-dark'>Crear Categoría</button></a>
        <div className="generar">
          <button className='btn-dark' onClick={generarPDF}>PDF</button>
          <button className='btn-dark' onClick={generarXL}>XL</button>
        </div>
        <table className="table table-hover">
          {/* encabezado de la tabla */}
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
          {/* tuplas */}
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colSpan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
        </table>
    </div>
    <Footer/>
    </>

  )
}

export default CategoriasABM