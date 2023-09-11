import { Button, Card, Collapse, Container, Grid, Text } from '@nextui-org/react'
import Page from '@Page'
import { useRouter } from 'next/router'

const Faq = () => {
    const router = useRouter()

    return (
        <Page>
            <Container xl>
                <Grid.Container justify="center" gap={2}>
                    <Grid xs={12} sm={8}>
                        <Card>
                            <Card.Header>
                                <Grid.Container justify="center">
                                    <Text h2 css={{ fontSize: 25, color: '$primary' }}>
                                        Iwarket Puntos
                                    </Text>
                                </Grid.Container>
                            </Card.Header>
                            <Card.Body>
                                <Grid.Container direction="column" css={{ minHeight: '100vh' }}>
                                    <Text h2 css={{ fontSize: 25 }}>Preguntas Frecuentes</Text>
                                    <Collapse title="¿Cómo subo de nivel en Iwarket?">
                                        <Text>
                                            Tenés metas que cumplir en Iwarket, y esas metas principalmente son de cantidad de productos publicados.
                                        </Text>
                                    </Collapse>
                                    <Collapse title="¿Qué cantidad de productos debo publicar por cada nivel?">
                                        <Text>
                                            Nivel 1: De 1 a 50 productos publicados.
                                        </Text>
                                        <Text>
                                            Nivel 2: De 51 a 100 productos publicados.
                                        </Text>
                                        <Text>
                                            Nivel 3: De 101 a 200 productos publicados.
                                        </Text>
                                        <Text>
                                            Nivel 4: De 201 a 500 productos publicados.
                                        </Text>
                                        <Text>
                                            Nivel 5: Más de 500 productos publicados.
                                        </Text>
                                    </Collapse>
                                    <Collapse title="¿Qué beneficios me da subir de nivel?">
                                        <Text>
                                            Cada nivel te brinda ventajas adicionales y mayores oportunidades de visibilidad y ventas en la plataforma de Iwarket. A medida que publiques más productos, podrás avanzar en los niveles y aprovechar al máximo nuestro servicio.
                                            Recuerda que cuanto mayor sea la cantidad de productos publicados, mayor será tu exposición y las posibilidades de captar la atención de los compradores interesados en tus productos.
                                        </Text>
                                        <Text css={{ mt: 10 }}>
                                            ¡Sigue agregando productos a tu catálogo y alcanza niveles superiores en Iwarket!
                                        </Text>
                                    </Collapse>
                                    <Grid css={{ m: 'auto', mt: 50 }}>
                                        <Button color={'primary'} size={'sm'} auto onClick={() => router?.push(`/./${router?.locale}`)}>
                                            Volver al menú principal
                                        </Button>
                                    </Grid>
                                </Grid.Container>
                            </Card.Body>
                        </Card>
                    </Grid>
                </Grid.Container>
            </Container>
        </Page>
    )
}

export default Faq