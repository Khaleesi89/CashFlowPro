import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios';
import CambioColor from '../../CambioColor/CambioColor';

export const SesionIniciada = ({nombre}) => {



  //PARA PONER EL COLOR QUE HAY REGISTRADO EN EL LOCALSTORAGE SEGUN LA BASE DE DATOS

    const misColores = CambioColor();
    
    const navigate = useNavigate();
    const logout = (e) => {
        e.preventDefault();
        console.log(e);
        axios.get('/sanctum/csrf-cookie').then(response => {
          axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('auth_token')}`;
          axios.post('api/logout').then(res => {
            console.log(res);
            if (res.data.status === 200) {
              localStorage.removeItem('auth_token');
              localStorage.removeItem('color');
              localStorage.removeItem('auth_usuario');
              localStorage.removeItem('nombre');
              navigate('/');
            }
          });
        });
      }

      
    return(
        <>
            
                <li className="nav-item dropdown itemEliminar">
                    <a className="nav-link dropdown-toggle sesionIni"  style={{ color: misColores.color, backgroundColor: misColores.backgroundColor }} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{nombre.toUpperCase()}</a>
                    <ul className="dropdown-menu desplegableMenu"  style={{ color: misColores.color, backgroundColor: misColores.backgroundColor }}>
                        <Link className="nav-link dropdown-item"  style={{ color: misColores.color, backgroundColor: misColores.backgroundColor }} to={('/personalizacion')}>Personalización</Link>
                        <li><a className="dropdown-item"  style={{ color: misColores.color, backgroundColor: misColores.backgroundColor }} onClick={logout} href="#">Cerrar sesión</a></li>
                    </ul>
                </li>
            
        </>
        
    )
}
 /* navigate('/'); */