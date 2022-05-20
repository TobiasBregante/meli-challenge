const Text = ({weight, color, size, rounded, className, children,tag, ...htmlProps}) =>{

    const CustomTag = tag || "span"

    return (
        <CustomTag className={`fw-${weight} text-${color} fs-${size} ${className}`} {...htmlProps}>
            {children}
        </CustomTag>
    )
}

Text.defaultProps = {
    weight: 400
}
export default Text