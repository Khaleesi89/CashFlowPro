import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import Swal from 'sweetalert2';
import { Navbar } from '../../components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import './Metas.css';

export const MetasSeguimiento = () => {
  const [metas, setMetas] = useState([]); // Estado para guardar las metas
  const [totalAhorrosUsuario, setTotalAhorrosUsuario] = useState([]); // Estado para guardar los ahorros
  const [actualizarMetas, setActualizarMetas] = useState(true); // Bandera para controlar la actualización 

  
  const ahorrosUsuario = useCallback(async () => {
    try {
      let usuario = localStorage.getItem('auth_usuario');
      let usuarioObjeto = JSON.parse(usuario);
      let id = usuarioObjeto.id;
      const response = await axios.get('/api/ahorrovsmetas/' + id);
      setTotalAhorrosUsuario(response.data);
    } catch (error) {
      console.error('Error al obtener los ahorros:', error);
    }
  }, []);

  useEffect(() => {
    ahorrosUsuario();
  }, []);

  useEffect(() => {
    const calcularPorcentaje = (meta) => {
      const metaAhorros = totalAhorrosUsuario.filter(
        (ahorro) => ahorro.meta_id === meta.id
      );
      const totalAhorros = metaAhorros.reduce(
        (total, ahorro) => total + parseFloat(ahorro.importe),
        0
      );
      const porcentaje = (totalAhorros / meta.importe) * 100;
      
      // Verificar si totalAhorros es un número antes de usar toFixed
      const totalAhorrosDecimal = typeof totalAhorros === 'number' ? totalAhorros.toFixed(2) : totalAhorros;
      const loQueFaltaPagar = meta.importe - totalAhorrosDecimal;
      return {
        porcentaje: porcentaje.toFixed(2),
        totalAhorros: totalAhorrosDecimal,
        faltaLlegar: loQueFaltaPagar.toFixed(2)
      };
    };
    

    if (actualizarMetas) {
      const metasConPorcentaje = metas.map((meta) => {
        const { porcentaje, totalAhorros,faltaLlegar } = calcularPorcentaje(meta);
        return {
          ...meta,
          porcentaje,
          totalAhorros,
          faltaLlegar,
        };
      });
      console.log(metasConPorcentaje);
      setMetas(metasConPorcentaje);
      setActualizarMetas(false); // Desactivar la bandera después de la actualización para evitar la renderizacion infinita
    }
  }, [totalAhorrosUsuario, metas, actualizarMetas]);

  const metasUsuario = useCallback(async () => {
    try {
      let usuario = localStorage.getItem('auth_usuario');
      let usuarioObjeto = JSON.parse(usuario);
      let id = usuarioObjeto.id;
      const response = await axios.get('/api/metas/' + id);
      const data = response.data;
      if (data && data.length > 0) {
        setMetas(data);
        setActualizarMetas(true); // Activar la bandera para actualizar las metas
      } else {
        Swal.fire({
          icon: 'error',
          title: 'El usuario no posee metas',
          text: 'Realice el alta de una meta',
          timer: 2000,
        });
      }
    } catch (error) {
      console.error('Error al obtener las metas:', error);
    }
  }, []);

  useEffect(() => {
    metasUsuario();
  }, []);

  

  const handleOpenModal = useCallback(async () => {
    try {
      Swal.fire({
        title: 'Registre una nueva meta',
        html: `
          <form className="ahorroForm">
            <label className='form-label'>Descripción</label>
            <input type="text" className='form-control' name="descripcion"  id="descripcion" />
            <label className='form-label'>Importe</label>
            <input type="text" className='form-control' name="importe" id="importe" />
          </form>
        `,
        showCancelButton: true,
        confirmButtonText: 'Crear meta',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          let usuario = localStorage.getItem('auth_usuario');
          let usuarioObjeto = JSON.parse(usuario);
          let id = usuarioObjeto.id;
          const infoMetaAlta = {
            user_id: id,
            descripcion: document.getElementById('descripcion').value,
            importe: document.getElementById('importe').value,
          };
          axios.post('api/metas-alta', infoMetaAlta)
            .then(res => {
              console.log(res);
              if (res.status === 200 || res.status === 201) {
                Swal.fire({
                  icon: 'success',
                  title: 'Meta agregada',
                  timer: 1300,
                });
                // Actualizar las metas después de agregar una nueva
                metasUsuario();
                ahorrosUsuario(); // Llamar a ahorrosUsuario para recalcular el porcentaje
              }
            })
            .catch(error => {
              Swal.fire({
                icon: 'error',
                title: 'Meta no agregada',
                text: 'Revise que los datos estén todos completos',
                timer: 2000,
              });
              console.error(error);
            });
        }
      });
    } catch (error) {
      console.error('Error al querer dar el alta a la meta:', error);
    }
  }, [metasUsuario, ahorrosUsuario]);

    return (
        <>
            <Navbar />
            <div className="titulo-seccion ">
                <h2>Metas Financieras</h2>
            </div>
            <button className='botonAccion' onClick={handleOpenModal}>ALTA DE META</button>
            <div className="table-container">
                <table id="data-table" className="modern-table">
                    <thead>
                        <tr>
                            <th>Descripción</th>
                            <th>Importe</th>
                            <th>Progreso</th>
                            <th>Porcentaje</th>
                            <th>$ Ahorrado</th>
                            <th>$ Faltante</th>
                        </tr>
                    </thead>
                    <tbody id="table-body">
                        {/* Mapea las metas para llenar la tabla dinámicamente */}
                        {metas.map(meta => (
                            
                            <tr key={meta.id}>
                                <td>{meta.descripcion}</td>
                                <td>$ {meta.importe}</td>
                                <td>
                                {meta.porcentaje && (
                                    <div className="progress-bar bg-success" style={{ width: `${meta.porcentaje}%` }}>
                                        <p>a</p>
                                    </div>
                                )}
                                </td>
                                <td>{meta.porcentaje}%</td>
                                <td>$ {meta.totalAhorros}</td>
                                <td>$ {meta.faltaLlegar}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    );
};

export default MetasSeguimiento;





/* import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Navbar } from '../../components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import './Metas.css';

export const MetasSeguimiento = () => {
    //variables
    const [metas, setMetas] = useState([]); // Estado para guardar las metas
    const [totalAhorrosUsuario, setTotalAhorrosUsuario] = useState([]); // Estado para guardar las metas

    //para sacar porcentaje ->  total - lo pagado = resultado / total * 100 = es lo que sigue debiendo 
    const ahorrosUsuario = async () => {
        try {
            let usuario = localStorage.getItem('auth_usuario');
            let usuarioObjeto = JSON.parse(usuario);
            let id = usuarioObjeto.id;
            const response = await axios.get('/api/ahorrovsmetas/' + id);
            setTotalAhorrosUsuario(response.data);
        } catch (error) {
            console.error('Error al obtener los ahorros:', error);
        }
    }

    useEffect(() => {
        ahorrosUsuario();
    }, []);

    const metasUsuario = async () => {
        try {
            let usuario = localStorage.getItem('auth_usuario');
            let usuarioObjeto = JSON.parse(usuario);
            let id = usuarioObjeto.id;
            const response = await axios.get('/api/metas/' + id);
            const data = response.data;
            if (data && data.length > 0) {
                setMetas(data);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'El usuario no posee metas',
                    text: 'Realice el alta de una meta',
                    timer: 2000,
                });
            }
        } catch (error) {
            console.error('Error al obtener las metas:', error);
        }
    };

    useEffect(() => {
        metasUsuario();
    }, [totalAhorrosUsuario]);

    const calcularPorcentaje = (meta) => {
        const metaAhorros = totalAhorrosUsuario.filter(ahorro => ahorro.id_meta === meta.id);
        //console.log(totalAhorrosUsuario);
        const totalAhorros = metaAhorros.reduce((total, ahorro) => total + ahorro.importe, 0);
        const porcentaje = (totalAhorros / meta.importe) * 100;
        console.log(porcentaje);
        return porcentaje.toFixed(2); // Redondear el porcentaje a 2 decimales
    };

    const handleOpenModal = async () => {
        try {
            
            Swal.fire({
                title: 'Registre una nueva meta',
                html: `
                <form className="ahorroForm">
                <label className='form-label'>Descripción</label>
                <input type="text" className='form-control' name="descripcion"  id="descripcion" />
  
                <label className='form-label'>Importe</label>
                <input type="text" className='form-control' name="importe" id="importe" />
  
              </form>
                `,
                showCancelButton: true,
                confirmButtonText: 'Crear meta',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    let usuario = localStorage.getItem('auth_usuario');
                    let usuarioObjeto = JSON.parse(usuario);
                    let id = usuarioObjeto.id;
                    const infoMetaAlta = {
                        user_id: id,
                        descripcion: document.getElementById('descripcion').value,
                        importe: document.getElementById('importe').value,
                    };
                    //console.log(infoMetaAlta)
                    axios.post('api/metas-alta', infoMetaAlta)
                        .then(res => {
                            console.log(res);
                            if (res.status === 200 || res.status === 201) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Meta agregada',
                                    timer: 1300,
                                });
                               // Actualizar las metas después de agregar una nueva
                                metasUsuario(); 
                            }
                        })
                        
                        .catch(error => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Meta no agregada',
                                text: 'Revise que los datos estén todos completos',
                                timer: 2000,
                            });
                            console.error(error);
                        });
                }
            });
        } catch (error) {
            console.error('Error al querer dar el alta a la meta:', error);
        }
    };


    
    return (
        <>
        <Navbar/>
        <div className="titulo-seccion ">
                  <h2>Metas Financieras</h2>
        </div>
        <button className='botonAccion' onClick={handleOpenModal}>ALTA DE META</button>
        <div className="table-container">
            <table id="data-table" className="modern-table">
                <thead>
                    <tr>
                        <th>Descripción</th>
                        <th>Importe</th>
                        <th>Progreso</th>
                    </tr>
                </thead>
                
                <tbody id="table-body">
                    {metas.map(meta => (
                        <tr key={meta.id}>
                            <td>{meta.descripcion}</td>
                            <td>$ {meta.importe}</td>
                            <td>
                                <div className="progress" role="progressbar" aria-label="Success example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                                    <div className="progress-bar bg-success" style={{ width: `${calcularPorcentaje(meta)}%` }}>{calcularPorcentaje(meta)}%</div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <Footer/>
        </>
    );
};


export default MetasSeguimiento;
 */