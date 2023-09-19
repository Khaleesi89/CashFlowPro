import {Link} from 'react-router-dom'
export const CategoriasNavbar = () => {
    return(
        <>
            <ul className="navbar-nav me-auto">
            
                <Link className="nav-link homecito" to={('/')}>Home</Link>
                <Link className="nav-link homecito" to={('/editarPerfil')}>Editar Perfil</Link>
                <Link className="nav-link homecito" to={('/categorias')}>Categorías</Link>
                <Link className="nav-link homecito" to={('/finanzas')}>Mis finanzas</Link>
                <Link className="nav-link homecito" to={('/cashflow')}>Cashflow</Link>
                <Link className="nav-link homecito" to={('/avisos')}>Avisos</Link>
                
            </ul>
        </>
    )
}