import React from 'react'
import { Navbar } from '../../../components/Navbar/Navbar';
import Footer from '../../../Components/Footer/Footer';
import { useState } from 'react';

function AltaCategoria() {

  const [descripcion, setDescripcion] = useState([]);
  

  const altaCategoria =(e) =>{
    e.preventDefault();
    let usuario = localStorage.getItem('auth_usuario');
    let usuarioObjeto = JSON.parse(usuario);
    let id = usuarioObjeto.id;
    const categoriaNueva = {
          descripcion: e.target.descripcion.value,
          tipo_categoria: e.target.tipo_categoria.value,
          user_id: id,
        };
        console.log(categoriaNueva);
        
  }
  return (
        <>
        <Navbar/>
          <form className="text-center" onSubmit={altaCategoria}>{/* is-valid en la clase para validad de bootstrap */}
              <div className="col">
                  <label htmlFor="descripcion" className="form-label">Descripción</label>
                  <input type="text" className="form-control " value={descripcion} onChange={(e)=> setDescripcion(e.target.value)} id="descripcion" required />
                  <div className="invalid-feedback">
                      ok!
                  </div>
              </div>
              <div className="col">
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="tipo_categoria" id="ingreso" value="ingreso"/>
                  <label className="form-check-label" htmlFor="ingreso">Ingreso</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="tipo_categoria" id="gasto" value="gasto"/>
                  <label className="form-check-label" htmlFor="gasto">Gasto</label>
                </div>
              </div>
              <div className="col">
              <button className="btn btn-primary" type="submit">Crear Categoría</button>
              </div>
          </form>
        <Footer/>
        </>
  )
}

export default AltaCategoria