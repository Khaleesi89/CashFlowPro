import { useState} from "react";
import {useNavigate} from "react-router-dom"


//para validar los formularios se usa las className is-valid para validar y is-invalid para dar el error. en los texto para mostrar q error tienen se pone en clase invalid-feedback y para estar bien se pone el valid-feedback
export const Register = () =>{
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e)=>{
        e.preventDefault();

        try{

            await axios.post("/register", {nombre, apellido, usuario, email, password});
            setNombre("");
            setApellido("");
            setUsuario("");
            setEmail("");
            setPassword("");
            navigate("/")//se usa para redirigir a otra página en caso de registro exitoso
        }catch(e){
            console.log(e);
        }
    }
    return(

        <>
           
            <form className="text-center" onSubmit={handleRegister}>
                <div className="col">
                    <label htmlFor="validationServer01" className="form-label">Nombre</label>
                    <input type="text" className="form-control is-valid" value={nombre} onChange={(e)=> setNombre(e.target.value)} id="validationServer01" required />
                    <div className="invalid-feedback">
                        ok!
                    </div>
                </div>
                <div className="col">
                    <label htmlFor="validationServer02" className="form-label">Apellido</label>
                    <input type="text" className="form-control is-valid" value={apellido} onChange={(e)=> setApellido(e.target.value)} id="validationServer02" required />  
                    <div className="invalid-feedback">
                        ok!
                    </div>
                </div>
                <div className="col">
                    <label htmlFor="validationServerUsername" className="form-label">Usuario</label>
                    <div className="input-group has-validation">
                        <input type="text" className="form-control is-valid"  value={usuario} onChange={(e)=> setUsuario(e.target.value)}  id="validationServerUsername" aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback" required />
                        <div id="validationServerUsernameFeedback" className="invalid-feedback">
                        Por favor elegir un usuario.
                        </div>
                    </div>
                </div>
                <div className="col">
                    <label htmlFor="inputEmail4" className="form-label">Email</label>
                    <input type="email" className="form-control is-valid"  value={email} onChange={(e)=> setEmail(e.target.value)} id="inputEmail4" required/>
                </div>
                <div className="col">
                            <label htmlFor="exampleDropdownFormPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control"  value={password} onChange={(e)=> setPassword(e.target.value)} id="exampleDropdownFormPassword1" placeholder="Password" />
                        </div>
                <div className="col">
                <button className="btn btn-primary" type="submit">Crear Usuario</button>
                </div>
            </form>
            
        </>
    )

}

export default Register;