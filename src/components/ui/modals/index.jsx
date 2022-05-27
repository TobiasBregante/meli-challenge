const Modal = ({children})=>{
    return (
        <div className="position-fixed animate__animated animated_bounceIn z-index-infinite d-flex justify-content-center w-inherit h-100 bg-blur">
            {children ?? null}
        </div>
    )
}

export default Modal