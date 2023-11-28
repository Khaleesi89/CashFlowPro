import React from 'react'
import './Metas.css'
import Swal from 'sweetalert2';
import axios from "axios";
import { Navbar } from '../../components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
function Metas() {



  const altaMetas = async (e) => {
    e.preventDefault();
    console.log(e);
    let usuario = localStorage.getItem('auth_usuario');
    let usuarioObjeto = JSON.parse(usuario);
    let id = usuarioObjeto.id;
    const nuevaMeta = {
          user_id: id,
          descripcion: e.target.descripcion.value,
          importe: e.target.importe.value
        };
    console.log(nuevaMeta);
    try {
        const response =  await axios.post('api/metas-alta', nuevaMeta).then(res =>{
           
            console.log(res)
            if (res.status === 200 || res.status === 201) {
                //ALERTAS
                console.log(res);
                Swal.fire({
                icon: 'success',
                title: 'Meta agregada',
                timer: 1300,
                });
                /* navigate('/categorias-lista') */
            }
        });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Meta no agregada',
        text:'Revise que los datos estén todos completos',
        timer: 2000,
        });
        console.error(error);
    }; 
}
  return (
          <>
          <Navbar/>
          <div className="titulo-seccion ">
                  <h2>Metas Financieras</h2>
          </div>
          <form className="metasForm" onSubmit={altaMetas}>
              {/* Aquí coloca los campos y elementos de tu formulario para la Tab 1 */}
              <label className='form-label'>Descripción</label>
              <input type="text" className='form-control' name="descripcion"  id="descripcion" />

              <label className='form-label'>Importe</label>
              <input type="text" className='form-control' name="importe" id="importe" />

              <button className="btn btn-dark" type="submit">Crear Meta</button>
            </form>
          <Footer/>
          </>

    
  )
}

export default Metas