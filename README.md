BIBLIOTECA DE LIBROS (Express + React + Xammp)

libros_front (cliente)
libros_API (servidor)

BBBDD --> PhpMyAdmin (mySQL)

Objetivo:
Desarrollar un sistema de gestión de biblioteca que permita a los usuarios consultar y alquilar libros. El sistema debe tener roles de usuario y bibliotecario, con funcionalidades específicas para cada uno.

Roles de Usuario:

    Los usuarios pueden registrarse en el sistema.
    Pueden ver la lista de libros disponibles para alquilar.
    Pueden alquilar automáticamente libros.
    Puede tener hasta un máximo de 2 libros por vez.
    Tienen una página de perfil con una lista de sus alquileres activos/pasados y las fechas de devolución ordenando los alquileres de mas nuevo a más antiguo.

Roles del Bibliotecario:

    Los bibliotecarios pueden crear y editar información de libros (título, autor, género, etc.)
    Pueden ver una lista de todos los alquileres pendientes de entrega en una única pantalla.
    Pueden ver el perfil de cualquier usuario.
    Pueden ver el registro de Log y Errores

Alquiler de Libros:

    El sistema debe registrar la fecha de alquiler y la fecha de devolución máxima (1 semana desde la fecha de alquiler).
    Los libros deben marcarse como no disponibles cuando estén alquilados por un usuario.
    Los libros deben volver a estar disponibles una vez que el usuario los devuelve.

Registro de Log y Errores (solo Backend):

    El sistema debe registrar la actividad del backend (Login, Logout de usuarios, crear/editar libro) y todos los errores ocurridos durante su funcionamiento, incluyendo información relevante como la fecha, el tipo de error, el usuario y la descripción de la acción o el problema.
