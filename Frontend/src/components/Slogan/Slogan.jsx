/*ejemplos de slogan: 

Gestiona, ahorra y prospera con CashFlowPro: Finanzas sin complicaciones
"Finanzas personales sin estrés con CashFlowPro 
Gestión financiera sin estrés, gracias a [Nombre de la App].
No más pagos vencidos, no más preocupaciones: [Nombre de la App] te mantiene al tanto para que te ocupes de lo importante


*/

import Boton from "../Boton/Boton"
export const Slogan = () => {
    return(
        <>
                <div className="texto1">
                    <h3>No más pagos vencidos, no más preocupaciones por las cuentas!!!!</h3>
                </div>
                <div className="texto2">
                    <h3><span>CashFlowPro</span> te mantiene al tanto para que te ocupes de lo más importante</h3>
                </div>
                <Boton/>
        </>
        
    )
}