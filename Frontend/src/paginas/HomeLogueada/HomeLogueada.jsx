import './HomeLogueada.css';
import { Navbar } from '../../components/Navbar/Navbar';
import { Botones } from '../../components/Botones/Botones';
import Footer from '../../Components/Footer/Footer';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { MyResponsivePie } from '../../components/ResponsivePie/ResponsivePie';
import { renderToString } from 'react-dom/server';


export const HomeLogueada = () => {
    const [categorias, setCategorias] = useState([]);
    const [data, setData] = useState([]);
    //console.log(data);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtener el id del usuario
                const usuario = JSON.parse(localStorage.getItem('auth_usuario'));
                const id = usuario.id;

                // Obtener la fecha actual
                const fecha = new Date().toJSON().slice(0, 10);

                // Hacer la solicitud Axios
                const response = await axios.get(`http://localhost:8000/api/graficos/${id}/${fecha}`);
                const info = response.data;

                // Transformar el JSON y actualizar el estado
                const data = [];

                for (const key in info) {
                    if (info.hasOwnProperty(key)) {
                        const array = info[key];
                        //data[key] = data[key] || [];

                        for (const objeto of array) {
                            const existingItem = data.find(item => item.id === (objeto.categorias?.descripcion || objeto.descripcion));

                            if (existingItem) {
                                existingItem.value = Number(existingItem.value) + Number(objeto.importe);
                            } else {
                                data.push({
                                    id: objeto.categorias?.descripcion || objeto.descripcion,
                                    label: key,
                                    value: Number(objeto.importe),
                                    color: generarColorHSL(),
                                });
                            }
                        }
                    }
                }

                // Actualizar el estado
                setData(data);
                //console.log(data);
            } catch (error) {
                console.error(error);
            }
        };

        // Llamar a fetchData
        fetchData();
    }, []); // Dependencia vacía para ejecutarse solo después de la montura inicial

    //FUNCION PARA HACER EL COLOR RANDOM DEL GRAFICO Y SUS PARTES
    function generarColorHSL() {
        const hue = Math.floor(Math.random() * 360);
        const saturation = Math.floor(Math.random() * 101);
        const lightness = Math.floor(Math.random() * 101);
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

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
            setCategorias(categoriasIngresoUsuario);
            const fechaActual = new Date();
            const anioActual = fechaActual.getFullYear();
            const cincoAniosDespues = anioActual + 5;
            const meses = Array.from({ length: 12 }, (_, i) => i + 1);
            const mesesOptions = meses.map((mes) => (
                <option key={mes} value={mes}>
                  {mes}
                </option>
              ));
            const aniosOptions = [];
            for (let i = anioActual; i <= cincoAniosDespues; i++) {
                aniosOptions.push(
                    <option key={i} value={i}>
                    {i}
                    </option>
                );
            }
            //console.log(mesesOptions);
            //console.log(aniosOptions);
            //se usa una funcion de router dom server para transformar lo de jsx a html para el modal
            const mesesOptionsString = renderToString(mesesOptions);
            const aniosOptionsString = renderToString(aniosOptions);


            Swal.fire({
                title: 'Registre un Ingreso',
                html: `
                    <input type="text" id="descripcion" className="swal2-input" placeholder="Descripción">
                    <input type="number" id="importe" className="swal2-input" placeholder="Importe">
                    <br>
                    <label htmlFor="categoria" className="form-label">Categoría</label>
                    <select id="categoria" className="swal2-input">
                        ${categoriasIngresoUsuario.map(categoria => `<option value="${categoria.id}">${categoria.descripcion}</option>`).join('')}
                    </select>
                    <br>
                    <label htmlFor="MesCorrespondiente" className="form-label">Mes al que corresponde el ingreso</label>
                    <br>
                    <select id="mes" className="swal2-input">
                    ${mesesOptionsString}
                    </select>
                    <select id="anio" className="swal2-input">
                    ${aniosOptionsString}
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
                        periodoCorrespondiente: document.getElementById('mes').value+'/'+document.getElementById('anio').value
                    };
                    //console.log(infoIngresoAlta)
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
                    <MyResponsivePie data={data} />
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











/* import './HomeLogueada.css'
import { Navbar } from '../../components/Navbar/Navbar'
import { Botones } from '../../components/Botones/Botones'
import Footer from '../../Components/Footer/Footer'
import Swal from 'sweetalert2';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { MyResponsivePie } from '../../components/ResponsivePie/ResponsivePie';

export const HomeLogueada = () => {
    const [categorias, setCategorias] = useState([]);
   
    //FUNCION PARA TRAER LA INFO QUE SE UTILIZARÁ PARA EL GRAFICO

   useEffect(() => {
        //obtencion del id
        let usuario = localStorage.getItem('auth_usuario');
        let usuarioObjeto = JSON.parse(usuario);
        let id = usuarioObjeto.id;
        //console.log(id);
        //obtencion fecha actual fecha
        let fecha = new Date().toJSON().slice(0, 10)
        //console.log(fecha);
        axios.get("http://localhost:8000/api/graficos/"+id+"/"+fecha)
            .then((response) => {
                let data = response.data;
                //console.log(data);
                //TRANSFORMACION DEL JSON PARA EL GRAFICO
                //let data = transformerJson(info);
                //FUNCION PARA MODIFICAR AL JSON 
                const jsonModificado = {};
                // Iterar sobre cada key del objeto original
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        const array = data[key];
                        //console.log(key)
                        //console.log(array)
                        if(key === "ingresos" || key === "gastos") {
                            // Verificar si jsonModificado[key] existe y si no, inicializarlo como un array vacío
                            jsonModificado[key] = jsonModificado[key] || [];
                            // Iterar sobre los objetos dentro de cada array
                            for (const objeto of array) {
                                const existingItem = jsonModificado[key].find(item => item.id === objeto.categorias.descripcion);
                                if (existingItem) {
                                    // Si ya existe, actualizar el valor
                                    existingItem.value = Number(existingItem.value) + Number(objeto.importe);
                                } else {
                                    // Si no existe, agregar un nuevo elemento
                                    jsonModificado[key].push({
                                        id: objeto.categorias.descripcion,
                                        label: key,
                                        value: Number(objeto.importe), // Convertir a número
                                        color: generarColorHSL(),
                                    });
                                }
                            }
                            //console.log(jsonModificado);
                        }else{
                            // Verificar si jsonModificado[key] existe y si no, inicializarlo como un array vacío
                            jsonModificado[key] = jsonModificado[key] || [];
                            // Iterar sobre los objetos dentro de cada array
                            for (const objeto of array) {
                                //console.log("dentro del else")
                                //console.log(objeto)
                                const existingItem = jsonModificado[key].find(item => item.id === objeto.descripcion);

                                if (existingItem) {
                                    // Si ya existe, actualizar el valor
                                    existingItem.value = Number(existingItem.value) + Number(objeto.importe);
                                } else {
                                    // Si no existe, agregar un nuevo elemento
                                    jsonModificado[key].push({
                                        id: objeto.descripcion,
                                        label: key,
                                        value: Number(objeto.importe), // Convertir a número
                                        color: generarColorHSL(),
                                    });
                                }
                            }
                            console.log(jsonModificado);
                        }
                    }
                }
            })
            .catch((error)=>{
                console.error(error);
            })
    });


    //FUNCION PARA HACER EL COLOR RANDOM DEL GRAFICO Y SUS PARTES
    function generarColorHSL() {
        const hue = Math.floor(Math.random() * 360);
        const saturation = Math.floor(Math.random() * 101);
        const lightness = Math.floor(Math.random() * 101);
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      }


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
                   <MyResponsivePie data= {jsonModificado}/> 
                </div>
                <div className='textoOrdenado'>
                    <div className="explicacion">
                        <p>El gráfico es dinámico. Teniendo en cuenta los ingresos y gastos que ud. va ingresando, le va a mostrar lo que tiene disponible</p>
                    </div>
                    <div className="botonesAcciones">
                        <button className='botonAccion' onClick={handleOpenModal}>INGRESO</button>
                        <Botones text="GASTO" />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
 */