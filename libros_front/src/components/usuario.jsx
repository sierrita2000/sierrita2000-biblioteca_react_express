

export default function ({ id, nombre, imagen, rol }) {

    const { VITE_HOST_API } = import.meta.env

    return (
        <div className="usuario">
            <div className="usuario__imagen">
                <img src={imagen.substring(0, 4) === "http" ? imagen : `${VITE_HOST_API}/public/${imagen}`} alt="SIN FOTO" />
            </div>
            <h2>{nombre}</h2>
            <h4>{ rol === 1 ? 'ADMIN' : 'CLIENTE' }</h4>
        </div>
    )
}