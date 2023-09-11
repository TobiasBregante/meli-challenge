import { Card, Collapse, Container, Grid, Text } from '@nextui-org/react'
import Page from '@Page'

const Faq = () => {
    return (
        <Page>

            <Container xl>
                <Grid.Container justify="center" gap={2}>
                    <Grid xs={12} sm={8}>
                        <Card>
                            <Card.Header>
                                <Grid.Container justify="center">
                                    <Text h2>
                                        Preguntas frecuentes
                                    </Text>
                                </Grid.Container>
                            </Card.Header>
                            <Card.Body>
                                <Grid.Container direction="column">
                                    <Text h2>PREGUNTAS FRECUENTES COMPRADORES</Text>
                                    <Collapse title="¿Necesito descargar alguna aplicación para acceder a Iwarket?">
                                        <Text>
                                            No es necesario descargar ninguna app, solo abres tu navegador y buscas la pagina
                                        </Text>
                                    </Collapse>

                                    <Collapse title="Me tengo que registrar para comprar en Iwarket?">
                                        <Text>Si debes registrarte con un email o Facebook</Text>
                                    </Collapse>

                                    <Collapse title="Como puedo ver los productos?">
                                        <Text>Entras en la página y buscar por categoría, marca, producto, galpón, galerías, etc.</Text>
                                    </Collapse>

                                    <Collapse title="Donde puedo ver los precios de los productos?">
                                        <Text>Entras a la página y veras los productos con sus precios a la vista</Text>
                                    </Collapse>

                                    <Collapse title="Como puedo contactarme con el fabricante?">
                                        <Text>Cuando eliges tu producto encontraras botones con las opciones de compra, haz click en alguno de ellos y te direccionara al Whats App del fabricante</Text>
                                    </Collapse>

                                    <Collapse title="Iwarket hace envíos?">
                                        <Text>No, el envió lo pactas con el fabricante</Text>
                                    </Collapse>

                                    <Collapse title="Con que empresas de transporte trabajan?">
                                        <Text>Eso lo informa el fabricante que es quien se encarga del envió</Text>
                                    </Collapse>

                                    <Collapse title="Iwarket me cobra Comisión">
                                        <Text>No se abona Comisión</Text>
                                    </Collapse>

                                    <Collapse title="Iwarket realiza cobros">
                                        <Text>No, el pago lo pactas directo con el vendedor</Text>
                                    </Collapse>

                                    <Collapse title="Que garantía de compra tengo?">
                                        <Text>Todos los vendedores son verificados al momento de subir sus productos a la App, se verifica su negocio sus daros personales y su historial de ventas.</Text>
                                    </Collapse>

                                    <Collapse title="Donde puedo ver la calificación y opiniones sobre los vendedores">
                                        <Text>Puedes visualizar debajo de cada producto las calificaciones del fabricante hechas por los usuarios</Text>
                                    </Collapse>


                                    <Collapse title="Hice Click para contactarme con el puestero y me sale loguearse, ¿qué significa?">
                                        <Text>Para ponerse en contacto con un puestero o fabricante debes estar registrado con tu mail y generar una contraseña de usuario, estos datos te los solicitara al ingresas a la App por primera vez</Text>
                                    </Collapse>


                                    <Collapse title=" La compra mínima cuánto es?">
                                        <Text>Cada puestero determina su venta mínima puedes visualizarlo en los botones de contacto</Text>
                                    </Collapse>

                                    <Collapse title=" No me acepta mi email me sale email inválido?">
                                        <Text>Verifica tu email o contacta con servicio al cliente</Text>
                                    </Collapse>



                                    <Text h2 css={{mt:40}}>PREGUNTAS FRECUENTES VENDEDORES</Text>



                                    <Collapse title=" Como publico mis artículos?">
                                        <Text>Una vez hayas realizado tu registro, va a el menú de la página y haz click en reclamar puesto
                                            Colocas todos los datos de tu puesto
                                            Una vez aceptado tu puesto, podrás subir tus artículos y fotos. Vas al menú de la app seleccionas mis puestos, haces click sobre la imagen de tu puesto y agregas producto con el signo +, foto, nombre, cantidades, etc.</Text>
                                    </Collapse>

                                    <Collapse title=" Estoy interesado/a en la suscripción premium, como puedo contratar este servicio?">
                                        <Text>Para solicitar la suscripción premium debes comunicarte al servicio al cliente en el menú de la pagina</Text>
                                    </Collapse>

                                    <Collapse title=" Cuanto es el costo para publicar?">
                                        <Text>Tenemos una gran noticia para vos, los 30 días iniciales son gratuitos, podes reclamar 1 puesto
                                            y subir hasta 5 artículos.
                                            Para permanecer más tiempo en la página o subir mayor cantidad de artículos solicita tu suscripción premium en servicio al cliente</Text>
                                    </Collapse>


                                    <Collapse title=" Como veo mis artículos publicados en la App?">
                                        <Text>Debes registrarte como comprador con otro email o Facebook diferente al de tu rol de vendedor entras la App y buscas tu marca o puesto en la lupa de la cabecera de la pagina</Text>
                                    </Collapse>
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