import { Router } from "express"
import { getAllLibros, getLibrosByAutor, createLibro, deleteLibro, getLibroPorNombre, getAllLibrosAlquilados, getLibrosAlquiladosPorUsuario } from "../controllers/libros.js"
import { getAllAutores, getAutorById } from "../controllers/autores.js"
import { createUser, validateUser, findUserName, getAllUsuarios, getImagenUsuario } from "../controllers/users.js"
import { createAlquiler, deleteAlquiler, getAutorQueAlquila } from "../controllers/alquileres.js"
import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}.jpg`)
    }
})
  
const upload = multer({ storage })

export const router = Router()

/**
 * RUTAS DE LIBROS  
 */
router.get('/libros', getAllLibros)
router.get('/libros/autor/:id_autor', getLibrosByAutor)
router.get('/libros/libro/:nombre_libro', getLibroPorNombre)
router.get('/libros-alquilados', getAllLibrosAlquilados)
router.get('/libros-alquilados/user/:id_user', getLibrosAlquiladosPorUsuario)

router.post('/libros/crear-libro', createLibro)

router.delete('/libros/elimina-libro/:id_libro', deleteLibro)

/**
 * RUTAS DE AUTORES
 */

router.get('/autores', getAllAutores)
router.get('/autores/:id_autor', getAutorById)

/**
 * RUTAS DE USUARIOS
 */

router.get('/usuario-existente/:user_name', findUserName)
router.get('/usuarios', getAllUsuarios)
router.get('/usario/:id_user/imagen', getImagenUsuario)

router.post('/usuario-valido', validateUser)
router.post('/crear-usuario', upload.single('user_imagen2'), createUser)

/**
 * RUTAS DE ALQUILERES
 */

router.get('/alquileres/usuario-que-alquila/:id_libro', getAutorQueAlquila)

router.post('/libros/actualizar-alquiler', createAlquiler)

router.delete('/libros/terminar-alquiler', deleteAlquiler)