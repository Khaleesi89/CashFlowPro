import './Info.css'
import tablas from './../../img/3094324.jpg'

export const Info = () => {
    return (
        <>
            <div className="imagenInfo">
                <img src={tablas} alt="mujer viendo graficos" />
            </div>
            <div className="textoExplicativo">
                <p>En nuestra App podrás realizar tu registro de ingresos y gastos, establecer avisos por mail de vencimientos
                    próximos además tendrás la posibilidad de tener el histórico de tus cuentas.
                </p>
            </div>
            
        </>
        
    )
}
