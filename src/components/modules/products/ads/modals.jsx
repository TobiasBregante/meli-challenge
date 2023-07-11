import Link from "@/src/utils/hooks/link"
import { Button, Grid, Modal } from "@nextui-org/react"
import Image from "next/legacy/image"

const AdsModals = ({ img, link }) => {
    return (
        <Modal open={true} css={{ bg: 'transparent' }} className='adsModalImg'>
            <Link href={link}>
                <Image src={img} width={1080} height={1080} />
                <Button color={'gradient'} auto>Más información</Button>
            </Link>
        </Modal>
    )
}

export default AdsModals