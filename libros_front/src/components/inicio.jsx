import { useContext, useState, useEffect } from "react"
import { useFetch } from "../hooks/useFetch"
import { LoginContext } from "../context/loginContext"
import { Outlet, NavLink, Link } from "react-router-dom"


export default function Inicio () {
    const { VITE_HOST_API } = import.meta.env
    const loginContext = useContext(LoginContext)

    const [ libro, setLibro ] = useState('')

    const [ data ] = useFetch(`${VITE_HOST_API}/autores`)
    
    return (
        <div className="inicio">
            <div className="inicio__filtros">
                <div className="inicio__filtros__buscador">
                    <input type="text" name="buscador" id="buscador" placeholder="Busca tu libro..." value={libro} onChange={(e) => setLibro(e.target.value)} />
                    <button><Link className="boton_lupa" to={`/inicio/libros/libro/${libro}`}>🔎</Link></button>
                </div>
                <form method="post">
                    <div className="formulario_buscador_todos">
                        <button>
                            <NavLink className={({ isActive }) =>
                                        isActive
                                            ? "formulario__links active"
                                            : "formulario__links"
                                        } to="/inicio/libros/todos" >
                                Todos los libros
                            </NavLink>
                        </button>
                    </div>
                    <p>Buscar por autor:</p>
                    <div className="buscador_autores">
                        {
                                data?.map(autor => {
                                    return <div key={autor.id} className="buscador_autores__autor">
                                                <button>
                                                    <NavLink className={({ isActive }) =>
                                                                isActive
                                                                    ? "formulario__links active"
                                                                    : "formulario__links"
                                                                } to={`/inicio/libros/autor/${autor.id}`}>
                                                        {autor.nombre}
                                                    </NavLink>
                                                </button>
                                            </div>
                                })
                        }
                    </div>
                    <div className="raya_separatoria"></div>
                    {
                        loginContext[0].rol === 1 ? (
                            <>
                                <div className="formulario__crear_libro">
                                    <button>
                                        <NavLink className={({ isActive }) =>
                                                                            isActive
                                                                                ? "formulario__navlink active"
                                                                                : "formulario__navlink"
                                                                            } to="/inicio/crear-libro">
                                            Añadir libro
                                        </NavLink>
                                    </button>
                                </div>
                                <div className="formulario__libros_alquilados">
                                    <button>
                                        <NavLink className={({ isActive }) =>
                                                                            isActive
                                                                                ? "formulario__navlink active"
                                                                                : "formulario__navlink"
                                                                            } to="/inicio/todos-libros-alquilados">
                                            Libros alquilados
                                        </NavLink>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="formulario__boton_alquilados">
                                <button>
                                    <NavLink className={({ isActive }) =>
                                                                        isActive
                                                                            ? "formulario__navlink active"
                                                                            : "formulario__navlink"
                                                                        } to={`/inicio/libros-alquilados/${loginContext[0].id}`}>
                                        Mis alquilados
                                    </NavLink>
                                </button>
                            </div>
                        )
                    }
                    <div className="raya_separatoria"></div>
                    {
                        loginContext[0].rol === 1 && (
                            <div className="formulario__boton_usuarios">
                                <button>
                                    <NavLink className={({ isActive }) =>
                                                                        isActive
                                                                            ? "formulario__navlink active"
                                                                            : "formulario__navlink"
                                                                        } to={`/inicio/usuarios`}>
                                        Usuarios
                                    </NavLink>
                                </button>
                            </div>
                        )
                    }
                </form>
                <div className="inicio__filtros__login">
                    <div className="inicio__filtros__login__foto">
                        <img src={loginContext[0].imagen.substring(0, 4) === "http" ? loginContext[0].imagen : `${VITE_HOST_API}/public/${loginContext[0].imagen}`}></img>
                    </div>
                    <p>{loginContext[0].nombre}</p>
                </div>
            </div>
            <div className="inicio__buscador">
                <Outlet />
            </div>
        </div>
    )
}