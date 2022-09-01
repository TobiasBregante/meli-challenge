import { Button, Dropdown, Grid, Input, Text } from "@nextui-org/react"
import { useMemo, useState } from "react"
import Icon from "@/ui/icons"
import { useRouter } from "next/router"
import Sheds from '@/utils/user/brand/sheds'

const SearchFilters = ({ categories, params }) => {
    const [state, setState] = useState({
        orderBy: new Set(["Más popular"]),
        isWholeSale: null,
        category: null,
        isStore: true,
        zone: new Set([params.zone || "Todas las ubicaciones"]),
        shed: new Set(["Todos los galpones"]),
    })
    const router = useRouter()

    const handleSelect = name => e => {
        setState({
            ...state,
            [name]: e
        })
        if (Array.from(e)[0] == "Todas las ubicaciones" || Array.from(e)[0] == "Todos los galpones") {
            return handleFilter(name,"all")()
        }
        handleFilter(name,Array.from(e)[0])()
    }

    const orderBy = useMemo(
        () => Array.from(state.orderBy),
        [state.orderBy]
    );

    const zone = useMemo(
        () => Array.from(state.zone),
        [state.zone]
    );

    const shed = useMemo(
        () => Array.from(state.shed),
        [state.shed]
    );

    const handleState = name => e => {
        setState({
            ...state,
            [name]: e.target.value
        })
    }

    const handleFilter = (key, value) => () => {
        let queryBuilder = router.query

        queryBuilder = {
            ...queryBuilder,
            [key]: value
        }

        router.push(`/./search/?${new URLSearchParams(queryBuilder).toString()}`)
    }

    return (
        <Grid.Container direction="column" >
            <Grid css={{d:"none"}}>
                <Text h4>
                    Ordenar por
                </Text>
                <Dropdown>
                    <Dropdown.Button color="secondary" css={{ color: "$black" }}>
                        {
                            orderBy
                        }
                    </Dropdown.Button>
                    <Dropdown.Menu
                        selectionMode="single"
                        selectedKeys={orderBy}
                        onSelectionChange={handleSelect("orderBy")}>
                        <Dropdown.Item key="Más popular" icon={<Icon id="insights" />}>Más popular</Dropdown.Item>
                        <Dropdown.Item key="Precio más bajo" icon={<Icon id="arrow_upward" />}>Precio más bajo</Dropdown.Item>
                        <Dropdown.Item key="Precio más alto" icon={<Icon id="arrow_downward" />}>Precio más alto</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Grid>
            <Grid >
                <Text h4>
                    Solo venta
                </Text>
            </Grid>
            <Grid>
                <Grid.Container justify="space-between">
                    <Grid>
                        <Button auto

                            icon={<Icon id="shopping_cart" />}
                            ghost={params.isWholesaleAndRetail == "true" || params.isWholesaleAndRetail == undefined}
                            color="secondary"
                            onPress={handleFilter("isWholesaleAndRetail", false)}
                            css={{ color: "$black", mb: 5 }}>
                            por mayor
                        </Button>
                    </Grid>
                    <Grid>
                        <Button auto
                            icon={<Icon id="local_shipping" />}
                            ghost={params.isWholesaleAndRetail == "false" || params.isWholesaleAndRetail == undefined}
                            color="secondary"
                            onPress={handleFilter("isWholesaleAndRetail", true)}
                            css={{ color: "$black", mb: 5 }}>
                            por mayor y menor
                        </Button>
                    </Grid>
                </Grid.Container>

            </Grid>


            <Text h4 css={{ mt: 10 }}>
                Buscar por
            </Text>
            <Grid>
                <Grid.Container justify="space-between">
                    <Grid>
                        <Button auto
                            icon={<Icon id="checkroom" />}
                            ghost={params.useBrand == "true"  /**should return false */}
                            onPress={handleFilter("useBrand", false)}
                            color="secondary"
                            css={{ color: "$black", mb: 5 }}>
                            Producto
                        </Button>
                    </Grid>
                    <Grid>
                        <Button auto

                            icon={<Icon id="store" />}
                            ghost={params.useBrand == "false" || params.useBrand == null/**should return false */}
                            onPress={handleFilter("useBrand", true)}
                            color="secondary"
                            css={{ color: "$black", mb: 5 }}>
                            Tienda
                        </Button>
                    </Grid>
                </Grid.Container>
            </Grid>




            {
                params.useBrand && params.useBrand == "true" &&
                <>
                    <Grid>
                        <Text h4 css={{ mt: 10 }}>
                            Ubicación
                        </Text>
                        <Dropdown>
                            <Dropdown.Button color="secondary" css={{ color: "$black" }}>
                                {
                                    zone
                                }
                            </Dropdown.Button>
                            <Dropdown.Menu
                                selectionMode="single"
                                selectedKeys={zone}
                                onSelectionChange={handleSelect("zone")}>
                                <Dropdown.Item key="Todas las ubicaciones" icon={<Icon id="pin_drop" />}>Todas las ubicaciones</Dropdown.Item>
                                <Dropdown.Item key="la salada" icon={<Icon id="pin_drop" />}>La salada</Dropdown.Item>
                                <Dropdown.Item key="flores" icon={<Icon id="pin_drop" />}>Flores</Dropdown.Item>
                                <Dropdown.Item key="online" icon={<Icon id="language" />}>Online</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Grid>
                    {
                        zone == "la salada" &&
                        <Grid>
                            <Text h4 css={{ mt: 10 }}>
                                ¿En que galpón estan?
                            </Text>
                            <Dropdown>
                                <Dropdown.Button color="secondary" css={{ color: "$black" }}>
                                    {
                                        shed
                                    }
                                </Dropdown.Button>
                                <Dropdown.Menu
                                    selectionMode="single"
                                    selectedKeys={shed}
                                    onSelectionChange={handleSelect("shed")}
                                >
                                    <Dropdown.Item key="Todos los galpones">Todos los galpones</Dropdown.Item>
                                    {
                                        Sheds.map(shed=>(
                                            <Dropdown.Item key={shed.shed}>{shed.shed}</Dropdown.Item>
                                        ))
                                    }
                                </Dropdown.Menu>

                            </Dropdown>
                        </Grid>}
                </>
            }



            <Text h4 css={{ mt: 10 }}>
                Categoria
            </Text>
            <Grid>

                <Grid.Container gap={.2}>
                    {
                        categories.map((category, i) => (
                            <Grid key={i}>
                                <Button auto
                                    ghost={params.category != category.name || params.category == null}
                                    onPress={handleFilter("category",category.name)}
                                    color="secondary"
                                    css={{ color: "$black" }}>
                                    {category.name}
                                </Button>
                            </Grid>
                        ))
                    }
                </Grid.Container>
            </Grid>
        </Grid.Container>
    )
}

export default SearchFilters