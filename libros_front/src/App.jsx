import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginSignup, { actionLogin, actionSignup } from './components/Login_Signup';
import Inicio from './components/inicio';
import { useState } from 'react';
import { LoginContext } from './context/loginContext';
import Libros, { loaderMisAlquilados, loaderPorAutor, loaderPorLibro, loaderTodos, loaderTodosAlquilados } from './components/libros';
import CrearLibros, { action as crearLibroAction } from './components/crear_libros';
import Usuarios from './components/usuarios';
import { loader as usuariosLoader } from './components/usuarios'

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginSignup />,
    action: async ({ request }) => {
      const formData = await request.formData()
      let option = formData.get('option')

      if (option === 'login') return actionLogin(formData)
      else if (option === 'signup') return actionSignup(formData)
    }
  },
  {
    path: "/inicio",
    element: <Inicio />,
    children: [
      {
        index: true,
        element:  <div className='inicio__buscador__espera'>
                    <img src="../persona-leyendo.png" />
                    <h1>Esperando busqueda...</h1>
                  </div>
      },
      {
        path: "/inicio/libros/todos",
        element: <Libros />,
        loader: loaderTodos,
      },
      {
        path: "/inicio/libros/autor/:id_autor",
        element: <Libros />,
        loader: loaderPorAutor,
      },
      {
        path: "/inicio/libros/libro/:nombre_libro",
        element: <Libros />,
        loader: loaderPorLibro,
      },
      {
        path: "/inicio/crear-libro",
        element: <CrearLibros />,
        action: crearLibroAction,
      },
      {
        path: "/inicio/libros-alquilados/:id_user",
        element: <Libros />,
        loader: loaderMisAlquilados,
      },
      {
        path: "/inicio/todos-libros-alquilados",
        element: <Libros />,
        loader: loaderTodosAlquilados,
      },
      {
        path: "/inicio/usuarios",
        element: <Usuarios />,
        loader: usuariosLoader,
      }
    ]
  }
]);

function App() {

  const [ login, setLogin ] = useState(null)

  return (
    <LoginContext.Provider value={[login, setLogin]}>
      <RouterProvider router={router} />
    </LoginContext.Provider>
  )
}

export default App
