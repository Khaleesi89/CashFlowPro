import { NavbarPublico } from "../../components/Navbar/NavbarPublico"
import {Register} from "../../components/Register/Register"
import {Footer} from "../../components/Footer/Footer"

/*aca tengo que hacer la diferenciación de si está iniciada la sesion o no para que muestre un navbar u otro*/


export const Registro = () => {
    return (
        <>
            
            <NavbarPublico/>
            <div className="formularioRegistro text-center">
                <h2 className="mt-5">Formulario de Registro</h2>
                
                <div className="register mx-auto col-6">
                    <Register/>
                </div>
            </div>
            <Footer/>
            
        </>
        
    )
}
export default Registro;
