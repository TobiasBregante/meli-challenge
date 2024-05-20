const badRequest = (res, msg="Hay un error con tu solicitud") => (
    res.status(400).json({
        msg: msg
    })
)

const methodNotAllowed = (res, msg="Metodo http no autorizado") => (
    res.status(405).json({
        msg: msg
    })
)

const internalServerError = (res, err, msg="Ocurrio un error de nuestro lado") => {
    console.log(err);
    return (res.status(500).json({
        msg: msg
    }))
}

const notFound = (res,msg="No encontramos lo que buscas") => (res.status(404).json({
    msg: msg
}))

const unauthorized = (res,msg="No tienes permiso para acceder a esto") => (res.status(401).json({
    msg: msg
}))

export default methodNotAllowed

export {
    methodNotAllowed,
    internalServerError,
    notFound,
    badRequest,
    unauthorized
}