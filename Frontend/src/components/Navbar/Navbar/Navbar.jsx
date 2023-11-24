import { LogoTitle } from "../LogoTitle/LogoTitle"
import { SesionIniciada } from "../SesionIniciada/SesionIniciada"
import './Navbar.css'
import { Link } from "react-router-dom"
import { CategoriasNavbar } from "../CategoriasNavbar/CategoriasNavbar"
import storage from "../../../Storage/Storage"

export const Navbar = () => {

    return (
              <nav className="navbar  navbar-expand-lg navbar-dark bg-primary">
              <div className="container-fluid">
                <Link className="navbar-brand">
                  <LogoTitle />
                </Link>
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
      

          
         /*  return (
            <nav className="navbar  navbar-expand-lg navbar-dark bg-primary">
              <div className="container-fluid">
                <Link className="navbar-brand" to={'/'}>
                  <LogoTitle />
                </Link>
                {storage.get('authUser') ? (
                  <>
                  <div className="collapse navbar-collapse" id="navbarColor01">
                    <CategoriasNavbar />
                  </div>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                  </button>
                  <div className="sesion">
                    <SesionIniciada />
                  </div>
                  </>
                ) : (
                  <>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="navbar-toggler-icon" />
                  </button>
                  <div className="sesion">
                    <Sesion/>
                  </div>
                  </>
                )}
              
              </div>
            </nav>
        ); */

    
}