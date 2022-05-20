const Card = ({children,rounded, className, htmlProps})=>{
    return (
        <div className={`card rounded-${rounded} ${className}`} {...htmlProps}>
            {
                children ?? null
            }
        </div>
    )
}

Card.defaultProps = {
    rounded: 16
}

export default Card