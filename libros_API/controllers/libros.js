import { connection } from "../index.js"

export const getAllLibros = async (req, res) => {
    try {
        const [ results ] = await connection.query(
            "SELECT * FROM libros"
        )

        res.send(results)
    } catch (error) {
        console.log(error)
    }
}

export const getLibrosByAutor = async (req, res) => {
    try {
        const id_autor = req.params.id_autor

        const [ results ] = await connection.query(
            `SELECT * FROM libros WHERE id_autor = ${id_autor}`
        )

        res.send(results)
    } catch (error) {
        console.log(error)
    }
}

export const createLibro = async (req, res, next) => {
    try {
        const titulo = req.body.titulo || null
        const calificacion = req.body.calificacion || null
        const cant_vendidos = req.body.cant_vendidos || null
        const lanzamiento = req.body.lanzamiento || null
        const editorial = req.body.editorial || null
        const precio = req.body.precio || null
        const num_paginas = req.body.num_paginas || null
        const imagen = req.body.imagen || null
        const id_autor = req.body.id_autor || null

        const [ results ] = await connection.query(
            `INSERT INTO libros (titulo, calificacion, cant_vendidos, lanzamiento, editorial, precio, num_paginas, imagen, id_autor) VALUES ('${titulo}', '${calificacion}', '${cant_vendidos}', '${lanzamiento}', '${editorial}', '${precio}', '${num_paginas}', '${imagen}', '${id_autor}')`
        )
        res.send(results)
    } catch (error) {
        console.log(error)
    }
}

export const deleteLibro = async (req, res) => {
    try {
        const id_libro = req.params.id_libro

        const [ results ] = await connection.query(
            `DELETE FROM libros WHERE id = ${id_libro}`
        )

        res.send(results)
    } catch (error) {
        console.log(error)
    }
}

export const getLibroPorNombre = async (req, res) => {
    try {
        const nombre_libro = req.params.nombre_libro

        const [ results ] = await connection.query(
            `SELECT * FROM libros WHERE titulo LIKE '%${nombre_libro}%'`
        )

        res.send(results)
    } catch (error) {
        console.log(error)
    }
}

export const getAllLibrosAlquilados = async (req, res) => {
    try {

        const [ results ] = await connection.query(
            `SELECT libros.*, alquileres.id_user, alquileres.fecha_inicio, alquileres.fecha_devolucion FROM libros INNER JOIN alquileres ON libros.id = alquileres.id_libro ORDER BY alquileres.fecha_inicio DESC`
        )

        res.send(results)
    } catch (error) {
        console.log(error)
    }
}

export const getLibrosAlquiladosPorUsuario = async (req, res) => {
    try {
        const id_user = req.params.id_user

        const [ results ] = await connection.query(
            `SELECT libros.* FROM libros INNER JOIN alquileres ON libros.id = alquileres.id_libro WHERE alquileres.id_user = '${id_user}' ORDER BY alquileres.fecha_inicio DESC`
        )

        res.send(results)
    } catch (error) {
        console.log(error)
    }
}
