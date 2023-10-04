import { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const useForm = (initialData, onValidate) =>{

    //variables de estado que son del formulario (info del formulario) y 
    const [form, setForm] = useState(initialData);//vamos a recibir por paramentros ese initialdata
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});//para guardar los errores


    //evento para editar el formulario cuando hay un cambio en los datos iniciales
    const handleChange = (e) =>{
        const {name, value} = e.target
        setForm({ ... form, [name]:value});
    }

    //evento para enviar el formulario
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const err = onValidate(form)//recibe lo que trae onvalidate
        setErrors(err)//si existen errores envia los errores

        if(Object.keys(err).length === 0){// contiene errores pero si esta en cero es que no hay errores
            console.log('enviando formulario')
            setLoading(true);
            try {
                console.log(form);
                form.color = '#593196';
                const response = await axios.post('http://localhost:8000/api/register', form);
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
        }
    }

    return {form, loading,errors, handleChange,handleSubmit}
}


export default useForm;