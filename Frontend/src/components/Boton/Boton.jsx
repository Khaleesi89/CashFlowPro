import {Link} from 'react-router-dom'

export const Boton = () => {
    return (
        <div className=" paRegistrarse">
            <Link className="nav-link botoncito" to={('/register')}>Registrarse</Link>
        </div>
      
    )
}
export default Boton;