

import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const auth = localStorage.getItem('auth_token') // ve si el localstorage hay un token 

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? <Outlet /> : <Navigate to="/login" />;
}
export default ProtectedRoute;
