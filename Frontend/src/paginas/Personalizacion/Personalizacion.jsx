import './Personalizacion.css'
import axios from "axios"
import { Navbar } from '../../components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';


export const Personalizacion = () => {

    const guardarColor = async (color) => {

            //se decidió guardar en el localstorage del color primero y al cerrar sesion, hacer el cambio en la base de datos
        
            console.log(color);
            let usuario = localStorage.getItem('auth_usuario');
            let usuarioObjeto = JSON.parse(usuario);
            let id = usuarioObjeto.id;
            console.log(id);
            localStorage.setItem('color', color);
            //window.location.href = '/personalizacion';
            window.location.reload()
          
          
    }


    return (
        <>
        <Navbar/>
        <div className="personalizacion-home" >
            <div className="titulo-seccion ">
                <h2>Personalización</h2>
            </div>
            <div className="parrafo">
                <h3>Puede elegir el color de menú que le guste y hága su aplicación favorita...</h3>
            </div>
            <div className='coloresElegir'>
                <div className="tabla-colores">
                    <button className="color-button" style={{backgroundColor: '#C2185B'}} onClick={()=> guardarColor('#C2185B')}></button>
                    <button className="color-button" style={{backgroundColor: '#FA5788'}} onClick={()=> guardarColor('#FA5788')}></button>
                    <button className="color-button" style={{backgroundColor: '#E8ABC3'}} onClick={()=> guardarColor('#E8ABC3')}></button>
                    <button className="color-button" style={{backgroundColor: '#008388'}} onClick={()=> guardarColor('#008388')}></button>
                    <button className="color-button" style={{backgroundColor: '#00478a'}} onClick={()=> guardarColor('#00478a')}></button>
                    <button className="color-button" style={{backgroundColor: '#4598CD'}} onClick={()=> guardarColor('#4598CD')}></button>
                    <button className="color-button" style={{backgroundColor:' #0072BB'}} onClick={()=> guardarColor('#0072BB')}></button>
                    <button className="color-button" style={{backgroundColor:' #005006'}} onClick={()=> guardarColor('#005006')}></button>
                    <button className="color-button" style={{backgroundColor: '#60AD5F'}} onClick={()=> guardarColor('#60AD5F')}></button>
                    <button className="color-button" style={{backgroundColor: '#C62828'}} onClick={()=> guardarColor('#C62828')}></button>
                    <button className="color-button" style={{backgroundColor:' #FF5F52'}} onClick={()=> guardarColor('#FF5F52')}></button>
                    <button className="color-button" style={{backgroundColor:' #F9A822'}} onClick={()=>guardarColor('#F9A822')}></button>
                    <button className="color-button" style={{backgroundColor:' #FCD79A'}} onClick={()=>guardarColor('#FCD79A')}></button>
                    <button className="color-button" style={{backgroundColor:' #E3991F'}} onClick={()=>guardarColor('#E3991F')}></button>
                    <button className="color-button" style={{backgroundColor: '#885C13'}} onClick={()=>guardarColor('#885C13')}></button>
                    <button className="color-button" style={{backgroundColor: '#B7B7B7'}} onClick={()=>guardarColor('#B7B7B7')}></button>
                    <button className="color-button" style={{backgroundColor: '#3E3E3E'}} onClick={()=>guardarColor('#3E3E3E')}></button>
                    <button className="color-button" style={{backgroundColor: '#593196'}} onClick={()=>guardarColor('#593196')}></button>
                    <button className="color-button" style={{backgroundColor: '#39006A'}}onClick={()=>guardarColor('#39006A')}></button>
                    <button className="color-button" style={{backgroundColor: '#D6C0E3'}}onClick={()=>guardarColor('#D6C0E3')}></button>
                    <button className="color-button" style={{backgroundColor: '#441262'}} onClick={()=>guardarColor('#441262')}></button>
                    <button className="color-button" style={{backgroundColor: '#CDDC39'}} onClick={()=>guardarColor('#CDDC39')}></button>
                    <button className="color-button" style={{backgroundColor: '#FFFF6E'}} onClick={()=>guardarColor('#FFFF6E')}></button>
                    <button className="color-button" style={{backgroundColor: '#D6E250'}} onClick={()=>guardarColor('#D6E250')}></button>
                    <button className="color-button" style={{backgroundColor: '#707820'}}onClick={()=>guardarColor('#707820')}></button>
                    <button className="color-button" style={{backgroundColor: '#B4004E'}}onClick={()=>guardarColor('#B4004E')}></button>
                    <button className="color-button" style={{backgroundColor: '#EC407A'}} onClick={()=>guardarColor('#EC407A')}></button>
                    <button className="color-button" style={{backgroundColor: '#F496B6'}} onClick={()=>guardarColor('#F496B6')}></button>
                    <button className="color-button" style={{backgroundColor: '#C23564'}} onClick={()=>guardarColor('#C23564')}></button>
                    <button className="color-button" style={{backgroundColor: '#00565B'}}onClick={()=>guardarColor('#00565B')}></button>
                    <button className="color-button" style={{backgroundColor: '#FF9D3F'}} onClick={()=>guardarColor('#FF9D3F')}></button>
                    <button className="color-button" style={{backgroundColor: '#F7BC8B'}} onClick={()=>guardarColor('#F7BC8B')}></button>
                    <button className="color-button" style={{backgroundColor: '#EF6C00'}} onClick={()=>guardarColor('#EF6C00')}></button>
                    <button className="color-button" style={{backgroundColor: '#6ea100'}} onClick={()=>guardarColor('#6ea100')}></button>
                    <button className="color-button" style={{backgroundColor: '#95ba45'}} onClick={()=>guardarColor('#95ba45')}></button>

                </div>
            </div>
        </div>
        <Footer/>

    </>
    )
}