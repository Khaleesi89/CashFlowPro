import { LogoTitle } from "./LogoTitle/LogoTitle"
import { Sesion } from "./Sesion/Sesion"
import './NavbarPublico.css'
import { Link } from "react-router-dom"
/* import axios from "axios"
import { useEffect,useState } from "react"
import {CategoriasNavbar} from "./CategoriasNavbar/CategoriasNavbar"
import {SesionIniciada} from "./SesionIniciada/SesionIniciada" */
import axios from "axios"
import { CategoriasNavbar } from "./CategoriasNavbar/CategoriasNavbar"
import { SesionIniciada } from "./SesionIniciada/SesionIniciada"
import CambioColor from "../CambioColor/CambioColor"
import { useEffect } from "react"


export const Navbar = () => {

  //para saber si hay un token/sesion iniciada y asi renderizar el componente correspondiente 
  let sesionIniciada
  if(localStorage.getItem('auth_token')){
    sesionIniciada = true;
  }else{
    sesionIniciada = false;
  }


  //PARA PONER EL COLOR QUE HAY REGISTRADO EN EL LOCALSTORAGE SEGUN LA BASE DE DATOS

  const misColores = CambioColor();


  //para saber el color que tiene declarado en la base de datos


  return (
          <nav className="navbar navbar-expand-lg navbar-dark" style={{ color: misColores.color, backgroundColor: misColores.backgroundColor }}>
              <div className="container-fluid" style={{ color: misColores.color, backgroundColor: misColores.backgroundColor }}>
                <Link className="navbar-brand" to={'/'}>
                  <LogoTitle />
                </Link>
                {sesionIniciada ? (
                  <>
                  <div className="collapse navbar-collapse" id="navbarColor01">
                    <CategoriasNavbar />
                  </div>
                  
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                  </button>
                  <div className="sesion">
                    {sesionIniciada ? <SesionIniciada nombre={localStorage.getItem('nombre')}/> : <Sesion/>}
                  </div>
                  </>
                ) : (
                  
                  <div className="sesion">
                    {sesionIniciada ? <SesionIniciada nombre={localStorage.getItem('nombre')}/> : <Sesion/>}
                  </div>
                  
                )}
              </div>
            </nav>
    );





    {/* <nav className="navbar navbar-expand-lg navbar-dark bg-primary"> EL QUE ESTA FUNCIONANDO BIEN
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
    ); */}

           /*  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
              <div className="container-fluid">
                <Link className="navbar-brand" to={'/'}>
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
            ); */

        /*     <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
              <div className="container-fluid">
                <Link className="navbar-brand" to={'/'}>
                  <LogoTitle />
                </Link>
                {sesionIniciada ? (
                  <div className="collapse navbar-collapse" id="navbarColor01">
                    <CategoriasNavbar />
                  </div>
                ) : (
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                  </button>
                )}
                <div className="sesion">
                  {sesionIniciada ? <SesionIniciada /> : <Sesion />}
                </div>
              </div>
            </nav>
          );
           */

    
}


        /* <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
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
        </nav> */
        
      
    
    
                  /* const[sesionIniciada , setSesionIniciada] = useState(false); */
              
                  /* console.log('lo que trae cookie')
                  const token = document.cookie.split('; ').find(row => row.startsWith('jwt=')).split('=')[1];
              
              
                  useEffect(() => {
                      axios.get('http://localhost:8000/api/user', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                          .then(response => {
                              if(response.data){
                                  // El usuario tiene una sesión iniciada
                                  setSesionIniciada(true);
                              }
                          })
                          .catch(error =>{
                              console.log(error);
                          });
              
                  },[]); */
              
                  /* useEffect(() => {
                      axios.get('http://localhost:8000/api/user')
                          .then(response => {
                              if(response.data){
                                  // El usuario tiene una sesión iniciada
                                  setSesionIniciada(true);
                              }
                          })
                          .catch(error =>{
                              console.log(error);
                          });
              
                  },[]);
              
                  console.log('lo que trae cookie')
                  console.log(document.cookie) */