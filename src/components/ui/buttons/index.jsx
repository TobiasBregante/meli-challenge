const Button = ({
    color, className, rounded,
    children,
    ...htmlProps }) => {

    return (
        <button className={`btn bg-${color} d-flex ${className} rounded-${rounded ? "circle":"12"}`} 
        {...htmlProps}>
            {children}
        </button>
    )
}


export default Button
