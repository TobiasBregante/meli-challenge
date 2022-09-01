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
    min,
    max,
    ...htmlProps
}) => {

    const [visible, setVisible] = useState(false),
    [state, setState] = useState(isValid || 0)
    const status = [color || "gray-500", "danger-500", "success-300"]

    const check = (v) => {
        let checkValue = validate({
            value: v,
            type: visible?"text":"password",
            max: max,
            min: min
        }) ? 2 : 1

        return (max || min) && v.length > 0 ? checkValue : 0
    }

    const onChangeHandler = (e)=>{
        if (isValid == undefined) {
            setState(check(e.target.value))
        }
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
                `rounded-12 d-flex px-2 py-1 text-dark bg-${status[isValid || state]}`
            }>
                <Icon id="lock" />
                <input
                    type={visible?"text":"password"}
                    className="w-100 border-0 bg-transparent"
                    value={value}
                    onChange={onChangeHandler}
                    placeholder={placeholder}
                    {...htmlProps} />
                {
                    <Icon
                        id="cancel"
                        className={`fs-5 mt-1 pointer ${(
                            clearable && value && value.length > 0)
                            ? "":'invisible'}`}
                        onClick={clear} />

                }
                <Icon id={`visibility${visible? "_off":""}`} className="mt-01 ms-1 pointer" onClick={()=>setVisible(!visible)} />
            </div>
        </div>
    )
}

Input.defaultProps = {
    clearable: false,
}

export default Input