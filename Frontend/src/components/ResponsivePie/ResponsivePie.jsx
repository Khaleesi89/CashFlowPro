// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/pie
import { ResponsivePie } from '@nivo/pie'
import './Grafico.css'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
export const MyResponsivePie = ({ data /* see data tab */ }) => (
    <ResponsivePie
        data={data}//LA INFORMACION QUE VIENE DE LA BASE DE DATOS EN JSON
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }} //MARGENES DEL GRAFICO
        innerRadius={0.5}//El radio interior del gráfico de pastel.
        padAngle={0.7}//El ángulo de separación entre las porciones del pastel.
        cornerRadius={3}//El radio de las esquinas de las porciones del pastel.
        activeOuterRadiusOffset={8}//El desplazamiento del radio exterior cuando se selecciona una porción.
        borderWidth={1}//El ancho del borde del gráfico de pastel.
        borderColor={{//El color del borde.
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}//Esto controla el ángulo de separación entre las etiquetas de enlace que se muestran en el gráfico de pastel. Si el ángulo entre dos porciones adyacentes es menor que 10 grados, las etiquetas de enlace se omitirán para evitar la superposición.
        arcLinkLabelsTextColor="#333333"//Establece el color del texto de las etiquetas de enlace en el gráfico de pastel. 
        arcLinkLabelsThickness={2}//Define el grosor de las etiquetas de enlace en el gráfico de pastel
        arcLinkLabelsColor={{ from: 'color' }}//Este atributo permite personalizar el color de las etiquetas de enlace basándose en el color de las porciones del gráfico. Las etiquetas de enlace adoptarán el color de la porción a la que están vinculadas.
        //VER SI EL COLOR LO PODEMOS TRAER EN EL JSON
        arcLabelsSkipAngle={10}//esta propiedad controla el ángulo de separación entre las etiquetas que se muestran directamente en las porciones del gráfico.
        arcLabelsTextColor={{//Esta propiedad permite definir el color del texto de las etiquetas que se muestran en las porciones del gráfico. 
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        defs={[//DEFINICION DE PATRONES PARA EL RELLENO DE LAS PORCIONES DE LA DONA. ES UN DETALLE
            {
                id: 'dots',//se pueden asignar patrones diferentes a categorías específicas.
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[//DEFINICIÓN DE COLORES EN FILL PUEDO HACER UN ARRAY CON LA INFO Y PONERLO DE ESTA MANERA
        // fill={arrayFill} y me evito todo lo anterior
            {
                match: {//EN EL MATCH SE ESPECIFICA EL IDENTIFICADOR DE ID DE LA CATEGORIA
                    id: 'ruby'//SE ESPECIFICA EL NOMBRE DEL PATRON DEFINIDO ANTERIORMENTE QUE SE UTILIZARA
                    //PARA RELLENAR EL GRAFICO
                },
                id: 'dots'//ESTO ES PARA LOS PATRONES QUE SE USARA PARA RELLENAR
            },
            {
                match: {
                    id: 'c'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'python'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'scala'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'elixir'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'javascript'
                },
                id: 'lines'
            }
        ]}
        legends={[              //son etiquetas explicativas que se muestran generalmente 
                                //junto al gráfico. Puedes personalizar la ubicación,
                                //el estilo y otros aspectos de las leyendas.
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
)




/* 



import './Grafico.css'
//import grafic from './../../img/704.jpg'
//aqui irá el grafico que se formará dinámicamente
//ahora se pone la imagen de ilustración para el orden
export const Grafico = () => {
    return (
            //<img src={grafic} alt="grafico que se forma dinámicamente" />
            <div className="imagenDinamica">

            </div>
    )
} */