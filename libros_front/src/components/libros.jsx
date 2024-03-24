import { useLoaderData } from "react-router-dom"
import Libro from "./libro"

const { VITE_HOST_API } = import.meta.env

export const loaderTodos = async () => {
    const response = await fetch(`${VITE_HOST_API}/libros`)
    const data = await response.json()
    
    return { data }
}

export const loaderPorAutor = async ({ params }) => {
    const id_autor = params.id_autor
    const response = await fetch(`${VITE_HOST_API}/libros/autor/${id_autor}`)
    const data = await response.json()

    return { data }
}

export const loaderPorLibro = async ({ params }) => {
    const nombre_libro = params.nombre_libro
    const response = await fetch(`${VITE_HOST_API}/libros/libro/${nombre_libro}`)
    const data = await response.json()

    return { data }
}

export const loaderMisAlquilados = async ({ params }) => {
    const id_user = params.id_user
    const response = await fetch(`${VITE_HOST_API}/libros-alquilados/user/${id_user}`)
    const data = await response.json()

    return { data }
}

export const loaderTodosAlquilados = async () => {
    const response = await fetch(`${VITE_HOST_API}/libros-alquilados`)
    const data = await response.json()

    return { data }
}

export default function Libros() {

    const { data } = useLoaderData()

    return (
        <div className="libros">
            {
                data?.length != 0 ? (
                    data?.map(libro => {
                        return <Libro key={libro?.id} {...libro} />
                    })
                ) : (
                    <div className="libros__vacio">
                        <img src="../../../estanteria.png" />
                        <h1>No existen libros con ese titulo</h1>
                    </div>
                )
            }
        </div>
    )
}