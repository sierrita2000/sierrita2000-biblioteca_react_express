import { connection } from '../index.js'

export const logger = async (req, res) => {
    try {
        const metodo = req.method
        const url = req.baseUrl
        const fecha_actual = dateFormat(new Date())
        const user_name = req.body.user_name
        let mensaje = ""
        
        switch (url) {
            case "/usuario-valido":
                mensaje = `LOG IN --> ${user_name}`
                break
            case "/crear-usuario":
                mensaje = `CREANDO --> ${user_name}`
            default:
                break
        }

        const [ results ] = await connection.query(
            `INSERT INTO log (nombre_user, tipo, mensaje, created_at) VALUES ('${user_name}', '${metodo}', '${mensaje}', '${fecha_actual}')`
        )
    } catch (error) {
        console.log(error)
    }
}

const dateFormat = (fecha_actual) => {
    const copia_fecha =  fecha_actual.toISOString().split('.')[0].replace('T', ' ')
    return copia_fecha
}