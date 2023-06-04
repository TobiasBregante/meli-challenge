import { Button, Grid, Modal } from "@nextui-org/react"
import Image from "next/image"

const AdsModals = ({ img, link }) => {
    return (
        <Modal open={true} css={{ bg: 'transparent' }} className='adsModalImg'>
            <a href={link}>
                <Image src={img} width={1080} height={1080} />
                <Button color={'gradient'} auto>Más información</Button>
            </a>
        </Modal>
    )
}

export default AdsModals