const Select = ({ label, className, children, ...htmlProps }) => {
    return (
        <>
            {
                label &&
                <label className="ms-1 fw-400" >
                    {label}
                </label>
            }
            <select className={`border-0 outline-none rounded-8 py-1 ${className}`} {...htmlProps}>
                {children}
            </select>
        </>
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