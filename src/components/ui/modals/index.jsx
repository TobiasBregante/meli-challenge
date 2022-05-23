const Modal = ({children})=>{
    return (
        <div className="position-absolute animate__animated animated_bounceIn z-index-infinite d-flex justify-content-center container">
            {children ?? null}
        </div>
    )
}

export default Modal