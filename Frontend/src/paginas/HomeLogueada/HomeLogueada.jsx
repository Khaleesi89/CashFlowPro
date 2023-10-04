import './HomeLogueada.css'
import { Navbar } from '../../components/Navbar/Navbar'
import { Botones } from '../../components/Botones/Botones'
import {Grafico} from '../../components/Grafico/Grafico'
import Footer from '../../Components/Footer/Footer'

/*aca tengo que hacer la diferenciación de si está iniciada la sesion o no para que muestre un navbar u otro*/


export const HomeLogueada = () => {
    return (
        <>
            
            <Navbar/>
            <div className="home-container-logueada" >
                <div className="grafico">
                    <Grafico/>
                </div>
                <div className='textoOrdenado'>
                    <div className="explicacion">
                        <p>El gráfico es dinámico. Teniendo en cuenta los ingresos y gastos que ud. va ingresando, le va a mostrar lo que tiene disponible</p>
                    </div>
                    <div className="botonesAcciones">
                        <Botones text="INGRESO"/>
                        <Botones text="GASTO"/>

                    </div>
                </div>
            </div>
            <Footer/>

        </>
    )
}