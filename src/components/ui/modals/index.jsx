import { useState, useRef, useEffect } from "react"

function useOutsideAlerter(ref, outSideHide, close, isVisible) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target) && outSideHide == true) {
                close(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        if (isVisible) {
            document.querySelector("body").classList.add("overflow-hidden")
        }else{
            document.querySelector("body").classList.remove("overflow-hidden")
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, outSideHide, close,isVisible]);
}


const Modal = ({ children, isVisible,close, outSideHide }) => {

    const wrapperRef = useRef(null);

    useOutsideAlerter(wrapperRef, outSideHide, close, isVisible);

    return (
        <div className={`col-12 col-md-12 animate__animated animate__ultrafast 
        ${isVisible ? "transition-bg-filter-025 position-fixed top-50 start-50 translate-middle z-index-2 col-lg-12 d-flex flex-row justify-content-center h-100 bg-black-traslucent-50 " : "d-none"}`}>
            <div ref={wrapperRef} className="d-flex flex-column justify-content-center">
                {children ?? null}
            </div>

        </div>
    )
}

export default Modal