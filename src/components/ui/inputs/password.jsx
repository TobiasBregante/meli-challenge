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

    const [state, setState] = useState(value || ""),
        [visible, setVisible] = useState(false)


    const onChangeHandler = (e) => {
        if (htmlProps.onChange) {
            return htmlProps.onChange(e.target.value)
        }
        setState(e.target.value)
    }

    const clear = () => {
        if (htmlProps.onChange) {
            return htmlProps.onChange("")
        }
        return setState("")
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
                `rounded-12 d-flex px-2 py-1 bg-gray-500`
            }>
                <Icon id="lock" />
                <input
                    type={visible?"text":"password"}
                    className="w-100 border-0 bg-transparent"
                    value={state}
                    onChange={onChangeHandler}
                    placeholder={placeholder}
                    {...htmlProps} />
                {
                    <Icon
                        id="cancel"
                        className={`fs-5 mt-1 pointer  ${clearable && state.length == 0 && 'invisible'}`}
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