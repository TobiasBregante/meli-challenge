import Joi from "joi"

const validate = ({value,type,max,min})=>{
    const schema = Joi
    if (type == "text" || type == "password") {
        schema = schema.string()
    }
    if (type == "number") {
        schema = schema.number()
    }
    if (type == "email") {
        schema = schema.string().email({ tlds: {allow: false}})
    }
    if (max) {
        schema = schema.max(max)
    }
    if (min) {
        schema = schema.min(min)
    }
    const {error} = schema.validate(value)

    if (error) {
        return false
    }
    return true
}

export default validate