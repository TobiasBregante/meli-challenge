import { useUserContext } from "@/src/utils/user/provider"
import { Grid, Card, Text, Badge } from "@nextui-org/react"
import { useRouter } from "next/router"
import { Fragment } from "react"

const BannerSuscriber = () => {
    const user = useUserContext()
    const router = useRouter()
    const ads = [
        {
            content: <Fragment>Suscripción Nivel 1 por <Badge className='badgePrice'>$5499 al mes</Badge></Fragment>
        },
        {
            content: <Fragment>Acceso exclusivo al Nivel 1 por <Badge className='badgePrice'>$5499/mensual</Badge></Fragment>
        },
        {
            content: <Fragment>Desbloquea el Nivel 1 <Badge className='badgePrice'>$5499 por mes</Badge></Fragment>
        },
        {
            content: <Fragment>Únete al Nivel 1 a tan solo <Badge className='badgePrice'>$5499/mes</Badge></Fragment>
        },
        {
            content: <Fragment>Descubre el Nivel 1 por <Badge className='badgePrice'>$5499 al mes</Badge></Fragment>
        },
        {
            content: <Fragment>El Nivel 1 te espera: <Badge className='badgePrice'>$5499 mensuales</Badge></Fragment>
        },
        {
            content: <Fragment>Opta por la suscripción Nivel 1: <Badge className='badgePrice'>$5499 por mes</Badge></Fragment>
        },
        {
            content: <Fragment>Explora el Nivel 1 desde <Badge className='badgePrice'>$5499/mensual</Badge></Fragment>
        },
        {
            content: <Fragment>Accede al Nivel 1 con <Badge className='badgePrice'>$5499 al mes</Badge></Fragment>
        },
        {
            content: <Fragment>Mejora con la suscripción Nivel 1: <Badge className='badgePrice'>$5499/mensual</Badge></Fragment>
        }
    ];
    
    const getRandomNumber = max => Math.floor(Math.random() * max);

    const randomAds = ads[getRandomNumber(ads?.length - 1)]

    if (user?.status?.isPremiun) {
        return null
    }

    const goToPlans = () => router?.push(`/./${router?.locale}/docs/subscriptions`)

    return (
        <Grid.Container>
          <Grid xs={12} sm={12} md={12} lg={12} xl={12} onClick={goToPlans}>
            <Card isHoverable className={`banner-suscriber-ads adsBg${getRandomNumber(8)}`}>
                <Card.Body>
                    <div className='circle-2'/>
                    <div className='circle'/>
                    <Text h2>
                        {randomAds?.content}
                    </Text>
                </Card.Body>
            </Card>
          </Grid>
        </Grid.Container>
    )
}

export default BannerSuscriber