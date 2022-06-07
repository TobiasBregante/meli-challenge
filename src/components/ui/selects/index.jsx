const Select = ({children, ...htmlProps})=>{
    <select {...htmlProps}>
        {children}
    </select>
}

export default Select