import Card from '@/ui/cards'
import Image from 'next/image'
import Text from '@/ui/texts'
import Icon from '@/ui/icons'
import Button from '@/ui/buttons'
import { useState } from 'react'
import Share from '@/components/modules/common/share'
import Link from 'next/link'

const BrandProfileMinimal = ({ data }) => {
    const [isShareOpen, setShareState] = useState(false)
    return (
        <Card rounded={16} className="d-flex flex-column p-3">
            <Share isVisible={isShareOpen} close={setShareState} />
            <div className="d-flex flex-row justify-content-center">
                <Image
                    className="rounded-circle pointer"
                    src={`/img/avatars/3.jpg`}
                    width={100}
                    height={100}
                    alt="als"
                />
            </div>
            <Text tag="h4" className="text-center">
                Importaciones ambar
            </Text>
            <div className="d-flex justify-content-between">
                <Text weight="800" className="d-flex flex-row">
                    <Icon id="payments" className="me-1" />
                    Metodo de pago:
                </Text>
                <Text >
                    Efectivo
                </Text>
            </div>
            <div className="d-flex justify-content-between mb-3">
                <Text weight="800" className="d-flex flex-row">
                    <Icon id="local_shipping" className="me-1" />
                    Medio de envio:
                </Text>
                <Text >
                    flete
                </Text>
            </div>
            <Link href="/./brand/mk">
                <Button color="primary-500" className="d-flex flex-row justify-content-center text-white">
                    Ver catalogo completo
                    <Icon id="open_in_new" />
                </Button>
            </Link>
            <Button color="info-500" className="d-flex flex-row justify-content-center text-white mt-2" onClick={() => setShareState(true)}>
                Compartir catalogo
                <Icon id="share" />
            </Button>
        </Card>
    )
}

export default BrandProfileMinimal