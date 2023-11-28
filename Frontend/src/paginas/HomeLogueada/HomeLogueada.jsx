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
    const [meses, setMeses] = useState([]);
    const [anios, setAnios] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtener el id del usuario
                const usuario = JSON.parse(localStorage.getItem('auth_usuario'));
                const id = usuario.id;

                // Obtener la fecha actual
                const fecha = new Date().toJSON().slice(0, 10);
                const partesFecha = fecha.split('-');
                const periodoActual = partesFecha[1]+'/'+partesFecha[0];
                const fechaPaEnviar = {
                    periodo: periodoActual
                }
                // Hacer la solicitud Axios
                const response = await axios.post(`http://localhost:8000/api/graficos/${id}`,fechaPaEnviar);
                const info = response.data;
                //console.log(info);
                // Transformar el JSON y actualizar el estado
                const data = [];
                for (const key in info) {
                    if (info.hasOwnProperty(key)) {
                        const array = info[key];
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
                console.log(data);
                // Filtrar todos los elementos que NO tengan la etiqueta "ingresos"
                const otrosItems = data.filter(item => item.label !== 'ingresos');

                // Filtrar todos los elementos con la etiqueta "ingresos"
                const ingresosItems = data.filter(item => item.label === 'ingresos');

                // Obtener la suma de los valores de los elementos con la etiqueta "ingresos"
                const totalIngresos = ingresosItems.reduce((total, item) => total + item.value, 0);

                // Obtener la suma de los valores de los elementos que NO son "ingresos"
                const totalOtros = otrosItems.reduce((total, item) => total + item.value, 0);

                // Calcular el saldo disponible restando los valores de los otros items a los ingresos
                const saldoDisponible = totalIngresos - totalOtros;

                // Crear un nuevo elemento "Saldo Disponible"
                const nuevoSaldo = {
                    id: 'Saldo Disponible',
                    label: 'Saldo Disponible',
                    value: saldoDisponible,
                    color: generarColorHSL(), // Esta función debe estar definida en tu código
                };

                // Crear un nuevo arreglo con los elementos que no son de "ingresos" y el nuevo "Saldo Disponible"
                const newData = [...otrosItems, nuevoSaldo];

                // Actualizar el estado con la nueva información
                setData(newData); // Esto dependerá de cómo estés manejando el estado en tu aplicación
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
            
           /*  console.log(anios);
            console.log(meses); */
            //se usa una funcion de router dom server para transformar lo de jsx a html para el modal
            const mesesOptionsString = renderToString(mesesOptions);
            const aniosOptionsString = renderToString(aniosOptions);
            Swal.fire({
                title: 'Registre un Ingreso',
                html: `
                    <label className='form-label' style='font-weight: bold;'>Descripción</label> 
                    <input type="text" id="descripcion" className="swal2-input" style="padding: 10px;border-radius: 30px; margin-top: 5%;height: 40px;">
                    <br>
                    <label className='form-label' style='font-weight: bold;'>Importe</label> 
                    <input type="number" id="importe" className="swal2-input" style="padding: 10px;border-radius: 30px; margin-top: 5%;height: 40px;">
                    <br>
                    <label htmlFor="categoria" className="form-label">Categoría</label>
                    <select id="categoria" className="swal2-input" style="border-radius: 30px; margin-top: 5%;height: 40px;">
                        ${categoriasIngresoUsuario.map(categoria => `<option value="${categoria.id}">${categoria.descripcion}</option>`).join('')}
                    </select>
                    <br>
                    <label htmlFor="MesCorrespondiente" className="form-label">Mes al que corresponde el ingreso</label>
                    <br>
                    <select id="mesAlta" className="swal2-input" style="border-radius: 30px; margin-top: 5%;height: 40px;">
                    ${mesesOptionsString}
                    </select>
                    <select id="anioAlta" className="swal2-input" style="border-radius: 30px; margin-top: 5%;height: 40px;">
                    ${aniosOptionsString}
                    </select>
                `,
                showCancelButton: true,
                confirmButtonText: 'Guardar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    // Agregar cero adelante si el mes es de 1 a 9
                    let mes = document.getElementById('mesAlta').value
                    console.log(mes);
                    if (mes >= 1 && mes <= 9) {
                        mes = '0' + mes; // Agrega el cero adelante
                    }
                    console.log(mes);
                    let anio = document.getElementById('anioAlta').value
                    console.log()
                    const infoIngresoAlta = {
                        descripcion: document.getElementById('descripcion').value,
                        importe: document.getElementById('importe').value,
                        user_id: id,
                        categoria_id: document.getElementById('categoria').value,
                        periodoCorrespondiente: mes+'/'+anio
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
                            fetchData();
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


    // Actualizar el gráfico
    const fetchData = async () => {
        try {
        // Obtener el id del usuario
        const usuario = JSON.parse(localStorage.getItem('auth_usuario'));
        const id = usuario.id;
        // Obtener la fecha actual
        const fecha = new Date().toJSON().slice(0, 10);
        const partesFecha = fecha.split('-');
        const periodoActual = partesFecha[1]+'/'+partesFecha[0];
        const fechaPaEnviar = {
            periodo: periodoActual
        };
        // Hacer la solicitud Axios
        const response = await axios.post(`http://localhost:8000/api/graficos/${id}`,fechaPaEnviar);
        const info = response.data;
        //console.log(info);
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

        // Filtrar todos los elementos que NO tengan la etiqueta "ingresos"
        const otrosItems = data.filter(item => item.label !== 'ingresos');

        // Filtrar todos los elementos con la etiqueta "ingresos"
        const ingresosItems = data.filter(item => item.label === 'ingresos');

        // Obtener la suma de los valores de los elementos con la etiqueta "ingresos"
        const totalIngresos = ingresosItems.reduce((total, item) => total + item.value, 0);

        // Obtener la suma de los valores de los elementos que NO son "ingresos"
        const totalOtros = otrosItems.reduce((total, item) => total + item.value, 0);

        // Calcular el saldo disponible restando los valores de los otros items a los ingresos
        const saldoDisponible = totalIngresos - totalOtros;

        // Crear un nuevo elemento "Saldo Disponible"
        const nuevoSaldo = {
            id: 'Saldo Disponible',
            label: 'Saldo Disponible',
            value: saldoDisponible,
            color: generarColorHSL(), // Esta función debe estar definida en tu código
        };

        // Crear un nuevo arreglo con los elementos que no son de "ingresos" y el nuevo "Saldo Disponible"
        const newData = [...otrosItems, nuevoSaldo];

        // Actualizar el estado con la nueva información
        setData(newData); // Esto dependerá de cómo estés manejando el estado en tu aplicación
        //console.log(data);
        } catch (error) {
        console.error(error);
        }
    };

    //para los periodos del select
    useEffect(() => {
        const fechas = () => {
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
                setAnios(aniosOptions)
                setMeses(mesesOptions)
        }
        fechas();
        //console.log(anios)
    },[]);


    const consultarPeriodo = async (e)=>{
        e.preventDefault();
        try {
            // Obtener el id del usuario
            const usuario = JSON.parse(localStorage.getItem('auth_usuario'));
            const id = usuario.id;

            // Obtener la fecha enviada en el evento
            let mes = e.target.mes.value
            let anio = e.target.anio.value
            if (mes >= 1 && mes <= 9) {
                mes = '0' + mes; // Agrega el cero adelante
            }
            console.log(mes)
            console.log(anio)
            const fechaPaEnviar = {
                periodo: mes+'/'+anio
            }
            console.log(fechaPaEnviar)
            // Hacer la solicitud Axios
            const response = await axios.post(`http://localhost:8000/api/graficos/${id}`,fechaPaEnviar);
            const info = response.data;

            console.log(info);
           // Verificar si el objeto está vacío
           const isEmpty = Object.values(info).every(item => Array.isArray(item) && item.length === 0);

           if (isEmpty) {
            Swal.fire({
                icon: 'error',
                title: 'No hay movimientos en el período solicitado',
                text: 'Realice una nueva búsqueda',
                timer: 2000,
            });
           } else {
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

            console.log(data)
             // Actualizar el estado
             setData(data);
             
             //console.log(data);
           }

        } catch (error) {
            console.error(error);
        }
    };

    // Encuentra el elemento con la etiqueta "Saldo Disponible"
    const saldoDisponible = data.find(item => item.label === 'Saldo Disponible');

    return (
        <>
            <Navbar />
            <div className="home-container-logueada">
                <div className="grafico">
                    <MyResponsivePie data={data} />
                </div>
                <div className='textoOrdenado'>
                    <div className="explicacion">
                        <p>El gráfico es dinámico. Teniendo en cuenta los movimientos que ud. va ingresando, le va a mostrar lo que tiene disponible. También puede visualizar de períodos anteriores </p>
                    </div>
                    <div className="explicacion">
                        <p>Su saldo disponible es de ${saldoDisponible ? saldoDisponible.value : 0}</p>
                    </div>
                    <div className="botonesAcciones">
                        <button className='botonAccion' onClick={handleOpenModal}>INGRESO</button>
                        <Botones text="GASTO" />
                    </div>
                    
                    <div className="periodosAnteriores">
                        <label htmlFor="MesConsulta" className="explicacion">Mes a consultar</label>
                            <form className="consultaGrafico" onSubmit={consultarPeriodo}>
                                <select id="mes" className="form-select">
                                    {meses}
                                </select>
                                <select id="anio" className="form-select">
                                    {anios}
                                </select>
                                <button type="submit" className='botonAccion consulta'>Consultar</button>
                            </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};









