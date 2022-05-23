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
        <label className={`checkBoxParent fs-${size} ${className}`}>
            <input type="checkbox" className="checkbox" checked={checked}  {...htmlProps} />
            {
                label
            }
        </label>
    )
}


export default Checkbox