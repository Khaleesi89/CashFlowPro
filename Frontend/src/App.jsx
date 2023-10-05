
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './paginas/Home/Home';
import Login from './paginas/Login/Login';
import Registro from './paginas/Registro/Registro';
import { HomeLogueada } from './paginas/HomeLogueada/HomeLogueada';
import { Personalizacion } from './paginas/Personalizacion/Personalizacion';
import ProtectedRoute from './ProtectedRoute';
import axios from "axios"
import Presupuestos from './paginas/Presupuestos/Presupuestos';
import EdicionCategoria from './paginas/Categorias/EdicionCategoria/EdicionCategoria';
import AltaCategoria from './paginas/Categorias/AltaCategoria/AltaCategoria';
import CategoriasABM from './paginas/Categorias/CategoriasABM';
import NoEncontrada from './paginas/noEncontrada/noEncontrada';
import PaginaConstruccion from './paginas/PaginaConstruccion/PaginaConstruccion';
import ContactForm from './components/ContactForm/ContactForm';


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
    <Router>
      <Routes>
        {/* RUTAS PÚBLICAS */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route exact path='/contacto' element={<ContactForm/>}/>
        {/* PARA EL 404 */}
        <Route path="*" element={<NoEncontrada/>} />
         {/* RUTAS PRIVADAS */}
        <Route exact path='/' element={<ProtectedRoute/>}>
          <Route exact path='/home' element={<HomeLogueada/>}/>
          <Route exact path='/personalizacion' element={<Personalizacion/>}/>
          <Route exact path='/historial-presupuesto' element={<Presupuestos/>}/>
          <Route exact path='/categorias-lista' element={<CategoriasABM/>}/>
          <Route exact path='/categorias-crear' element={<AltaCategoria/>}/>
          <Route exact path='/categorias-editar/:idCategoria/:descripcion_categoria/:tipo_categoria' element={<EdicionCategoria/>}/>
          <Route exact path='/editar-perfil' element={<PaginaConstruccion/>}/>
          <Route exact path='/avisos' element={<PaginaConstruccion/>}/>
          
        </Route>
      </Routes>
      
    </Router>
  );
}

export default App;
