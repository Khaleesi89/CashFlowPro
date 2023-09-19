import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios';

export const SesionIniciada = ({nombre}) => {

    const navigate = useNavigate();
    const logout = (e) => {
        e.preventDefault();
        axios.post(`/api/logout`).then(res => {
          if (res.data.status === 200) {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('color');
            localStorage.removeItem('auth_usuario');
            localStorage.removeItem('nombre');
            navigate('/');
          }
        });
       

    }
    return(
        <>
            
                <li className="nav-item dropdown itemEliminar">
                    <a className="nav-link dropdown-toggle sesionIni" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{nombre.toUpperCase()}</a>
                    <ul className="dropdown-menu desplegableMenu">
                        <Link className="nav-link dropdown-item" to={('/personalizacion')}>Personalización</Link>
                        <li><a className="dropdown-item" onClick={logout} href="#">Cerrar sesión</a></li>
                    </ul>
                </li>
            
        </>
        
    )
}
