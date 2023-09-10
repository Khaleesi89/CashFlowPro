import {NavbarPublico} from '../../components/Navbar/NavbarPublico'
import {Footer} from '../../components/Footer/Footer'
import {Slogan} from '../../components/Slogan/Slogan'
import {Imagen} from '../../components/Imagen/Imagen'
import {Info} from '../../components/Info/Info'
import './Home.css'


/*aca tengo que hacer la diferenciación de si está iniciada la sesion o no para que muestre un navbar u otro*/


export const Home = () => {
    return (
        <>
            
            <NavbarPublico/>
            <div className="home-container" >
                <div className="slogan">
                    <Slogan/>
                </div>
                <div className="imagen">
                    <Imagen/>
                </div>
            </div>
          
            <div className="relleno">
                <p>Fácil de usar</p>
                <p>Programable</p>
                <p>Personalizable</p>
                <p>Histórico</p>
            </div>
            <div className="dequesetrata">
                <Info/>
            </div>
           
            <Footer/>
            
        </>
        
    )
}