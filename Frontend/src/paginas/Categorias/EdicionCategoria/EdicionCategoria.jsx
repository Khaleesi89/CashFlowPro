import React, { useState, useEffect } from 'react';
import { Navbar } from '../../../components/Navbar/Navbar';
import Footer from '../../../Components/Footer/Footer';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import './EdicionCategoria.css';

export const EdicionCategoria = () => {
  const [descripcion, setDescripcion] = useState('');
  const [tipoCategoria, setTipoCategoria] = useState('');
  const navigate = useNavigate();
  const { idCategoria, descripcion_categoria, tipo_categoria } = useParams();

  //const { id, descripcionCategoria, tipoCategoria } = useParams();

  useEffect(() => {
    setDescripcion(descripcion_categoria);
    setTipoCategoria(tipo_categoria);
  }, [descripcion_categoria, tipo_categoria]);

  const editarCategoria = async (e) => {
      e.preventDefault();
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
  };

  return (
    <>
      <Navbar />
      <div className="body-categoria">
        <div className="titulo-seccion">
          <h2>Editar categoría</h2>
        </div>
        <form className=" formulario text-center" onSubmit={editarCategoria}>
          <div className="col">
            <label htmlFor="descripcion" className="form-label">Descripción</label>
            <input
              type="text"
              className="form-control"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              id="descripcion"
              
            />
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
                value="ingreso"
                checked={tipoCategoria === 'ingreso'}
                onChange={(e) => setTipoCategoria(e.target.value)}
              />
              <label className="form-check-label" htmlFor="ingreso">Ingreso</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="tipo_categoria"
                id="gasto"
                value="gasto"
                checked={tipoCategoria === 'gasto'}
                onChange={(e) => setTipoCategoria(e.target.value)}
              />
              <label className="form-check-label" htmlFor="gasto">Gasto</label>
            </div>
          </div>
          <div className="col">
            <button className="btn btn-primary" type="submit">Editar Categoría</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default EdicionCategoria;