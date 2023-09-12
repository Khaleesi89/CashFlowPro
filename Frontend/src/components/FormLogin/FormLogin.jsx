import { Link, useNavigate } from "react-router-dom";
import './FormLogin.css'
import { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';


export const FormLogin = () =>{

    const [usuario, setUsuario] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleLogin = async (e) =>{
        e.preventDefault();
        const data = {
            usuario: e.target.usuario.value,
            password: e.target.password.value,
        }
        console.log(data);
        try {
            const response = await axios.post('http://localhost:8000/api/login', data);
            console.log(response);
            Swal.fire({
              icon: 'success',
              title: 'Acceso exitoso',
              text:'Bienvenid@ '+ data.usuario,
              timer: 2000,
            });
            navigate('/')
          } catch (error) {
            console.error(error);
            Swal.fire({
              icon: 'error',
              title: 'Acceso denegado',
              text:'Revise que sus datos estén correctos',
              timer: 1300,
            });
          }
    }
    return (
        <>

            <div className="d-flex justify-content-center formLogin">
                    <form className="mb-4 col-6" onSubmit={handleLogin} >
                        <div className="col text-center">
                            <label htmlFor="exampleDropdownFormEmail1" className="form-label">Usuario</label>
                            <input type="text" id="usuario" className="form-control" value={usuario} onChange={(e)=> setUsuario(e.target.value)} placeholder="Usuario" required />
                        </div>
                        <div className="col">
                            <label htmlFor="exampleDropdownFormPassword1" className="form-label">Password</label>
                            <input type="password" id="password" className="form-control" value={password} onChange={(e) =>setPassword(e.target.value)} placeholder="Password" required/>
                        </div>
                        <button type="submit" className="btn btn-primary">Ingresar</button>
                    </form>
                    <div className="linksRecuperacion">
                        <Link className="dropdown-item reg" to={('/register')}>Es nuevo? Regístrese</Link>
                        <a className="dropdown-item pass" href="#">Olvidó password?</a>
                    </div>
            </div>
        </>

    )}

export default FormLogin;