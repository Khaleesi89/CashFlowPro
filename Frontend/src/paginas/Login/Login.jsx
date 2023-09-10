import { NavbarPublico } from "../../components/Navbar/NavbarPublico";
import FormLogin from "../../components/FormLogin/FormLogin";
import Footer from "../../components/Footer/Footer";
import { useEffect, useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../components/context/AuthProvider";
import axios from "../../components/api/axios";


const LOGIN_URL = '/auth';

export const Login = () =>{

    const {setAuth} = useContext(AuthContext);

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    useEffect(() =>{
        userRef.current.focus();

    },[])

    useEffect(() =>{
        setErrMsg('');

    },[user, pwd])

    const handleLogin = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.post(LOGIN_URL, JSON.stringify({user,pwd}),
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            }
            
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({user, pwd, roles, accessToken});
            setUser('');
            setPwd('');
            setSuccess(true);
        }catch(err){
            if(!err?.response){
                setErrMsg('el servidor no funca')
            }else if(err.response?.status === 400){
                setErrMsg('falta el usuario o la contraseña')
            }else if(err.response?.status=== 401){
                setErrMsg('No autorizado')
            }else{
                setErrMsg('Logueo fallido')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
        <NavbarPublico/>
        <div className="formLogin text-center">
            <h2 className="mt-5 mb-5">Iniciar Sesión</h2>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

            <div className="d-flex justify-content-center formLogin">
                    <form className="mb-4" onSubmit={handleLogin} >
                        <div className="col text-center">
                            <label htmlFor="usuario" className="form-label">Usuario</label>
                            <input 
                            type="text" 
                            className="form-control" 
                            ref = {userRef}
                            autoComplete = "off"
                            value={user} 
                            onChange={(e)=> setUser(e.target.value)} 
                            id="usuario" 
                            placeholder="usuario"
                            required />
                        </div>
                        <div className="col">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input 
                            type="password" 
                            className="form-control" 
                            autoComplete = "off"
                            value={pwd} 
                            onChange={(e) =>setPwd(e.target.value)} 
                            id="password" 
                            placeholder="Password" 
                            required/>
                        </div>
                        <button type="submit" className="btn btn-primary">Ingresar</button>
                    </form>
                    <div className="linksRecuperacion">
                        <Link className="dropdown-item reg" to={('/register')}>Es nuevo? Regístrese</Link>
                        <a className="dropdown-item pass" href="#">Olvidó password?</a>
                    </div>
            </div>
        
        </div>
        <Footer/>
        
        </>

    )}

export default Login;