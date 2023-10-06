import {Link} from 'react-router-dom'
import CambioColor from '../../CambioColor/CambioColor';
export const CategoriasNavbar = () => {

    
  //PARA PONER EL COLOR QUE HAY REGISTRADO EN EL LOCALSTORAGE SEGUN LA BASE DE DATOS

  const misColores = CambioColor();


    return(
        <>
            <ul className="navbar-nav me-auto">
            
                <Link className="nav-link homecito" style={{ color: misColores.color, backgroundColor: misColores.backgroundColor }} to={('/home')}>Home</Link>
                <Link className="nav-link homecito" style={{ color: misColores.color, backgroundColor: misColores.backgroundColor }} to={('/editarPerfil')}>Editar Perfil</Link>
                <Link className="nav-link homecito" style={{ color: misColores.color, backgroundColor: misColores.backgroundColor }} to={('/categorias-lista')}>Categorías</Link>
                <Link className="nav-link homecito" style={{ color: misColores.color, backgroundColor: misColores.backgroundColor }} to={('/historial-presupuesto')}>Historial</Link>
                <Link className="nav-link homecito" style={{ color: misColores.color, backgroundColor: misColores.backgroundColor }} to={('/cashflow')}>Cashflow</Link>
                <Link className="nav-link homecito" style={{ color: misColores.color, backgroundColor: misColores.backgroundColor }} to={('/avisos')}>Avisos</Link>
                
            </ul>
        </>
    )
}