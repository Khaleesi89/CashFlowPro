import React from 'react'

import useForm from '../hooks/useForm'

const ContactForm = () => {
   
    const initialData = {
        nombre: '',
        apellido: '',
        email: '',
        usuario: '',
        password: ''
    }

    //recibimos toda la info del formulario
    const onValidate = (form) => {
        //campos no vengan vacios
        let errors = {}
        //valida minusculas mayusculas acentuadas y maximo de 50 caracteres
        let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]{1,50}$/;
        //valida minusculas mayusculas y numeros maximo de 10 caracteres
        let regexUsuario = /^[A-Za-z0-9]{1,10}$/;
        //puede contener letras, números y ciertos caracteres especiales, y el dominio debe contener letras, números y puntos, seguidos de un sufijo de dominio de al menos dos letras.
        let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        //valida minusculas mayusculas numeros signos y 10 caracteres.
        let regexPassword = /^[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\-]{1,10}$/

        //si no existe dentro de form 
        if(!form.nombre.trim()){
            errors.nombre = 'El campo Nombre no debe estar vacio'
        }else if(!regexName.test(form.nombre)){
            errors.nombre = 'El campo Nombre no permite números ni caracteres especiales y un máximo de 50 caracteres'
        }

        if(!form.apellido.trim()){
            errors.apellido = 'El campo Apellido no debe estar vacio'
        }else if(!regexName.test(form.apellido)){
            errors.apellido = 'El campo Apellido no permite números ni caracteres especiales y un máximo de 50 caracteres'
        }

        if(!form.usuario.trim()){
            errors.usuario = 'El campo Usuario no debe estar vacio'
        }else if(!regexUsuario.test(form.usuario)){
            errors.usuario = 'El campo Usuario sólo permite letras y números hasta 10 caracteres'
        }

        if(!form.email.trim()){
            errors.email = 'El campo Email no debe estar vacio'
        } else if(!regexEmail.test(form.email)){
            errors.email = 'El campo Email debe tener @ y dominio como mínimo. Sólo se permite - y  _'
        }

        if(!form.password.trim()){
            errors.password = 'El campo Password no debe estar vacio'
        }else if(!regexPassword.test(form.password)){
            errors.password = 'El campo Password debe contener cómo máximo 10 caracteres'
        }
        
        return errors
    }


    const{form, loading,errors ,handleChange, handleSubmit} = useForm(initialData, onValidate);
    
    
    return (
        <form className='w-100' onSubmit={handleSubmit}>
            <label className='form-label'>Nombre</label>
            <input type="text" className='form-control' name="nombre"  id="nombre" value={form.nombre} /* onBlur={} */ onChange={handleChange}/>
            {errors.nombre && <div className="alert alert-danger p-1" role="alert">{errors.nombre}</div>}

            <label className='form-label'>Apellido</label>
            <input type="text" className='form-control' name="apellido" id="apellido" value={form.apellido} onChange={handleChange}/>
            {errors.apellido && <div className="alert alert-danger p-1" role="alert">{errors.apellido}</div>}

            <label className='form-label'>Correo electrónico</label>
            <input type="email" className='form-control' name="email" id="email" value={form.email} onChange={handleChange}/>
            {errors.email && <div className="alert alert-danger p-1" role="alert">{errors.email}</div>}

            <label className='form-label'>Usuario</label>
            <input type="text" className='form-control' name="usuario" id="usuario" value={form.usuario} onChange={handleChange}/>
            {errors.usuario && <div className="alert alert-danger p-1" role="alert">{errors.usuario}</div>}

            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} id="password" />
            {errors.password && <div className="alert alert-danger p-1" role="alert">{errors.password}</div>}
               

            <button className='btn btn-warning mt-1 w-100' disabled={loading}>{loading ? "Enviando..." : "Enviar"}</button>
        </form>
    )
}
        {/* <form className='w-100' onSubmit={handleSubmit}>
            <label className='form-label'>Nombre</label>
            <input type="text" className='form-control' name="nombre" value={form.nombre} onChange={handleChange}/>
            {errors.nombre && <div className="alert alert-danger p-1">{errors.nombre}</div>}

            <label className='form-label'>Correo electrónico</label>
            <input type="email" className='form-control' name="correo" value={form.correo} onChange={handleChange}/>
            {errors.correo && <div className="alert alert-danger p-1">{errors.correo}</div>}
            
            <label className='form-label'>Asunto</label>
            <input type="text" className='form-control'name="asunto" value={form.asunto} onChange={handleChange}/>
            {errors.asunto && <div className="alert alert-danger p-1">{errors.asunto}</div>}
            
            <label className='form-label'>Mensaje</label>
            <textarea className='form-control'name="mensaje" value={form.mensaje} onChange={handleChange}/>
            {errors.mensaje && <div className="alert alert-danger p-1">{errors.mensaje}</div>}
            
            <button className='btn btn-warning mt-1 w-100' disabled={loading}>{loading ? "Enviando..." : "Enviar"}</button>
        </form> */}
    
        

export default ContactForm















    /* const onValidate = (form) => {
        let errors = {}
        let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/;
        let regexComments = /^.{1,255}$/;
    
        if (!form.nombre.trim()) {
        errors.nombre = 'El campo "Nombre" no debe ser vacio.'
        } else if (!regexName.test(form.nombre)){
        errors.nombre = 'El campo "Nombre" solo acepta letras y espacios.'
        }
    
        if (!form.correo.trim()) {
        errors.correo = 'El campo "Correo" no debe ser vacio.'
        } else if (!regexEmail.test(form.correo)){
        errors.correo = 'El campo "Correo" contiene un formato no valido.'
        }
    
        if (!form.asunto.trim()) {
        errors.asunto = 'El campo "Asunto" no debe ser vacio.'
        } else if (!regexName.test(form.asunto)){
        errors.asunto = 'El campo "Asunto" solo acepta letras y espacios.'
        }
    
        if (!form.mensaje.trim()) {
        errors.mensaje = 'El campo "Mensaje" no debe ser vacio.'
        } else if (!regexComments.test(form.mensaje)){
        errors.mensaje = 'El campo "Mensaje" acepta solo 255 caracteres.'
        }
    
        return errors
    } */
