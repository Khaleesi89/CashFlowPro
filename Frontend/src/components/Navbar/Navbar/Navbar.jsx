import { LogoTitle } from "../LogoTitle/LogoTitle"
import { SesionIniciada } from "../SesionIniciada/SesionIniciada"
import './Navbar.css'
import { CategoriasNavbar } from "../CategoriasNavbar/CategoriasNavbar"

export const Navbar = () => {

    return (
              <nav className="navbar  navbar-expand-lg navbar-dark bg-primary">
              <div className="container-fluid">
                <div className="navbar-brand">
                  <LogoTitle />
                </div>
                <div className="collapse navbar-collapse" id="navbarColor01">
                    <CategoriasNavbar />
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="sesion">
                  <SesionIniciada />
                </div>
              </div>
            </nav>
         );
      

    
}