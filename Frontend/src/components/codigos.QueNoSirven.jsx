const go = useNavigate();
const logout = async() => {
        console.log('logout');
        storage.remove('authToken');
        storage.remove('authUser');
        await axios.get('/api/logout', storage.get('authToken'));
        go('/')      

    }

    {/* <Route exact path='/' element ={<Home/>}></Route>
    <Route exact path='/login' element = {<Login/>}></Route>
    <Route exact path='/register' element = {<Registro/>}></Route>
    <Route element={<ProtectedRoutes/>}>
      <Route exact path='/home' element = {<HomeLogueada/>}></Route>
      <Route exact path='/personalizacion' element = {<Personalizacion/>}></Route> */}




      const SessionOpen = () => {
        respond = axios.get('http://localhost:8000/user')
        console.log(respond)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
      }






import React from 'react'
import { Navbar } from '../../../components/Navbar/Navbar';
import Footer from '../../../Components/Footer/Footer';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

export const EdicionCategoria = () => {
  const [descripcion, setDescripcion] = useState([]);
  const [tipo_Categoria, setTipoCategoria] = useState([]);
  const navigate = useNavigate();

  const {idCategoria,descripcion_categoria,tipo_categoria} = useParams();
  
  const handleChange = (e) => {
    if (e.target.name === 'descripcion') {
      setDescripcion(e.target.value);
    } else if (e.target.name === 'tipo_categoria') {
      setTipoCategoria(e.target.value);
    }
  };
  
  const editarCategoria = async (e) =>{
      e.preventDefault();
      let usuario = localStorage.getItem('auth_usuario');
      let usuarioObjeto = JSON.parse(usuario);
      let idUsuario = usuarioObjeto.id;
      const categoriaNueva = {
            id: idCategoria,
            descripcion: e.target.descripcion.value,
            tipo_categoria: e.target.tipo_categoria.value,
            user_id: idUsuario,
          };
      console.log(categoriaNueva);
      try {
        const response =  await axios.post('api/categoria-editar', categoriaNueva).then(res =>{
           
            console.log(res)
            if (res.status === 200 || res.status === 201) {
                //ALERTAS
                console.log(res);
                Swal.fire({
                icon: 'success',
                title: 'Categoría modificada',
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
          <h2>Editar categoría</h2>
        </div>
          <form className="text-center" onSubmit={editarCategoria}>{/* is-valid en la clase para validad de bootstrap */}
              <div className="col">
                  <label htmlFor="descripcion" className="form-label">Descripción</label>
                  <input 
                  type="text" 
                  className="form-control " 
                  value={descripcion_categoria} 
                  onChange={handleChange} 
                  id="descripcion" 
                  required />
                  <div className="invalid-feedback">
                      ok!
                  </div>
              </div>
              <div className="col">
                <div className="form-check form-check-inline">
                  <input 
                  className="form-check-input" 
                  type="radio" 
                  name="tipo_categoria" 
                  id="ingreso" 
                  onChange={handleChange}
                  value="ingreso"
                  defaultChecked = {tipo_categoria === 'ingreso'}/>{/* marca el que este dispuesto en lo que viene por url */}
                  <label className="form-check-label" htmlFor="ingreso">Ingreso</label>
                </div>
                <div className="form-check form-check-inline">
                  <input 
                  className="form-check-input" 
                  type="radio" 
                  name="tipo_categoria" 
                  id="gasto" 
                  value="gasto"
                  onChange={handleChange}
                  defaultChecked = {tipo_categoria === 'gasto'}/>
                  <label className="form-check-label" htmlFor="gasto">Gasto</label>
                </div>
              </div>
              <div className="col">
              <button className="btn btn-primary" type="submit">Editar Categoría</button>
              </div>
          </form>

        </div>
        <Footer/>
        </>
  )
}

export default EdicionCategoria