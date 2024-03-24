import { useLoaderData } from "react-router-dom"
import Usuario from "./usuario"

const { VITE_HOST_API } = import.meta.env

export const loader = async () => {
    const response = await fetch(`${VITE_HOST_API}/usuarios`)
    const data = await response.json()

    return [ ...data ]
}

export default function Usuarios () {

    const usuarios = useLoaderData()
    console.log(usuarios)

    return (
        <div className="usuarios">
            {
                usuarios?.map(usuario => {
                    return <Usuario key={usuario.id} {...usuario} />
                })
            }
        </div>
    )
}