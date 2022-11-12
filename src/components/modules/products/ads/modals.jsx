import { Modal } from "@nextui-org/react"
import Image from "next/image"

const AdsModals = ({ img, link }) => {
    return (
        <Modal open={true} >
            <a href={link}>
                <Image src={img} width={1000} height={1000} />
            </a>
        </Modal>
    )
}

export default AdsModals