import { Link, useNavigate } from "react-router-dom";
import './FormLogin.css'
import { useState } from "react";


export const FormLogin = () =>{

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleLogin = async (e) =>{
        event.preventDefault();
        try{
            await axios.post('/login', {email, password});
            setEmail("");
            setPassword("");
            navigate('/');
        }catch(e){
            console.log(e)
        }
    }
    return (
        <>

            <div className="dropdown-menu d-flex formLogin">
                    <form className="mb-4 col-6" onSubmit={handleLogin} >
                        <div className="col text-center">
                            <label htmlFor="exampleDropdownFormEmail1" className="form-label">Email</label>
                            <input type="email" className="form-control" value={email} onChange={(e)=> setEmail(e.target.value)} id="exampleDropdownFormEmail1" placeholder="email@example.com" />
                        </div>
                        <div className="col">
                            <label htmlFor="exampleDropdownFormPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" value={password} onChange={(e) =>setPassword(e.target.value)} id="exampleDropdownFormPassword1" placeholder="Password" />
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