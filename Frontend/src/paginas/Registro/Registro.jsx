import {Register} from "../../components/Register/Register";
import { Navbar } from '../../components/Navbar/Navbar';
import Footer from "../../Components/Footer/Footer";
import './Registro.css'

/*aca tengo que hacer la diferenciación de si está iniciada la sesion o no para que muestre un navbar u otro*/


export const Registro = () => {
    return (
        <>
            
            <Navbar/>
            <div className="formularioRegistro  text-center titulo-seccion">
                <h2 className="m-5">Formulario de Registro</h2>
                
                <div className="formRegister mx-auto col-3">
                    <Register/>
                </div>
            </div>
            <Footer/>

        </>
        
    )
}
export default Registro;