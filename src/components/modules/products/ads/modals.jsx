import { Modal } from "@nextui-org/react"
import Image from "next/image"
import Link from "next/link"

const AdsModals = ({ img, link }) => {
    return (
        <Modal open={true} >
            <Link href={link} passHref>
                <Image src={img} width={1000} height={1000} />
            </Link>
        </Modal>
    )
}

export default AdsModals