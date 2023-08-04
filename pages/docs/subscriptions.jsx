import { Button, Card, Container, Grid, Text } from '@nextui-org/react'
import Page from '@Page'
import { Fragment } from 'react'

const CardPlan = ({ title, children, className, linkPlan }) => {
    return (
        <Fragment>
        <Grid xs={12} md={3}>
            <Card className={`planCard ${className}`}>
                <Card.Header>
                    <Grid.Container justify="center">
                        <Text h2 css={{ color: '#2B2D42' }}>
                            {title}
                        </Text>
                    </Grid.Container>
                </Card.Header>
                <Card.Body className='cardBodyPlan'>
                    {children}
                    <Button color={'gradient'} size='lg' onPress={() => {
                        window.open(linkPlan)
                    }}>
                        Contactar por plan {title}
                    </Button>
                </Card.Body>
            </Card>
        </Grid>
        </Fragment>
    )
}

const Subscriptions = () => {
    return (
        <Page>
            <Container xl className='suscriptionContainer'>
                <Grid.Container gap={2} justify="center">
                    <CardPlan title={'Nivel 1'} linkPlan={'https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380848924fbc5018926c05eee007e'}>
                        <ul>
                            <li>
                                <Text>Publicar productos</Text>
                            </li>
                            <li>
                                <Text>
                                    Asistencia personalizada, estadísticas avanzadas y promoción en redes sociales.
                                </Text>
                            </li>
                            <li>
                                <Text>Valor: $5499 ARS (debito automático mensual)</Text>
                            </li>
                        </ul>
                    </CardPlan>
                    <CardPlan title={'Nivel 2'} className='planRemarked' linkPlan={'https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c93808489c053560189c2cb971a0131'}>
                        <ul>
                            <li>
                                <Text>Publicar productos</Text>
                            </li>
                            <li>
                                <Text>Aparición en primeros 10 resultados de búsquedas</Text>
                            </li>
                            <li>
                                <Text>Insignia Nivel 2</Text>
                            </li>
                            <li>
                                <Text>
                                    Asistencia personalizada, estadísticas avanzadas, promoción en redes sociales y destacado en resultados de búsqueda.
                                </Text>
                            </li>
                            <li>
                                <Text>
                                    Valor: $17499 ARS (pago único por el periodo trimestral)
                                </Text>
                            </li>
                        </ul>
                    </CardPlan>
                    <CardPlan title={'Nivel 3'} linkPlan={'https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c93808489c053560189c2cf1b8e0134'}>
                        <ul>
                            <li>
                                <Text>Publicar productos</Text>
                            </li>
                            <li>
                                <Text>Aparición en primeros 10 resultados de búsquedas</Text>
                            </li>
                            <li>
                                <Text>Posicionamiento exclusivo</Text>
                            </li>
                            <li>
                                <Text>Insignia Nivel 3</Text>
                            </li>
                            <li>
                                <Text>
                                    Asistencia personalizada, estadísticas avanzadas, promoción en redes sociales, destacado en resultados de búsqueda y publicidad en sitios afiliados.
                                </Text>
                            </li>
                            <li>
                                <Text>
                                    Valor: $32499 ARS (pago único por el periodo semestral)
                                </Text>
                            </li>
                        </ul>
                    </CardPlan>
                    <CardPlan title={'Nivel 4'} linkPlan={'https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c93808489b645790189c2d03e560453'}>
                        <ul>
                            <li>
                                <Text>Publicar productos</Text>
                            </li>
                            <li>
                                <Text>Aparición en primeros 10 resultados de búsquedas</Text>
                            </li>
                            <li>
                                <Text>Posicionamiento exclusivo</Text>
                            </li>
                            <li>
                                <Text>Insignia Nivel 4</Text>
                            </li>
                            <li>
                                <Text>
                                    Asistencia personalizada, estadísticas avanzadas, promoción en redes sociales, destacado en resultados de búsqueda, publicidad en sitios afiliados y campaña de email marketing personalizada.
                                </Text>
                            </li>
                            <li>
                                <Text>
                                    Valor: $47299 ARS (pago único por el periodo anual + un mes de servicio gratis
                                </Text>
                            </li>
                        </ul>
                    </CardPlan>
                </Grid.Container>
            </Container>
        </Page>
    )
}


export default Subscriptions