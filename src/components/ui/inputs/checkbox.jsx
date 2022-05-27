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

    return (
        <label className={`checkBoxParent pointer fs-${size} ${className}`}>
            <input type="checkbox" className="checkbox pointer" checked={checked}  {...htmlProps} />
            {
                label
            }
        </label>
    )
}


export default Checkbox