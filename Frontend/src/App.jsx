
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './paginas/Home/Home';
import Login from './paginas/Login/Login';
import Registro from './paginas/Registro/Registro';
import { HomeLogueada } from './paginas/HomeLogueada/HomeLogueada';
import { Personalizacion } from './paginas/Personalizacion/Personalizacion';
import ProtectedRoute from './ProtectedRoute';
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
    <Router>
      <Routes>
        {/* RUTAS PÚBLICAS */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        {/* PARA EL 404 */}
        <Route path="*" element={<p>No hay nada aquí! Error 404</p>} />
         {/* RUTAS PRIVADAS */}
        <Route exact path='/' element={<ProtectedRoute/>}>
          <Route exact path='/home' element={<HomeLogueada/>}/>
          <Route exact path='/personalizacion' element={<Personalizacion/>}/>
        </Route>
      </Routes>
      
    </Router>
  );
}

export default App;
