
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
/* import {HomeLogueada} from './components/paginas/HomeLogueada/HomeLogueada';
import {Login} from './components/paginas/Login/Login'
import { Registrarse } from './components/Registrarse/Registrarse'; */
import { Home } from './paginas/Home/Home';
import Login from './paginas/Login/Login';
import Registro from './paginas/Registro/Registro';


function App() {
  return (
                <BrowserRouter>
                    <Routes>
                     
                        <Route exact path='/' element ={<Home/>}></Route>
                        <Route exact path='/login' element = {<Login/>}></Route>
                        <Route exact path='/register' element = {<Registro/>}></Route>
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


                    </Routes>
                </BrowserRouter>
  );
}

export default App;