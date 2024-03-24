
export const logErrores = async (error, req, res, next) => {
    res.send({
        error: true,
        mensaje: error
    })
}