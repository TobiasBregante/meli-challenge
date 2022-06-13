const stringMessages = (path) => {
    return {
        'string.base': "'@path' debe ser un texto".replace("@path", path),
        'string.min': "'@path' debe tener al menos {#limit} caracteres".replace("@path", path),
        'string.max': "El tamaño maximo de '@path' es {#limit} caracteres".replace("@path", path),
        'any.required': "'@path' se requiere".replace("@path", path),
        'string.email': "'@path' deberia ser una dirección de email valida".replace("@path", path),
        'string.alphanum': "'@path' solo puede contener letras y numeros, sin espacios, guiones, etc".replace("@path", path),
        'string.empty': "'@path' no puede estar vacio".replace("@path", path),
        'string.pattern.base': "'@path' tiene un valor incorrecto".replace(/@path/g, path),
        'any.only': "'@path' debe ser uno de los siguientes valores {#valids}".replace("@path", path)
    }
}

const numberMessages = (path) => {
    return {
        'number.base': "'@path' deberia ser un numero".replace("@path", path),
        'number.min': "'@path' debe tener como minimo el numero {#limit} ".replace("@path", path),
        'number.max': "'@path' debe tener como maximo el numero {#limit}".replace("@path", path),
        'any.required': "'@path' se requiere".replace("@path", path),
    }
}

const booleanMessages = (path) => {
    return {
        'boolean.base': "'@path' deberia ser un valor booleano".replace("@path", path),
        'any.required': "'@path' se requiere".replace("@path", path)
    }
}

export default stringMessages

export {
    stringMessages,
    numberMessages,
    booleanMessages
}