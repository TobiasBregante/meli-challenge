import { Card, Text, Grid } from "@nextui-org/react";
import { useRouter } from "next/router";
import { Fragment } from "react";

const Footer = () => {
    const categories = [
        { name: 'Hogar', url: '/category/Artículos para el Hogar' },
        { name: 'Productos Populares', url: "/category/popular" },
        { name: 'Celulares', url: "/category/Accesorios para Celulares" },
    ]
    const router = useRouter()
    const thisYear = (new Date())?.getFullYear()

    return (
        <Fragment>
            <Card variant="flat" css={{ borderRadius: 0 }} className='footer'>
                <Grid.Container>
                    <Grid xs={12} sm={4} md={4} lg={4} xl={4}>
                        <Grid>
                            <Text className="brandingTextFooter">
                                Iwarket
                            </Text>
                            <Text className="titleTextFooter">
                                Contactenos
                            </Text>
                            <Text className="textFooter">
                                {/* eslint-disable-line */}
                                <img src="/whats-app-outlined.svg" alt="contact us" className="svg" />
                                Whats App
                                <span className="numberPhone">
                                    +54 9 11-2476-7008
                                </span>
                            </Text>
                            <Text className="textFooter">
                                {/* eslint-disable-line */}
                                <img src="/call.svg" alt="call us" className="svg" />
                                Llamanos
                                <span className="numberPhone">
                                    +54 9 11-2476-7008
                                </span>
                            </Text>
                        </Grid>
                    </Grid>
                    <Grid xs={12} sm={4} md={4} lg={4} xl={4}>
                        <Grid>
                            <div className="titleTextFooter">
                                <p>Categorías Más Populares</p>
                                <hr />
                                <ul>
                                    {categories?.length > 0 && categories?.map((obj, o) => (
                                        <li key={o}>
                                            <a href={`/./${router?.locale}${obj?.url}`}>{obj?.name}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid xs={12}>
                        <p className="copyRight">
                            &copy; {thisYear} Todos los derechos reservados. Iwarket.com
                        </p>
                    </Grid>
                </Grid.Container>
            </Card>
        </Fragment>
    )
};

export default Footer;