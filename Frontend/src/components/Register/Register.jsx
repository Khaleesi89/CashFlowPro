import { useState} from "react";
import axios from "axios"
import Swal from 'sweetalert2';



//para validar los formularios se usa las className is-valid para validar y is-invalid para dar el error. en los texto para mostrar q error tienen se pone en clase invalid-feedback y para estar bien se pone el valid-feedback
export const Register = () =>{
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   
    

    const handleRegister = async (e) => {
        e.preventDefault();
        const data = {
          nombre: e.target.nombre.value,
          apellido: e.target.apellido.value,
          usuario: e.target.usuario.value,
          email: e.target.email.value,
          password: e.target.password.value,
          color: '#593196'
        };
      
        console.log(data);
      
        try {
          const response = await axios.post('http://localhost:8000/api/register', data);
          console.log(response);
          Swal.fire({
            icon: 'success',
            title: 'Registro de usuario',
            text: 'Su registro se ha realizado con éxito!',
            timer: 1500,
          });
          setTimeout(() => {
            window.location.href = '/login';
          }, 1500);
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: 'error',
            title: 'Registro de usuario',
            text: 'Ocurrió un error al registrar!',
            timer: 1500,
          });
        }
      };
      
    
    return(

        <>
           
            <form className="text-center" onSubmit={handleRegister}>
                <div className="col">
                    <label htmlFor="validationServer01" className="form-label">Nombre</label>
                    <input type="text" className="form-control is-valid" value={nombre} onChange={(e)=> setNombre(e.target.value)} id="nombre" required />
                    <div className="invalid-feedback">
                        ok!
                    </div>
                </div>
                <div className="col">
                    <label htmlFor="validationServer02" className="form-label">Apellido</label>
                    <input type="text" className="form-control is-valid" value={apellido} onChange={(e)=> setApellido(e.target.value)} id="apellido" required />  
                    <div className="invalid-feedback">
                        ok!
                    </div>
                </div>
                <div className="col">
                    <label htmlFor="validationServerUsername" className="form-label">Usuario</label>
                    <div className="input-group has-validation">
                        <input type="text" className="form-control is-valid"  value={usuario} onChange={(e)=> setUsuario(e.target.value)}  id="usuario" aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" required />
                        <div id="validationServerUsernameFeedback" className="invalid-feedback">
                        Por favor elegir un usuario.
                        </div>
                    </div>
                </div>
                <div className="col">
                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                    <input type="email" className="form-control is-valid"  value={email} onChange={(e)=> setEmail(e.target.value)} id="email" required/>
                </div>
                <div className="col">
                            <label htmlFor="exampleDropdownFormPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control"  value={password} onChange={(e)=> setPassword(e.target.value)} id="password" placeholder="Password" />
                        </div>
                <div className="col">
                <button className="btn btn-primary" type="submit">Crear Usuario</button>
                </div>
            </form>
            
        </>
    )

}

export default Register;