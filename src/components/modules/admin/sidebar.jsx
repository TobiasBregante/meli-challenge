import { Card, Grid, Text } from "@nextui-org/react"
import Link from "next/link"
import Icon from "../../ui/icons"

const SideBar = ({selected}) => {

    const Item = ({name, icon, text, href}) => (
        <Grid.Container css={{ cursor: 'pointer', px: 10, bg: selected==name? "$gray300":"$white",  }}>
            <Icon id={icon} css={{ mt: 5, mr: 10 }} />
            <Link href={href} passHref>
                <Text h3>{text}</Text>
            </Link>
        </Grid.Container>
    )

    return (
        <Card variant="flat" css={{ bg:"$white"}}>
            <Grid.Container direction="column" css={{ py: 10 }} >
                <Item name="inicio" icon="home" text="Inicio" href="/./admin"/>
                <Item name="searchByPhone" icon="search" text="Buscar por telefono" href="/./admin/search/byPhone"/>
                <Item name="searchByEmail" icon="search" text="Buscar por email" href="/./admin/search/byEmail"/>
                <Item name="brand" icon="search" text="Marcas" href="/./admin/search/brands"/>
                <Item name="products" icon="search" text="Productos" href="/./admin/search/products"/>
                <Item name="PopUp" icon="search" text="PopUp" href="/./admin/website/popup"/>
                <Item name="highlight" icon="search" text="Banner" href="/./admin/website/highlight"/>
            </Grid.Container>
        </Card>
    )
}

export default SideBar