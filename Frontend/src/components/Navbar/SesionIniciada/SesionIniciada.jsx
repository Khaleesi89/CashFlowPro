import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios';
import CambioColor from '../../CambioColor/CambioColor';

export const SesionIniciada = ({nombre}) => {



  //PARA PONER EL COLOR QUE HAY REGISTRADO EN EL LOCALSTORAGE SEGUN LA BASE DE DATOS

    const misColores = CambioColor();
    
    const navigate = useNavigate();
    
    
      const logout = (e) => {
          e.preventDefault();
          //PARA SACAR EL NUMERO DE ID DEL USUARIO
          let usuario = localStorage.getItem('auth_usuario');
          let usuarioObjeto = JSON.parse(usuario);
          let id = usuarioObjeto.id;
          console.log(id);
          let color = localStorage.getItem('color');
          actualizarColorUsuario(id, color);
          //ELIMINACION DE TODO LO QUE HAY EN EL LOCALSTORAGE
          localStorage.removeItem('auth_token');
          localStorage.removeItem('color');
          localStorage.removeItem('auth_usuario');
          localStorage.removeItem('nombre');
          // Llamar a la función para borrar una cookie específica
          borrarCookie("XSRF-TOKEN");
          navigate('/');

      }

      // Función para borrar una cookie por su nombre
      function borrarCookie(nombre) {

        document.cookie = nombre + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      }

      //FUNCION PARA ACTUALIZAR COLOR

      const actualizarColorUsuario = async (idUsuario, nuevoColor) => {
        try {
          const response = await axios.put(`http://localhost:8000/api/usuarios/${idUsuario}`, {
            color: nuevoColor,
          });
          console.log(response.data); // Puedes hacer algo con la respuesta del backend si lo deseas
          return response.data;
        } catch (error) {
          console.error(error);
          throw new Error('Error al actualizar el color del usuario');
        }
      };

     
     
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
 