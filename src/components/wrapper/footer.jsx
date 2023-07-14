import { Card, Text, Grid } from "@nextui-org/react";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";

const Footer = () => {
    const categories = [
        { name: 'Productos Populares', url: "/category/popular" },
        { name: 'Calzado', url: "/category/Calzado" },
        { name: 'Indumentaria', url: "/category/Ropa Informal" },
        { name: 'Electrónica', url: "/category/Electrónica" },
        { name: 'Joyas y Accesorios', url: "/category/Joyas y Accesorios" },
        { name: 'Mascotas', url: "/category/Accesorios para Mascotas" },
        { name: 'Celulares', url: "/category/Accesorios para Celulares" },
        { name: 'Autos', url: "/category/Accesorios para Autos" },
    ]
    const router = useRouter()

    return (
        <Fragment>
            <Card variant="flat" css={{ borderRadius: 0, bg: "$primary" }} className='footer'>
                <Grid.Container>
                        <Grid xs={12} sm={4} md={4} lg={4} xl={4}>
                            <Grid>
                                <Text className="brandingTextFooter">
                                    SaladaApp
                                </Text>
                                <Text className="titleTextFooter">
                                    Contactenos
                                </Text>
                                <Text className="textFooter">
                                    {/* eslint-disable-line */}
                                    <img src="/whats-app-outlined.svg" alt="contact us" className="svg"/> 
                                    Whats App
                                    <span className="numberPhone">
                                        +54 9 11-2476-7008
                                    </span>
                                </Text>
                                <Text className="textFooter">
                                    {/* eslint-disable-line */}
                                    <img src="/call.svg" alt="call us" className="svg"/> 
                                    Llamanos
                                    <span className="numberPhone">
                                        +54 9 11-2476-7008
                                    </span>
                                </Text>
                                <Text className="downloadAppText"> 
                                    Descargá La App
                                </Text>
                                <a 
                                    href="https://apps.apple.com/ar/app/salada-app/id1526227412" 
                                    target={'_blank'} 
                                    className="downloadAppBtn">
                                    {/* eslint-disable-line */}
                                    <img src="/ios.png" alt="Descargá La App!" />
                                </a>
                            </Grid>
                        </Grid>
                        <Grid xs={12} sm={4} md={4} lg={4} xl={4}>
                            <Grid>
                                <Text className="titleTextFooter">
                                    Categorías Más Populares
                                    <hr />
                                    <ul>
                                        {categories?.length > 0 && categories?.map((obj, o) => (
                                            <li key={o}>
                                                <a href={`/./${router?.locale}${obj?.url}`}>{obj?.name}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </Text>
                            </Grid>
                        </Grid>
                        <Grid xs={12} sm={4} md={4} lg={4} xl={4}>
                            <Text className="titleTextFooter">
                                Servicio Al Cliente
                                <hr />
                                <ul>
                                    <li key={'suscripcion'}>
                                        <a href={`/./${router?.locale}/docs/subscriptions`}>
                                            Suscripción
                                        </a>
                                    </li>
                                    <li key={'faqs'}>
                                        <a href={`/./${router?.locale}/docs/faq`}>
                                            Preguntas frecuentes
                                        </a>
                                    </li>
                                </ul>
                            </Text>
                        </Grid>
                        <Grid xs={12}>
                            <p className="copyRight">
                                &copy; {(new Date())?.getFullYear()} Todos los derechos reservados. SaladaApp.com
                            </p>
                        </Grid>
                </Grid.Container>
            </Card>
        </Fragment>
    )
};

export default Footer;