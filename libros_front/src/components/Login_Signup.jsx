import { useContext, useState } from "react"
import { Form, redirect } from "react-router-dom"
import { LoginContext } from "../context/loginContext.js"

const { VITE_HOST_API } = import.meta.env

export const actionLogin = async (formData) => {
    const user_name = formData.get('user_name')
    const user_password = formData.get('user_password')

    const response = await fetch(`${VITE_HOST_API}/usuario-valido`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'user_name': user_name,
            'user_password': user_password
        })
    })
    const data = await response.json()
    console.log(data)

    if (!data.error) {
        return redirect('/inicio')
    } else {
        alert(data.mensaje)
        return null
    }
}

export const actionSignup = async (formData) => {
    const user_name = formData.get('user_name2')
    const user_password = formData.get('user_password2')
    const user_password_repeat = formData.get('user_password_repeat2')


    if (!user_password || !user_name || !user_password_repeat) {
        alert('Debes rellenar todos los campos!!!')
        return null
    } else if (user_password != user_password_repeat) {
        alert('Las contraseñas no coinciden!!!')
        return null
    } else {
        const response = await fetch(`${VITE_HOST_API}/usuario-existente/${user_name}`)
        const data = await response.json()

        if (data.length != 0) {
            alert('Ese nombre de usuario ya existe!!!')
            return null
        } else {
            const response_create = await fetch(`${VITE_HOST_API}/crear-usuario`, {
                method: "POST",
                body: formData
            })
            const data_create = await response_create.json()
            
            return redirect("/inicio")
        }
    }
}


export default function LoginSignup () {
    const loginContext = useContext(LoginContext)

    const [ imagen, setImagen ] = useState('')
    imagen && URL.createObjectURL(imagen)

    const girar_caja = () => {
        const caja = document.querySelector('.login_signup__cuadro__cuadro')
        const signup = document.querySelector('.signup')

        caja.classList.toggle('girar_cuadro')
        setTimeout(() => signup.classList.toggle('signup__delante'), 500)
    }

    const guardarUsuario = async (nombre_usuario) => {
        const response = await fetch(`${VITE_HOST_API}/usuario-existente/${nombre_usuario}`)
        const data = await response.json()

        loginContext[1]({...data[0]})
    }

    return (
        <div className="login_signup">
            <div className="login_signup__info">
                <div className="login_signup__info__logo">
                    <img src="../../logo-removebg-preview.png" />
                    
                </div>
                <h1>¡TU APP DE LIBROS!</h1>
                <p>En esta aplicación podrás encontrar información de tus libros favoritos, y de todos sus autores. <br/><br /> Navega por toda ella con facilidad</p>
                <div className="login_signup__info__redes">
                    <i className="fa-brands fa-instagram"></i>
                    <i className="fa-brands fa-tiktok"></i>
                    <i className="fa-brands fa-facebook-f"></i>
                </div>
                <div className="login_signup__info__fondo"></div>
            </div>
            <div className="login_signup__cuadro">
                <div className="login_signup__cuadro__cuadro">
                    <div className="login">
                        <img src="../../logo-removebg-preview.png" />
                        <Form className="login_signup__cuadro__cuadro__formulario" method="post" >
                            <label htmlFor="user_name">usuario:</label>
                            <input type="text" name="user_name" id="user_name" />
                            <label htmlFor="user_password">contraseña:</label>
                            <input type="password" name="user_password" id="user_password" />
                            <button name="option" value="login" type="submit" onClick={() => guardarUsuario(document.getElementById('user_name').value)}>ACEPTAR</button>
                        </Form>
                        <p>Aún no tienes cuenta, <button onClick={girar_caja} className="button__rotar_caja">Suscribete ahora</button></p>
                    </div>
                    <div className="signup">
                        <img src="../../logo-removebg-preview.png" />
                        <Form className="login_signup__cuadro__cuadro__formulario" method="post" encType="multipart/form-data" >
                            <label htmlFor="user_name">usuario:</label>
                            <input type="text" name="user_name2" id="user_name2" />
                            <label htmlFor="user_password">contraseña:</label>
                            <input type="password" name="user_password2" id="user_password2" />
                            <label htmlFor="user_password_repeat">repite contraseña:</label>
                            <input type="password" name="user_password_repeat2" id="user_password_repeat2" />
                            <div className="formulario_imagen">
                                <label htmlFor="user_imagen2"><i className="fa-solid fa-folder-open"></i></label>
                                <input type="file" name="user_imagen2" id="user_imagen2" accept="image/*" onChange={(e) => setImagen(e.target.files[0])} />
                                <div className="formulario_imagen__imagen">
                                    {
                                        imagen ? (
                                            <img src={URL.createObjectURL(imagen)} alt={imagen.name} />
                                        ) : (
                                            <i className="fa-solid fa-user"></i>
                                        )
                                    }
                                </div> 
                            </div>
                            <button name="option" value="signup" type="submit" onClick={() => guardarUsuario(document.getElementById('user_name2').value)}>ACEPTAR</button>
                        </Form>
                        <p>Ya tienes cuenta, <button onClick={girar_caja} className="button__rotar_caja">Logueate ahora</button></p>
                    </div>
                </div>
            </div>
        </div>
    )
}