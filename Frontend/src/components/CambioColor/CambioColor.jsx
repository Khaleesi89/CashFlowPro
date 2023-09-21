

export default function CambioColor() {
    const colorNavbar = localStorage.getItem('color');
    //segun los colores que se traiga del localstorage, armaa el conjunto de color de navbar y letras
    //dividimos entre los colores que necesitan la letra de color blanco y las de color negro
    let misColores;
    switch (colorNavbar) {
        //casos para cambiar al color blanco las letras
            case'#C2185B': 
            case'#E8ABC3': 
            case'#008388': 
            case'#00478a': 
            case'#4598CD': 
            case'#0072BB': 
            case'#005006': 
            case'#60AD5F': 
            case'#C62828': 
            case'#FF5F52': 
            case'#E3991F':
            case'#885C13':    
            case'#441262': 
            case'#707820':   
            case'#B4004E':  
            case'#EC407A':  
            case'#F496B6':   
            case'#C23564': 
            case'#00565B':  
            case'#FF9D3F': 
            case'#EF6C00':  
            case'#6ea100': 
            case'#3E3E3E': 
            case'#593196': 
            case'#39006A':  
                //codigo para armar para el estilo
                misColores ={
                    backgroundColor: colorNavbar,
                    color: '#fff',
                };
                return misColores
                break;
    

                //casos para cambiar al color negro las letras
        
            case'#95ba45':
            case'#F7BC8B':
            case'#CDDC39':        
            case'#FFFF6E':        
            case'#D6E250':
            case'#D6C0E3':        
            case'#B7B7B7':    
            case'#F9A822':
            case'#FCD79A':
            case'#FA5788':
                misColores ={
                    backgroundColor: colorNavbar,
                    color: '#000',
                };
                return misColores
                break;
        
            default:
                misColores ={
                    backgroundColor: '#593196',
                    color: '#fff',
                };
                return misColores
                break;

    }
    
}

