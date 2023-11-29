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
          //console.log(id);
          let color = localStorage.getItem('color');
          if(actualizarColor(color,id)){
            //ELIMINACION DE TODO LO QUE HAY EN EL LOCALSTORAGE
            localStorage.removeItem('auth_token');
            localStorage.removeItem('color');
            localStorage.removeItem('auth_usuario');
            localStorage.removeItem('nombre');
            // Llamar a la función para borrar una cookie específica
            borrarCookie("XSRF-TOKEN");
            navigate('/');

          }else{
            console.log('error al actualizar color')
          }

      }

      // Función para borrar una cookie por su nombre
      function borrarCookie(nombre) {

        document.cookie = nombre + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      }

      //FUNCION PARA ACTUALIZAR COLOR

      const actualizarColor = async (color,id) =>{
        const response = await axios.post('/api/color',{color: color, id:id});
        //console.log(response);
        const data = response;
        return data;
    } 
     
     
    return(
        <>
              <ul>
                <li className="nav-item dropdown itemEliminar">
                    <a className="nav-link dropdown-toggle sesionIni"  style={{ color: misColores.color, backgroundColor: misColores.backgroundColor }} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{nombre.toUpperCase()}</a>
                    <ul className="dropdown-menu desplegableMenu"  style={{ color: misColores.color, backgroundColor: misColores.backgroundColor }}>
                        <Link className="nav-link dropdown-item"  style={{ color: misColores.color, backgroundColor: misColores.backgroundColor }} to={('/personalizacion')}>Personalización</Link>
                        <li><a className="dropdown-item"  style={{ color: misColores.color, backgroundColor: misColores.backgroundColor }} onClick={logout} href="#">Cerrar sesión</a></li>
                    </ul>
                </li>
              </ul>
            
        </>
        
    )
}
 