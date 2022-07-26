import Icon from "@/src/components/ui/icons";
import { Button, Card, Grid, Modal, Text } from "@nextui-org/react";
import { useState } from "react";

const Share = ({  }) => {
    const [state,setState] = useState(false);


    return (
        <>
        <Button auto onClick={()=>setState(true)}>
            Compartir
            <Icon id="share" color="white"/>
        </Button>
            <Modal open={state} closeButton onClose={()=>setState(false)}>
                <div className="d-flex flex-column">
                    <div className="d-flex flex-row justify-content-between">
                        <Text h4 weight="bold">
                            Compartir en
                        </Text>
                    </div>
                    <Modal.Body>
                        <Grid.Container  justify="center">
                            <Button auto css={{bg:"success-700",color:"$white",mr:5,mb:5}} className="me-1 mb-1 text-white">
                                <Icon id="whatsapp" color="$white"/>
                                Whatsapp
                            </Button>
                            <Button auto css={{bg:"info-700",color:"$white",mr:5,mb:5}} className="me-1 mb-1 text-white">
                                <Icon id="facebook" color="$white"/>
                                Facebook
                            </Button>
                            <Button auto css={{bg:"gradient-instagram",color:"$white",mr:5,mb:5}} className="me-1 text-white">
                                <Icon id="/./icons/white/instagram.svg" alt="instagram" />
                                Instagram
                            </Button>
                            <Button auto css={{bg:"gray-100",color:"$white",mr:5,mb:5}} className="me-1 text-dark">
                                <Icon id="link"  color="$white" />
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