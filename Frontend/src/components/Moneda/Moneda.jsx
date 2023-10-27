import React from 'react'
import axios from 'axios'
import { useCurrency } from '../CurrencyContext/CurrencyContext'

export const Moneda = () => {

  const {setCurrency } = useCurrency(); // Usa el contexto
  const changeCurrency = (e) =>{
    //console.log(e)
    const valorElegido = e.target.value;
    console.log(valorElegido)
    if(localStorage.getItem(valorElegido)){
      //console.log(localStorage.getItem(valorElegido))
      localStorage.setItem('valorSeleccionado', localStorage.getItem(valorElegido));//guardo en localstorage el valor de la moneda elegida
      setCurrency(valorElegido);
    }else{
      axios.get('api/conversion')
        .then(response =>{
          const data = response;
          //console.log(data.data.quotes)
          localStorage.setItem('ARS', 1);
          localStorage.setItem('EUR', data.data.quotes.ARSEUR);
          localStorage.setItem('CLP', data.data.quotes.ARSCLP);
          localStorage.setItem('BRL', data.data.quotes.ARSBRL);
          localStorage.setItem('AUD', data.data.quotes.ARSAUD);
          localStorage.setItem('BOB', data.data.quotes.ARSBOB);
          localStorage.setItem('CAD', data.data.quotes.ARSCAD);
          localStorage.setItem('CNY', data.data.quotes.ARSCNY);
          localStorage.setItem('COP', data.data.quotes.ARSCOP);
          localStorage.setItem('HKD', data.data.quotes.ARSHKD);
          localStorage.setItem('INR', data.data.quotes.ARSINR);
          localStorage.setItem('MXN', data.data.quotes.ARSMXN);
          localStorage.setItem('PYG', data.data.quotes.ARSPYG);
          localStorage.setItem('UYU', data.data.quotes.ARSUYU);
          localStorage.setItem('VEF', data.data.quotes.ARSVEF); 
          setCurrency(valorElegido);
        })
        .catch(error=>{
          console.error(error);
        })
      //LO QUE TRAE LA API
      /* {"success":true,"terms":"https:\/\/currencylayer.com\/terms",
      "privacy":"https:\/\/currencylayer.com\/privacy",
      "timestamp":1698349323,
      "source":"ARS",
      "quotes":{
        "ARSEUR":0.002708,
        "ARSCLP":2.656791,
        "ARSBRL":0.014267,
        "ARSAUD":0.004525,
        "ARSBOB":0.019745,
        "ARSCAD":0.003952,
        "ARSCNY":0.020903,
        "ARSCOP":11.80034,
        "ARSHKD":0.022344,
        "ARSINR":0.237934,
        "ARSMXN":0.051934,
        "ARSPYG":21.2259,
        "ARSUYU":0.113955,
        "ARSVEF":9988.393961}} */
      
    
      
    }
    
  }


  return (
    <select className="form-select" style={{ width: '80px' }}  aria-label="Default select example" name="monedas" id="monedas" onChange={changeCurrency}>
                                <option value="ARS">ARS</option>
                                <option value="EUR">EUR</option>
                                <option value="CLP">CLP</option>
                                <option value="BRL">BRL</option>
                                <option value="AUD">AUD</option>
                                <option value="BOB">BOB</option>
                                <option value="CAD">CAD</option>
                                <option value="CNY">CNY</option>
                                <option value="COP">COP</option>
                                <option value="HKD">HKD</option>
                                <option value="INR">INR</option>
                                <option value="MXN">MXN</option>
                                <option value="PYG">PYG</option>
                                <option value="UYU">UYU</option>
                                <option value="VEF">VEF</option>
                            </select>
  )
}

export default Moneda