const Select = ({ label, className, children, ...htmlProps }) => {
    return (
        <div className={`d-flex flex-column ${className}`}>
            {
                label &&
                <label className="ms-1 fw-400" >
                    {label}
                </label>
            }
            <select className={`border-0 outline-none rounded-8 py-1 px-2 `} {...htmlProps}>
                {children}
            </select>
        </div>
    )
}

const Option = ({ children, ...htmlProps }) => {
    return (
        <option {...htmlProps}>
            {children}
        </option>
    )
}

Select.Option = Option

export default Select