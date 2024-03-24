import { connection } from "../index.js"
import bcrypt from 'bcrypt'

export const validateUser = async (req, res, next) => {
    try {
        const user_name = req.body.user_name
        const user_password = req.body.user_password

        const [ results ] = await connection.query(
            `SELECT * FROM users WHERE nombre = '${user_name}'`
        )

        if (results.length > 0) {
            if (bcrypt.compareSync(user_password, results[0].password)) {
                res.status(200).send({
                    error: false,
                    mensaje: 'usuario válido'
                })
                next()
            } else {
                throw new Error('Contraseña incorrecta')
            }
        } else {
            throw new Error('Usuario no existente')
        }
    } catch (error) {
        next(error)
    }
}

export const createUser = async (req, res, next) => {
    try {
        const user_name = req.body.user_name2
        const user_password = bcrypt.hashSync(req.body.user_password2, 10)
        const user_imagen = req.file.filename

        const [ results ] = await connection.query(
            `INSERT INTO users (nombre, password, imagen) VALUES('${user_name}', '${user_password}', '${user_imagen}')`
        )

        res.send(results)
        next()
    } catch (error) {
        next(error)
    }
}

export const findUserName = async (req, res) => {
    try {
        const user_name = req.params.user_name

        const [ results ] = await connection.query(
            `SELECT * FROM users WHERE nombre = '${user_name}'`
        )

        res.send(results)
    } catch (error) {
        console.log(error)
    }
}

export const getAllUsuarios = async (req, res) => {
    try {
        const [ results ] = await connection.query(
            `SELECT * FROM users`
        )

        res.send(results)
    } catch (error) {
        console.log(error)
    }
}

export const getImagenUsuario = async (req, res) => {
    try {
        const id_user = req.params.id_user

        const [ results ] = await connection.query(
            `SELECT imagen FROM users WHERE id = ${id_user}`
        )

        res.send(results)
    } catch (error) {
        console.log(error)
    }
}