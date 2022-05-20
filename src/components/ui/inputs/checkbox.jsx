import Icon from '@/ui/icons'
import { useState } from 'react'

const Checkbox = ({
    checked,
    label,
    color,
    size,
    className,
    ...htmlProps
}) => {

    const [state, setState] = useState(checked ?? false)


    const onChangeHandler = (e) => {
        if (htmlProps.onChange) {
            htmlProps.onChange(e.target.checked)
        }
        setState(e.target.checked)
    }

    return (
        <label className={`checkBoxParent fs-${size} ${className}`}>
            <input type="checkbox" className="checkbox" checked={state}  onChange={onChangeHandler} />
            {
                label
            }
        </label>
    )
}


export default Checkbox