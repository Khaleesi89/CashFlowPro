import './HomeLogueada.css'
import { Navbar } from '../../components/Navbar/Navbar'
import { Botones } from '../../components/Botones/Botones'
import Footer from '../../Components/Footer/Footer'
import Swal from 'sweetalert2';
import axios from 'axios';
import { useState } from 'react';
import { MyResponsivePie } from '../../components/ResponsivePie/ResponsivePie';

export const HomeLogueada = () => {
    const [categorias, setCategorias] = useState([]);
   
    //FUNCION PARA TRAER LA INFO QUE SE UTILIZARÁ PARA EL GRAFICO

    let fecha = new Date().toJSON().slice(0, 10)
    console.log(fecha);

    //FUNCION PARA REALIZAR EL ALTA DE UN INGRESO
    const handleOpenModal = async () => {
        try {
            const usuario = JSON.parse(localStorage.getItem('auth_usuario'));
            const id = usuario.id;

            const response = await axios.get(`api/categorias/${id}`);
            const categoriasTotalesUsuario = response.data;
            //console.log(categoriasTotalesUsuario);
            const categoriasIngresoUsuario = categoriasTotalesUsuario.filter(categoria => categoria.tipo_categoria === "ingreso");
            //console.log(categoriasIngresoUsuario);
            /* const descripcionesCategoria = categoriasIngresoUsuario.map(categoria => categoria.descripcion);
            console.log(descripcionesCategoria); */
            setCategorias(categoriasIngresoUsuario);

            Swal.fire({
                title: 'Registre un Ingreso',
                html: `
                    <input type="text" id="descripcion" class="swal2-input" placeholder="Descripción">
                    <input type="number" id="importe" class="swal2-input" placeholder="Importe">
                    <select id="categoria" class="swal2-input">
                        ${categoriasIngresoUsuario.map(categoria => `<option value="${categoria.id}">${categoria.descripcion}</option>`).join('')}
                    </select>
                `,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    const infoIngresoAlta = {
                        descripcion: document.getElementById('descripcion').value,
                        importe: document.getElementById('importe').value,
                        user_id: id,
                        categoria_id: document.getElementById('categoria').value,
                    };
                    console.log(infoIngresoAlta)
                    axios.post('api/ingreso-alta', infoIngresoAlta)
                        .then(res => {
                            console.log(res);
                            if (res.status === 200 || res.status === 201) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Ingreso agregado',
                                    timer: 1300,
                                });
                                
                            }
                        })
                        /* .then(() => {
                            // Realiza alguna acción después de guardar, si es necesario
                            // Por ejemplo, navegar a una nueva página
                            // navigate('/cashflow');
                        }) */
                        .catch(error => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Ingreso no agregado',
                                text: 'Revise que los datos estén todos completos',
                                timer: 2000,
                            });
                            console.error(error);
                        });
                }
            });
        } catch (error) {
            console.error('Error al obtener categorías:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="home-container-logueada">
                <div className="grafico">
                   {/*  <MyResponsivePie data=infoFinanciera/> */}{/* el error viene de la data...arreglar data */}
                </div>
                <div className='textoOrdenado'>
                    <div className="explicacion">
                        <p>El gráfico es dinámico. Teniendo en cuenta los ingresos y gastos que ud. va ingresando, le va a mostrar lo que tiene disponible</p>
                    </div>
                    <div className="botonesAcciones">
                        <button className='botonAccion' onClick={handleOpenModal}>INGRESO</button>
                        {/* <Botones onClick={handleOpenModal} text="INGRESO" /> */}
                        <Botones text="GASTO" />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

    //TRAIGO LA INFORMACION PARA HACER EL GRAFICO QUE LO PASARÉ COMO PROP

    //ASI DEBE SER EL JSON
    /* {
        "id": "erlang",
        "label": "erlang",
        "value": 401,
        "color": "hsl(48, 70%, 50%)"
      }, */


      //FUNCION QUE GENERE EL OBJETO FILL
      /* function generateFillArray(data) {
        return data.map(category => ({
            match: { id: category.id },
            id: 'dots' // Puedes personalizar el patrón según tus necesidades
        }));
    }
    
    const fillArray = generateFillArray(dataFromDatabase); */