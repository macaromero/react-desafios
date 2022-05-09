//  IMPORTS  //

// CSS
import './NewUserVIew.css';

// Material UI
import { TextField, Button } from '@mui/material';

// React
import { useEffect, useState, useContext } from 'react';

// react-router-dom
import { useNavigate } from 'react-router-dom';

// Context
import LogInContext from '../../context/LogInContext';


//  COMPONENT   //
const NewUserVIew = () => {

    // Llamada a contexto
    const {loggedIn, createUser, formSuccess, setFormSuccess} = useContext(LogInContext);

    // Instancia de useNavigate
    const navigate = useNavigate();

    // Estado para crear el formulario
    const [form, setForm] = useState({
        name: "", 
        phone: "",
        email:"",
        user: "",
        password: ""
    });


    //  FUNCTIONS   //

    // Función para actualizar el estado del formulario
    const formChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value,
        })
    }

    // Función para enviar el formulario al servidor
    const sendForm = (e) => {
        e.preventDefault();
        createUser(form)
    }

    // Función de enrutamiento para volver a la sección de productos
    const navigateHome = () => {
        navigate('/products')
    }


    // UseEffect para reestablecer al estado a falso
    useEffect(() => {
        setFormSuccess(false)
    }, [])


    //  HTML  //
    return (
        <>
            {
                !loggedIn ? (
                    <>
                        {
                            !formSuccess ? (
                                <div className='container-newUserView'>
                                    <div className="row-newUserView m-0">
                                        <h3 className="title-newUserView">Creá tu cuenta</h3>
                                    </div>
                                    <div className="row-newUserView m-0">
                                        <div className='recuadro-newUserView'></div>
                                    </div>
                                    <div className="row-newUserView">
                                        <div className="col-newUserView">
                                            <form onSubmit={sendForm}>
                                                <div className="row-newUserView mb-3">
                                                    <TextField label="Nombre" name="name" value={form.name} required fullWidth onChange={(e) => formChange(e)} id='formInput-newUserView'/>
                                                </div>
                                                <div className="row-newUserView mb-3">
                                                    <TextField label="Teléfono" name="phone" value={form.phone} required fullWidth onChange={(e) => formChange(e)} id='formInput-newUserView'/>
                                                </div>
                                                <div className="row-newUserView mb-3">
                                                    <TextField label="Correo electrónico" name="email" value={form.email} type='email' required fullWidth onChange={(e) => formChange(e)} id='formInput-newUserView'/>
                                                </div>
                                                <div className="row-newUserView mb-3">
                                                    <TextField label="Nombre de usuario" name="user" value={form.user} required fullWidth onChange={(e) => formChange(e)} id='formInput-newUserView'/>
                                                </div>
                                                <div className="row-newUserView mb-3">
                                                    <TextField label="Contraseña" name="password" value={form.password} type='password' required fullWidth onChange={(e) => formChange(e)} id='formInput-newUserView'/>
                                                </div>
                                                <div>
                                                    <Button type='submit' id='btnSend-newUserView'>Enviar</Button>
                                                </div>
                                            </form>
                                        </div>
                                    </div> 
                                </div>
                            )
                            :(
                                <div className="container-newUserView">
                                    <div className="row-newUserView">
                                        <h3 className="title-newUserView">¡Tu usuario se generó correctamente!</h3>
                                    </div>
                                    <div className="row-newUserView">
                                        <p>Te damos la bienvenida <strong>{form.name}</strong></p>
                                    </div>  
                                </div>
                            )
                        }
                    </>
                )
                :(
                    <div className="container-newUserView">
                        <div className="row-newUserView">
                            <h3 className="title-newUserView">Ya tenés una cuenta creada</h3>
                        </div>
                        <div className="row-newUserView">
                            <div className="col-newUserView">
                                <Button id='btnSend-newUserView' onClick={navigateHome}>Mirá todos los productos que tenemos para vos</Button>
                            </div>
                        </div>  
                    </div>
                )
            }
            
        </>
    )
}

export default NewUserVIew;