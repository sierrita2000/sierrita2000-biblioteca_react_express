import { Form, redirect } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"

const { VITE_HOST_API } = import.meta.env

export const action = async ({ request }) => {
    const formData = await request.formData()
    
    const response = await fetch(`${VITE_HOST_API}/libros/crear-libro`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            titulo: formData.get("titulo"),
            calificacion: formData.get("calificacion"),
            cant_vendidos: formData.get("cant_vendidos"),
            lanzamiento: formData.get("lanzamiento"),
            editorial: formData.get("editorial"),
            precio: formData.get("precio"),
            num_paginas: formData.get("num_paginas"),
            imagen: formData.get("imagen"),
            id_autor: formData.get("id_autor"),
        })
    })
    const data = await response.json()

    data.affectedRows === 1 ? alert("Libro creado correctamente") : alert("No se ha podido crear el libro")
    return redirect(`/inicio/libros/libro/${formData.get("titulo")}`)
}


export default function CrearLibros () {

    const [ dataAutores ] = useFetch(`${VITE_HOST_API}/autores`)

    const vaciarCampos = (e) => {
        e.preventDefault()
        const inputs = document.querySelectorAll('.anadir_libro__form input')
        inputs.forEach(input => {
            input.value = null
        })
    }

    return (
        <div className="anadir_libros">
            <Form className="anadir_libro__form" method="post">
                <div className="form_nombre">
                    <label htmlFor="titulo">Titulo: </label>
                    <input type="text" name="titulo" id="titulo" />
                    <p className='advertencia_campo_ob'><i class="fa-solid fa-triangle-exclamation"></i> Este campo es obligatorio</p>
                </div>
                <div className="form_autor">
                    <label htmlFor="autor">Autor: </label>
                    <select name="id_autor" id="select_autor_form">
                        {
                            dataAutores?.map(autor => {
                                return <option key={autor.id} value={autor.id}>{autor.nombre}</option>
                            })
                        }
                    </select>
                </div>
                <div className="form_calificacion">
                    <label htmlFor="calificacion">Calificacion: </label>
                    <input type="number" name="calificacion" id="calificacion_form" min="0" max="10" />
                </div>
                <div className="form_lanzamiento">
                    <label htmlFor="lanzamiento">Lanzamiento: </label>
                    <input type="text" name="lanzamiento" id="lanzamiento" />
                </div>
                <div className="form_editorial">
                    <label htmlFor="editorial">Editorial: </label>
                    <input type="text" name="editorial" id="editorial" />
                </div>
                <div className="form_precio">
                    <label htmlFor="precio">Precio: </label>
                    <input type="number" name="precio" id="precio" step="0.01" min="0" />
                </div>
                <div className="form_cant_vendidos">
                    <label htmlFor="cant_vendidos">Cantidad de libros vendidos: </label>
                    <input type="number" name="cant_vendidos" id="cant_vendidos" min="0" />
                </div>
                <div className="form_paginas">
                    <label htmlFor="num_paginas">Número de paginas: </label>
                    <input type="number" name="num_paginas" id="paginas" min="0" />
                </div>
                <div className="form_imagen">
                    <label htmlFor="imagen">Imagen: </label>
                    <input type="text" name="imagen" id="imagen" />
                </div>
                <div className="form__botones">
                    <button type="submit">AÑADIR</button>
                    <button onClick={(e) => vaciarCampos(e)}>BORRAR</button>
                </div>
            </Form>
        </div>
    )
}