import { Navbar } from "../../components/Navbar/Navbar";
import FormLogin from "../../components/FormLogin/FormLogin";
import Footer from "../../components/Footer/Footer";



export const Login = () =>{

    
    return (
        <>
        <Navbar/>
        <div className="formLogin text-center">
            <h2 className="mt-5 mb-5">Iniciar Sesión</h2>
            <FormLogin/>
        
        </div>
        <Footer/>
        
        </>

    )}

export default Login;