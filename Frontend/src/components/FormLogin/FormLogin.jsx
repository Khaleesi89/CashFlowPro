import { Link, useNavigate } from "react-router-dom";
import './FormLogin.css'
import { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';


export const FormLogin = () =>{

    const [usuario, setUsuario] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();


    //MANEJO DE ERRORES EN LOS FORMULARIOS

    const handleLogin = (e) =>{
        e.preventDefault();
        const data = {
            usuario: e.target.usuario.value,
            password: e.target.password.value,
        }
        console.log('que trae del login como dato');
        console.log(data);
        axios.get('/sanctum/csrf-cookie').then(response => {
            try {
                const response = axios.post('api/login', data).then(res =>{
                    if (res.data.status === 200) {
                        //GUARDO INFO QUE VOY A UTILIZAR EN LA APP
                        localStorage.setItem('auth_token', JSON.stringify(res.data.access_token));
                        localStorage.setItem('auth_usuario', JSON.stringify(res.data.auth_usuario));
                        localStorage.setItem('color', res.data.auth_usuario.color);
                        localStorage.setItem('nombre', res.data.auth_usuario.nombre);
                        //ALERTAS
                        console.log(res);
                        Swal.fire({
                        icon: 'success',
                        title: 'Acceso exitoso',
                        text:'Bienvenid@ '+ data.usuario,
                        timer: 1300,
                        });
                        navigate('/home')
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Acceso denegado',
                            text:'Revise que sus datos estén correctos',
                            timer: 2000,
                            });
                    }
                });
            } catch (error) {
                console.error(error);
            };
        });
    }

    return (
        <>

            <div className="d-flex justify-content-center formLogin">
                    <form className="mb-4 col-6" onSubmit={handleLogin} >
                        <div className="col text-center">
                            <label htmlFor="usuario" className="form-label">Usuario</label>
                            <input type="text" id="usuario" className="form-control" value={usuario} onChange={(e)=> setUsuario(e.target.value)} placeholder="Usuario" required />
                        </div>
                        <div className="col">
                            <label htmlFor="password" className="form-label">Password</label>
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