import './Botones.css'

//se hizo boton para que sea reutilzable en la app
export const Botones = ({text}) => {
    return (
        <button className='botonAccion'>{text}</button>
    )
}