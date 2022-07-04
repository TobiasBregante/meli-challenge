import Button from "@/src/components/ui/buttons";
import Icon from "@/src/components/ui/icons";
import Modal from '@/ui/modals'
import Card from "@/src/components/ui/cards";
import Text from "@/src/components/ui/texts";

const Share = ({ isVisible, close }) => {
    return (
        <Modal isVisible={isVisible} outSideHide={true} close={close}>
            <Card className="p-3">
                <div className="d-flex flex-column">
                    <div className="d-flex flex-row justify-content-between">
                        <Text tag="h4" weight={700}>
                            Compartir en
                        </Text>
                        <Icon id="close" onClick={()=>{close(false)}} className="pointer"/>
                    </div>
                    <div className="d-flex flex-row flex-wrap">
                        <Button color="success-700" className="me-1 mb-1 text-white">
                            <Icon id="whatsapp" />
                            Whatsapp
                        </Button>
                        <Button color="info-700" className="me-1 mb-1 text-white">
                            <Icon id="facebook" />
                            Facebook
                        </Button>
                        <Button color="gradient-instagram" className="me-1 text-white">
                            <Icon id="/./icons/white/instagram.svg" alt="instagram"/>
                            Instagram
                        </Button>
                        <Button color="gray-100" className="me-1 text-dark">
                            <Icon id="link" alt="instagram"/>
                            Copiar link
                        </Button>
                    </div>
                </div>
            </Card>

        </Modal>
    )
}

export default Share