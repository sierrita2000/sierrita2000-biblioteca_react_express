import { useNavigate } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"
import { useContext, useState, useEffect } from "react"
import { LoginContext } from "../context/loginContext"


export default function Libro ({ id, titulo, calificacion, imagen, id_autor }) {
    const { VITE_HOST_API } = import.meta.env
    const navigate = useNavigate()

    const loginContext = useContext(LoginContext)
    const [ favorito, setFavorito ] = useState(false)
    const [ alquilado, setAlquilado ] = useState([false, false, null]) // alquilado, alquilado por usuario, tiempo hasta devolucion

    const [ data ] = useFetch(`${VITE_HOST_API}/autores/${id_autor}`)
    const [ usuario_que_alquila ] = useFetch(`${VITE_HOST_API}/alquileres/usuario-que-alquila/${id}`)

    const calcularTiempoDevolucion = (fecha_devolucion) => {
        const fecha_actual = Date.now()
        const diferencia_fechas = fecha_devolucion - fecha_actual
        
        const segundos = parseInt(diferencia_fechas / 1000)
        const minutos = parseInt(segundos / 60)
        const horas = parseInt(minutos / 60)
        const dias = parseInt(horas / 24)
    
        if (dias > 0) return `Quedan ${dias} días de alquiler`
        else if (horas > 0) return `Quedan ${horas} horas de alquiler`
        else if (minutos > 0) return `Quedan ${minutos} minutos de alquiler`
        else if (minutos < -1) return `Te has pasado ${minutos} minutos de alquiler`
        else if (horas < -1) return `Te has pasado ${horas} horas de alquiler`
        else if (dias < -1) return `Te has pasado ${dias} días de alquiler`
    }

    const eliminarLibro = async () => {
        try {
            const response = await fetch(`${VITE_HOST_API}/libros/elimina-libro/${id}`, {
                method: "DELETE"
            })
            const data = await response.json()

            data.affectedRows == 1 && alert('libro borrado correctamente!')
            navigate("/inicio/libros/todos")
        } catch (e) {
            console.log(e)
        }
    }

    const alquilarLibro = async () => {
        try {
            const response = await fetch(`${VITE_HOST_API}/libros/actualizar-alquiler`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "id_libro": id,
                    "id_user": loginContext[0].id
                })
            })
            const data = await response.json()
            const tiempo = calcularTiempoDevolucion(Date.now() + 604800000)
            console.log(tiempo)

            if (data.alquilado) {setAlquilado([true, true, tiempo]); navigate(`/inicio/libros-alquilados/${loginContext[0].id}`)}
            else alert(data.mensaje)
            
        } catch (e) {
            console.log(e)
        }
    }

    const devolverLibro = async () => {
        const devolver = confirm(`¿Seguro que quieres devolver '${titulo}'?`)
        if (devolver) {
            try {
                const response = await fetch(`${VITE_HOST_API}/libros/terminar-alquiler`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "id_libro": id
                    })
                })
                const data = await response.json()

                data.affectedRows == 1 && setAlquilado([false, false, null]) 
                navigate(`/inicio/libros-alquilados/${loginContext[0].id}`)
            } catch (e) {
                console.log(e)
            }
        }
    }

    useEffect(() => {
        try {
            fetch(`${VITE_HOST_API}/libros-alquilados`)
                .then(
                    response => response.json()
                )
                .then(
                    data => {
                        data.forEach(libro => {
                            const tiempoDevolucion = calcularTiempoDevolucion(Date.parse(libro.fecha_devolucion))
                            if (libro.id === id && libro.id_user === loginContext[0].id) {
                                setAlquilado([true, true, tiempoDevolucion])
                            } else if (libro.id === id) {
                                setAlquilado([true, false, tiempoDevolucion])
                            } 
                        })
                    }
                )
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <div className="libro">
            <div className="libro__imagen">
                <img src={imagen} alt="FOTO NO DISPONIBLE" />
            </div>
            <div className="libro__info">
                <h2>{titulo}</h2>
                <p className="calificacion">{calificacion}/10</p>
                { data && <p className="autor"><strong>Autor:</strong> {data[0]?.nombre}</p> }
            </div>
            {
                loginContext[0].rol === 1 ? (
                    <div className="botones_admins">
                        <button value={id} className={`boton_basura ${alquilado[0] && 'boton_basura_bloqueado'}`} onClick={() => {!alquilado[0] && eliminarLibro()}} ><i class="fa-solid fa-trash"></i></button>
                        <button value={id} className="boton_editar" ><i className="fa-solid fa-pencil"></i></button>
                    </div>
                ) : (
                    <div className="botones_usuarios">
                        {
                            (!alquilado[0] || alquilado[1]) && <button value={id} className="boton_alquilar_devolver" onClick={!alquilado[1] ? alquilarLibro : devolverLibro} >{!alquilado[1] ? 'ALQUILAR' : 'DEVOLVER'}</button>
                        }
                        <button value={id} className="boton_favorito"><i className="fa-regular fa-star"></i></button>
                    </div>
                )
            }
            {
                (alquilado[1] || (alquilado[0] && loginContext[0].rol === 1)) && (
                    <div className="tiempo_devolucion">
                        <p><strong>{alquilado[2]}</strong></p>
                        {loginContext[0].rol === 1 && <p>Alquilado por: <strong>{usuario_que_alquila ? usuario_que_alquila[0].nombre : "-"}</strong></p>}
                    </div>
                )
            }
            {
                alquilado[0] && (<div className="libro_alquilado_cartel">
                    <h1>ALQUILADO</h1>
                </div>)
            }
        </div>
    )
}