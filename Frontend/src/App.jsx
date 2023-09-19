
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
/* import {HomeLogueada} from './components/paginas/HomeLogueada/HomeLogueada';
import {Login} from './components/paginas/Login/Login'
import { Registrarse } from './components/Registrarse/Registrarse'; */
import { Home } from './paginas/Home/Home';
import Login from './paginas/Login/Login';
import Registro from './paginas/Registro/Registro';
import { HomeLogueada } from './paginas/HomeLogueada/HomeLogueada';
import { Personalizacion } from './paginas/Personalizacion/Personalizacion';
import PrivateRoutes from './PrivateRoutes';
import axios from "axios"

// Defino defaults para las consultas axios y no repetirlas en todos los archivos.

axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.withCredentials = true;

//esta funcion es un interceptor de solicitudes que se pueden ejecutar antes de la solicitu http
//o despuest de que se reciba una respuesta http. Este se ejecuta antes de que se realice una solicitud
//aqui se agrega un encabezado de autorizacion a todas las solicitudes salientes.
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
})


function App() {
  return (
                <BrowserRouter>
                    <Routes>
                     
                        {/* RUTAS PÚBLICAS */}
                        <Route exact path='/' element ={<Home/>}></Route>
                        <Route exact path='/login' element = {<Login/>}></Route>
                        <Route exact path='/register' element = {<Registro/>}></Route>

                        {/* RUTAS PRIVADAS */}
                        <Route path="/home" element={<PrivateRoutes component={<HomeLogueada/>} />} />
                        <Route path="/personalizacion" element={<PrivateRoutes component={<Personalizacion/>} />} />


                        
                        {/* PARA EL 404 */}
                        <Route path='*' element={<p>No hay nada aqui! Error 404</p>} />
                       
                       
                       
                       
                       
                       
                       
                       


                    </Routes>
                </BrowserRouter>
  );
}

export default App;
{/* <Route path="/mi-pagina-protegida" element={<PrivateRoutes component={MyProtectedComponent} />} /> ASI ME LA PASO BITO */}

{/*return <Component {...rest} />; ESTO PERMITE PASAR PROPS DIFERENTES A CADA COMPONENTE SIN NECESIDAD DE ENUMERARLOS Y NOMBRARLOS A TODOS  */}
{/*  */}
{/* <Route exact path='/home' element = {<HomeLogueada/>}></Route>
<Route exact path='/personalizacion' element = {<Personalizacion/>}></Route> */}

  {/* <Route path='/' element ={<Home/>}></Route>
  <Route path='/' element ={<HomeLogueada/>}></Route>
  <Route path='/editarPerfil' element = {<EditarPerfil/>}></Route>
  <Route path='/categorias' element = {<Categorias/>}></Route>
  <Route path='/finanzas' element = {<Finanzas/>}></Route>
  <Route path='/cashflow' element = {<Cashflow/>}></Route>
  <Route path='/avisos' element = {<Avisos/>}></Route>
  <Route path='/registro' element = {<Registrarse/>}></Route>
  <Route path='/homeLogueada' element ={<HomeLogueada/>}></Route>
  <Route path='/login' element = {<Login/>}></Route> */}