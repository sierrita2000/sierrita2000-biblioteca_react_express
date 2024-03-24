import { connection } from "../index.js"

export const createAlquiler = async (req, res) => {
    try {
        const id_libro = req.body.id_libro
        const id_user = req.body.id_user
        const fecha_devolucion_max = dateFormat(new Date(Date.now() + 604800000))

        const [ data_query_1 ] = await connection.query(
            `SELECT COUNT(alquileres.id_user) as n_libros_alquilados FROM alquileres WHERE alquileres.id_user = ${id_user}`
        )

        if (data_query_1[0].n_libros_alquilados < 2) {
            const [ data_query_2 ] = await connection.query(
                `INSERT INTO alquileres (id_user, id_libro, fecha_devolucion) VALUES('${id_user}', '${id_libro}', '${fecha_devolucion_max}')`
            )
            res.status(200).send({
                mensaje: `Añadido a alquileres [id_user=${id_user}, id_libro=${id_libro}]`,
                alquilado: true
            })
        } else {
            res.status(200).send({
                mensaje: `No se ha podido alquilar el libro porque el usuario con id=(${id_user}) ya tiene alquilados 2 libros`,
                alquilado: false
            })
        }
    } catch (error) {
        console.log(error)
    }
}

export const deleteAlquiler = async (req, res) => {
    try {
        const id_libro = req.body.id_libro

        const [ results ] = await connection.query(
            `DELETE FROM alquileres WHERE id_libro = '${id_libro}'`
        )

        res.send(results)
    } catch (error) {
        console.log(error)
    }
}

export const getAutorQueAlquila = async (req, res) => {
    try {
        const id_libro = req.params.id_libro

        const [ results ] = await connection.query(
            `SELECT users.* FROM users INNER JOIN alquileres ON users.id = alquileres.id_user WHERE alquileres.id_libro = ${id_libro}`
        )

        res.send(results)
    } catch (error) {
        console.log(error)
    }
}

const dateFormat = (fecha_actual) => {
    const copia_fecha =  fecha_actual.toISOString().split('.')[0].replace('T', ' ')
    return copia_fecha
}