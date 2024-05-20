import { nanoid } from "nanoid";

const defaultId = (length = 16) => ({
    type: String,
    minLength: 4,
    maxLength: 128,
    trim: true,
    default: () => nanoid(length)
})

const typeString = (isRequired = true, min = 2, max = 256,) => {
    return {
        type: String,
        trim: true,
        minLength: min,
        maxLength: max,
        required: isRequired,
    }
}
const typeNumber = (isRequired = true, min = 2, max = 256,) => {
    return {
        type: Number,
        min: min,
        max: max,
        required: isRequired,
    }
}

export default defaultId

export {
    defaultId,
    typeString,
    typeNumber
}