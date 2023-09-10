

import { LogoTitle } from "./LogoTitle/LogoTitle"
import { Sesion } from "./Sesion/Sesion"
import './NavbarPublico.css'
import { Link } from "react-router-dom"

export const NavbarPublico = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand" to={('/')}>
                    <LogoTitle/>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="sesion">
                    <Sesion/>
                </div>
            </div>
        </nav>
        
      
    )}
    