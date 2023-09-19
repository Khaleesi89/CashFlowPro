import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = ({componente}) => {
    let auth = { 'token': localStorage.auth_token };
    if (auth.token) {
        return componente
    }else {
        return <Navigate to="/login" />
    }
}

export default PrivateRoutes

/* Este código es una función de React que se utiliza para definir rutas privadas en una aplicación. Toma un parámetro 
llamado  accessRole , que es un arreglo de roles de acceso permitidos. 
 
El código primero verifica si hay un token de autenticación almacenado en el  localStorage . Si existe, 
se crea un objeto  auth  con el token. Luego se crea otro objeto  userRole  con el rol de autenticación almacenado en 
el  localStorage . 
 
A continuación, se itera sobre cada rol en  accessRole  y se verifica si coincide con el rol del usuario almacenado en 
 userRole . Si se encuentra una coincidencia, se establece la variable  habilitado  como  true . 
 
Si  habilitado  es  true , la función devuelve  <Outlet /> , que es una forma de renderizar las rutas secundarias en 
React Router. 
 
Si  habilitado  es  false , la función devuelve  <Navigate to="/" /> , que redirige al usuario a la página de inicio. 
 
Si no hay un token de autenticación en el  localStorage , la función devuelve  <Navigate to="/login" /> , que redirige 
al usuario a la página de inicio de sesión. 
 
El código finalmente exporta la función  PrivateRoutes  como el componente predeterminado. */