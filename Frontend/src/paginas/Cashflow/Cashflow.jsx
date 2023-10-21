import { Navbar } from "../../components/Navbar/Navbar"
import Footer from "../../Components/Footer/Footer"
import { useState, useEffect } from "react"
import './Cashflow.css'
import Swal from 'sweetalert2';
import axios from "axios";


export const Cashflow = () => {

    //sacar las metas de cada usuario
    const [metas, setMetas] = useState([]);
    const [metaId, setMetaId] = useState('');

    const listaMetas = async () => {
        let usuario = localStorage.getItem('auth_usuario');
        let usuarioObjeto = JSON.parse(usuario);
        let id = usuarioObjeto.id;
        const response = await fetch("http://localhost:8000/api/metas/"+id);
        const data = await response.json();
        //console.log(data);
        setMetas(data);
    }
  
    useEffect(() => {
        listaMetas();
      }, []);
  
    const altaAhorrro = async (e) => {
        e.preventDefault();
        console.log(e);
        let usuario = localStorage.getItem('auth_usuario');
        let usuarioObjeto = JSON.parse(usuario);
        let id = usuarioObjeto.id;
        const nuevoAhorro = {
              descripcion: e.target.descripcion.value,
              user_id: id,
              meta_id: metaId,
              importe: e.target.importe.value
            };
        console.log(nuevoAhorro);
        try {
            const response =  await axios.post('api/ahorro-alta', nuevoAhorro).then(res =>{
               
                console.log(res)
                if (res.status === 200 || res.status === 201) {
                    //ALERTAS
                    console.log(res);
                    Swal.fire({
                    icon: 'success',
                    title: 'Ahorro agregado',
                    timer: 1300,
                    });
                    /* navigate('/categorias-lista') */
                }
            });
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Ahorro no agregado',
            text:'Revise que los datos estén todos completos',
            timer: 2000,
            });
            console.error(error);
        }; 
    }

    //hacer que se rendericen las tabs

    
    return (
        <>
        <Navbar/>
        <div className="titulo-seccion ">
            <h2>Cashflow</h2>
        </div>
        <div className="tabulacion">
            <ul className="nav nav-tabs justify-content-center">
                <li className="nav-item">
                <a className="nav-link active" id="tab1-tab" aria-current="page" data-toggle="tab" href="#tab1" role="tab" aria-controls="tab1" aria-selected="true">Ahorros</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" id="tab2-tab" data-toggle="tab" href="#tab2" role="tab" aria-controls="tab2" aria-selected="false">Inversiones</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" data-toggle="tab" id="tab3-tab" href="#tab3" role="tab" aria-controls="tab3" aria-selected="false">Préstamos a 3ros</a>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
                    {/* Contenido del formulario para la Tab 1 */}
                    <div className="titulo-seccion ">
                        <h2 className="ahorroTitle ">Ahorros</h2>
                    </div>
                    <form className="ahorroForm" onSubmit={altaAhorrro}>
                        {/* Aquí coloca los campos y elementos de tu formulario para la Tab 1 */}
                        <label className='form-label'>Descripción</label>
                        <input type="text" className='form-control' name="descripcion"  id="descripcion" />

                        <label className='form-label'>Importe</label>
                        <input type="text" className='form-control' name="importe" id="importe" />

                        <label className='form-label'>Metas disponibles</label>
                        <div className="">
                            <select className="form-select" aria-label="Floating label select example" onChange= {(e) => setMetaId(e.target.value)}>
                                <option hidden selected>Selecciona una meta</option>
                                {metas.map((meta) => (
                                    <option key={meta.id} id={meta.id} name={meta.descripcion} value={meta.id}>{meta.descripcion} </option>))}
                            </select>
                        </div>
                        <button className="btn btn-dark" type="submit">Crear Ahorro</button>
                    </form>
                </div>
                <div className="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
                {/* Contenido del formulario para la Tab 2 */}
                    <form>
                            {/* Aquí coloca los campos y elementos de tu formulario para la Tab 1 */}
                            <label className='form-label'>Descripción</label>
                            <input type="text" className='form-control' name="descripcion"  id="descripcion" />

                            <label className='form-label'>Importe</label>
                            <input type="text" className='form-control' name="importe" id="importe" />

                            <div className="form-floating">
                                <select className="form-select" id="floatingSelect" aria-label="Floating label select example" >
                                    <option value="Mis metas">Mis metas</option>
                                    {/* {metas.map((meta) => (
                                        <option key={meta.id} value={meta.descripcion}>{meta.descripcion}</option>))} */}
                                </select>
                                <label htmlFor="floatingSelect">Metas disponibles</label>
                            </div>
                    </form>
                </div>
                <div className="tab-pane fade" id="tab3" role="tabpanel" aria-labelledby="tab3-tab">
                {/* Contenido del formulario para la Tab 3 */}
                    <form>
                                {/* Aquí coloca los campos y elementos de tu formulario para la Tab 1 */}
                                <label className='form-label'>Descripción</label>
                                <input type="text" className='form-control' name="descripcion"  id="descripcion" />

                                <label className='form-label'>Importe</label>
                                <input type="text" className='form-control' name="importe" id="importe" />

                                <div className="form-floating">
                                    <select className="form-select" id="floatingSelect" aria-label="Floating label select example" >
                                        <option value="Mis metas">Mis metas</option>
                                        {/* {metas.map((meta) => (
                                            <option key={meta.id} value={meta.descripcion}>{meta.descripcion}</option>))} */}
                                    </select>
                                    <label htmlFor="floatingSelect">Metas disponibles</label>
                                </div>
                    </form>
                </div>
            </div>

        </div>

        <Footer/>
        </>
           
      )
  
  
  }