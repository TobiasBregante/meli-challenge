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
    ...htmlProps
}) => {

    const [state, setState] = useState({
        value: value || "",
        isValid: isValid || 0 // Tree state, 0=Initial state, 1=false 2=true
    })
    const status = [color || "gray-500", "danger-500", "success-300"]


    const stateHandler = (v) => {
        const check = validate({
            value: v,
            type: type,
            max: htmlProps.max,
            min: htmlProps.min
        }) ? 2 : 1
        return {
            value: v,
            //If min or max is declared and value length is greater than 0 change color else use default color
            isValid: (htmlProps.max || htmlProps.min) && v.length > 0 ? check : 0
        }
    }

    const onChangeHandler = (e) => {
        if (htmlProps.onChange) {
            return htmlProps.onChange(stateHandler(e.target.value).value)
        }
        setState(stateHandler(e.target.value))
    }

    const clear = () => {
        if (htmlProps.onChange) {
            return htmlProps.onChange("")
        }
        return setState(stateHandler(""))
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
                `rounded-12 d-flex px-2 py-1 bg-${status[state.isValid]}`
            }>
                {
                    iconRight || null
                }
                <input
                    type={type}
                    className="w-100 border-0 bg-transparent"
                    value={state.value}
                    onChange={onChangeHandler}
                    placeholder={placeholder}
                    {...htmlProps} />
                {
                    <Icon
                        id="cancel"
                        className={`fs-5 mt-1 pointer  ${clearable && state.value.length == 0 && 'invisible'}`}
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