import React from 'react'
import { Navbar } from '../../../components/Navbar/Navbar';
import Footer from '../../../Components/Footer/Footer';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import './AltaCategoria.css'

function AltaCategoria() {

  const [descripcion, setDescripcion] = useState([]);
  const navigate = useNavigate();

  const altaCategoria = async (e) =>{
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
      try {
        const response =  await axios.post('api/categoria-alta', categoriaNueva).then(res =>{
           
            console.log(res)
            if (res.status === 200 || res.status === 201) {
                //ALERTAS
                console.log(res);
                Swal.fire({
                icon: 'success',
                title: 'Categoría agregada',
                timer: 1300,
                });
                navigate('/categorias-lista')
            }
        });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Categoría no agregada',
        text:'Revise que los datos estén todos completos',
        timer: 2000,
        });
        console.error(error);
    }; 
        
  }
  return (
        <>
        <Navbar/>
        <div className="body-categoria">
            <div className="titulo-seccion">
              <h2>Alta de categoría</h2>
            </div>
            <form className="formulario text-center" onSubmit={altaCategoria}>{/* is-valid en la clase para validad de bootstrap */}
                <div className="col">
                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                    <input type="text" className="form-control " value={descripcion} onChange={(e)=> setDescripcion(e.target.value)} id="descripcion" required />
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

        </div>
        <Footer/>
        </>
  )
}

export default AltaCategoria