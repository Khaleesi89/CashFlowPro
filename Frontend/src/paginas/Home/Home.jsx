import {Slogan} from '../../components/Slogan/Slogan'
import {Imagen} from '../../components/Imagen/Imagen'
import {Info} from '../../components/Info/Info'
import './Home.css'
import { Navbar } from '../../components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';




export const Home = () => {
    return (
        <>
            
            <Navbar/>
            <div className="home-container" >
                <div className="slogan">
                    <Slogan/>
                </div>
                <Imagen/>
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