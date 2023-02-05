import { Modal } from "@nextui-org/react"
import Image from "next/image"

const AdsModals = ({ img, link }) => {
    return (
        <Modal open={true} >
            <a href={link}>
                <Image src={img} alt='ads' layout='responsive' width={1000} height={1000} objectFit='contain'/>
            </a>
        </Modal>
    )
}

export default AdsModals