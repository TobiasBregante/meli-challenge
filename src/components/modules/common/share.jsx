import Icon from "@/src/components/ui/icons";
import { Button, Card, Grid, Modal, Text } from "@nextui-org/react";
import { useState } from "react";

const Share = ({ link }) => {
    const [state, setState] = useState(false);
    
    const openLink = (link, type) => {
        const builder = ()=>{
            if (type == "facebook") {
                return "https://www.facebook.com/sharer/sharer.php?u="
            }
            if (type == "whatsapp") {
                return "https://api.whatsapp.com/send?text="
            }
        }
        return window.open(`${builder()}${window.location.host}${link}`)
    }

    const copyLink = ()=>{
        window.navigator.clipboard.writeText(`${window.location.host}${link}`)
    }

    return (
        <>
            <Button 
                icon={
                    <Icon id="share" color='secondary' />
                } 
                color='' 
                auto 
                onClick={() => setState(true)}>
                Compartir
            </Button>
            <Modal open={state} closeButton onClose={() => setState(false)}>
                <div className="d-flex flex-column">
                    <div className="d-flex flex-row justify-content-between">
                        <Text h4 weight="bold">
                            Compartir en
                        </Text>
                    </div>
                    <Modal.Body>
                        <Grid.Container justify="center">
                            <Button 
                            auto 
                            css={{ bg: "$whatsapp", color: "$white", mr: 5, mb: 5 }}
                            onPress={() => openLink(link,"whatsapp")}
                            >
                                <Icon id="/whatsappicon" />
                                Whatsapp
                            </Button>
                            <Button auto 
                            css={{ bg: "$blue500", color: "$white", mr: 5, mb: 5 }}
                            onPress={() => openLink(link,"facebook")} >
                                <Icon id="facebook" color="$white" />
                                Facebook
                            </Button>
                            <Button auto css={{ bg: "gray-100", color: "$white", mr: 5, mb: 5 }} 
                            onPress={copyLink}>
                                <Icon id="link" color="$white" />
                                Copiar link
                            </Button>
                        </Grid.Container>
                    </Modal.Body>
                </div>
            </Modal>
        </>
    )
}

export default Share