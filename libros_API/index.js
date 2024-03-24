import express from 'express'
import cors from 'cors'
import mysql from 'mysql2/promise'
import 'dotenv/config'
import { router } from './routes/index.routes.js'
import { logger } from './middlewares/logger.js'
import { logErrores } from './middlewares/errores.js'

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use(cors())

export const connection = await mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.BBDD
})

app.use('/public', express.static('uploads'))
app.use(router)
app.use('/usuario-valido', logger)
app.use('/crear-usuario', logger)
app.use(logErrores)

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})