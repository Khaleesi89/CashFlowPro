import { Navbar } from "../../components/Navbar/Navbar";
import FormLogin from "../../components/FormLogin/FormLogin";
import Footer from "../../Components/Footer/Footer";
import './Login.css'


export const Login = () =>{

    
    return (
        <>
        <Navbar/>
        <div className="text-center">
            <div className="titulo-seccion">
                <h2 className="mt-5 mb-5">Iniciar Sesión</h2>
            </div>
            <div className="formularioLogin">
                <FormLogin/>

            </div>
        
        </div>
        <Footer/>
        </>

    )}

export default Login;