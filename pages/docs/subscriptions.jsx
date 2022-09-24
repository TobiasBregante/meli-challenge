import { Card, Container, Grid, Text } from '@nextui-org/react'
import Page from '@Page'

const Subscriptions = () => {
    return (
        <Page>
            <Container lg >
                <Grid.Container gap={2}>
                    <Grid xs={12} lg={4}>
                        <Card>
                            <Card.Header>
                                <Grid.Container justify="center">
                                    <Text h2>
                                        Plan basico
                                    </Text>
                                </Grid.Container>
                            </Card.Header>
                            <Card.Body>
                                <Text h4>
                                    Venta por Docena:
                                </Text>
                                <Text> - Nombre del producto</Text>
                                <Text> - Categoría del producto</Text>
                                <Text> - Apartir de cuantas  docenas vendes para hacer envios</Text>
                                <Text> - Cantidad total o Stock del producto disponible.</Text>
                                <Text> - Descripción del producto</Text>
                                <Text> - Precio total por docena:</Text>

                                <Text h4>
                                    Venta por Cantidad:
                                    CURVA O DOCENA
                                </Text>
                                <Text> - Nombre del producto</Text>
                                <Text> - Categoría del producto</Text>
                                <Text> - Cantidad total o Stock del producto disponible.</Text>
                                <Text> - Descripción del producto</Text>
                                <Text> - Precio por mayor por docena O CURVA:</Text>
                                <Text> - Apartir de cuantas  docenas O CURVA vendes por cantidad para hacer envios </Text>
                                <Text> - Precio total por cantidad de docena O CURVA: </Text>

                                <Text h4>
                                    Venta por Curva:
                                </Text>
                                <Text> - Nombre del producto</Text>
                                <Text> - Categoría del producto</Text>
                                <Text> - Cantidad total o Stock del producto disponible.</Text>
                                <Text> - Descripción del producto</Text>
                                <Text> - Apartir de cuantas  Curvas vendes para hacer envíos</Text>
                                <Text> - precio total por mayor por curva</Text>

                                <Text h4>
                                    Venta por Tarea:
                                </Text>
                                <Text> - Nombre del producto</Text>
                                <Text> - Categoría del producto</Text>
                                <Text> - Cantidad total o Stock del producto disponible.</Text>
                                <Text> - Descripción del producto</Text>
                                <Text> - Apartir de cuantas  tareas vendes para hacer envios</Text>
                            </Card.Body>
                        </Card>
                    </Grid>
                </Grid.Container>
            </Container>
        </Page>
    )
}


export default Subscriptions