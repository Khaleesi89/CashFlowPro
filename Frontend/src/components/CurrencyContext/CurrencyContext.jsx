import { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext();

export const useCurrency = ()=> {
  return useContext(CurrencyContext);
}

export const  CurrencyProvider = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('ARS'); // Valor predeterminado

  const setCurrency = (currency) => {
    setSelectedCurrency(currency);
  };

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, setCurrency}}>
      {children}
    </CurrencyContext.Provider>
  );
}
