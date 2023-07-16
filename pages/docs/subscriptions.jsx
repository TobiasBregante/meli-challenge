import { Button, Card, Container, Grid, Text } from '@nextui-org/react'
import Page from '@Page'
import { Fragment } from 'react'

const CardPlan = ({ title, children, className }) => {
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
                        window.open(`https://api.whatsapp.com/send?text=Hola quiero contratar el plan ${title}&phone=5491124767008`)
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
                    <CardPlan title={'Esencial'}>
                        <ul>
                            <li>
                                <Text>Publicar hasta 5 Productos</Text>
                            </li>
                            <li>
                                <Text>Hasta 5 imágenes por Producto</Text>
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
                    <CardPlan title={'Premium'}  className='planRemarked'>
                        <ul>
                            <li>
                                <Text>Publicar hasta 10 Productos</Text>
                            </li>
                            <li>
                                <Text>Hasta 10 imágenes por Producto</Text>
                            </li>
                            <li>
                                <Text>Aparición en primeros 10 resultados de búsquedas</Text>
                            </li>
                            <li>
                                <Text>Insignia Silver</Text>
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
                    <CardPlan title={'Deluxe'}>
                        <ul>
                            <li>
                                <Text>Publicar más de 10 Productos</Text>
                            </li>
                            <li>
                                <Text>Hasta 10 imágenes por Producto</Text>
                            </li>
                            <li>
                                <Text>Aparición en primeros 10 resultados de búsquedas</Text>
                            </li>
                            <li>
                                <Text>Posicionamiento exclusivo</Text>
                            </li>
                            <li>
                                <Text>Insignia Gold</Text>
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
                    <CardPlan title={'Platinum'}>
                        <ul>
                            <li>
                                <Text>Publicar más de 10 Productos</Text>
                            </li>
                            <li>
                                <Text>Hasta 10 imágenes por Producto</Text>
                            </li>
                            <li>
                                <Text>Aparición en primeros 10 resultados de búsquedas</Text>
                            </li>
                            <li>
                                <Text>Posicionamiento exclusivo</Text>
                            </li>
                            <li>
                                <Text>Insignia Gold</Text>
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