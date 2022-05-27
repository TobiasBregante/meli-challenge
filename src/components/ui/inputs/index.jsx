import Icon from '@/ui/icons'
import { useState } from 'react'
import validate from './validation'

const Input = ({
    clearable,
    value,
    isValid,
    type,
    placeholder,
    label,
    color,
    className,
    icon,
    iconRight,
    onChange,
    ...htmlProps
}) => {

    const [state, setState] = useState(isValid || 0)
    const status = [color || "gray-500", "danger-500", "success-300"]

    const check = (v) => {
        const checkValue = validate({
            value: v,
            type: type,
            max: htmlProps.max,
            min: htmlProps.min
        }) ? 2 : 1
        return (htmlProps.max || htmlProps.min) && v.length > 0 ? checkValue : 0
    }

    const onChangeHandler = (e)=>{
        setState(check(e.target.value))
        onChange(e)
    }

    const clear = () => {
        onChange({target:{value:""}})
    }

    return (
        <div className={`w-100 ${className}`}>
            {
                label &&
                <label className="ms-1 fw-400" >
                    {label}
                </label>
            }
            <div className={
                `rounded-12 d-flex px-2 py-1 bg-${status[state]}`
            }>
                {
                    iconRight || null
                }
                <input
                    type={type}
                    className="w-100 border-0 bg-transparent"
                    value={value}
                    onChange={onChangeHandler}
                    placeholder={placeholder}
                    {...htmlProps} />
                {
                    <Icon
                        id="cancel"
                        className={`fs-5 mt-1 pointer  ${(
                            clearable && value && value.length > 0)
                            ? "":'invisible'}`}
                        onClick={clear} />

                }
                {
                    icon || null
                }
            </div>
        </div>
    )
}

Input.defaultProps = {
    type: "text",
    clearable: false,
}

export default Input