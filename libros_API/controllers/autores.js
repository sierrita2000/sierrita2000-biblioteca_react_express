import { connection } from "../index.js"

export const getAllAutores = async (req, res) => {
    try {
        const [ results ] = await connection.query(
            "SELECT * FROM autores"
        )

        res.send(results)
    } catch (error) {
        console.log(error)
    }
}

export const getAutorById = async (req, res) => {
    try {
        const id_autor = req.params.id_autor

        const [ results ] = await connection.query(
            `SELECT * FROM autores WHERE id = '${id_autor}'`
        )

        res.send(results)
    } catch (error) {
        console.log(error)
    }
}