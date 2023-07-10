import { Card, Container, Text, Grid } from "@nextui-org/react";
import { Fragment } from "react";

const Footer = () => {
    return (
        <Fragment>
            <Card variant="flat" css={{ borderRadius: 0, bg: "$primary" }} className='footer'>
                <Container lg>
                    <Grid>
                        <Text className="brandingTextFooter">
                            SaladaApp
                        </Text>
                        <Text className="titleTextFooter">
                            Contactenos
                        </Text>
                        <Text className="textFooter">
                            <img src="/whats-app-outlined.svg" alt="contact us" className="svg"/> 
                            Whats App
                            <span className="numberPhone">
                                +54 9 11-2476-7008
                            </span>
                        </Text>
                        <Text className="textFooter">
                            <img src="/call.svg" alt="call us" className="svg"/> 
                            Llamanos
                            <span className="numberPhone">
                                +54 9 11-2476-7008
                            </span>
                        </Text>
                    </Grid>
                    <Grid>
                        <Text className="titleTextFooter">
                            Contactenos
                        </Text>
                    </Grid>
                </Container>
            </Card>
        </Fragment>
    )
};

export default Footer;