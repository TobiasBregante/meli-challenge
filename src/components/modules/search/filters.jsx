import { Button, Card, Dropdown, Grid, Input, Text } from "@nextui-org/react"
import { Fragment, useMemo, useState } from "react"
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
    }),
        [isOpen, setOpen] = useState(true)
    const router = useRouter()

    const handleSelect = name => e => {
        setState({
            ...state,
            [name]: e
        })
        if (Array.from(e)[0] == "Todas las ubicaciones" || Array.from(e)[0] == "Todos los galpones") {
            return handleFilter(name, "all")()
        }
        handleFilter(name, Array.from(e)[0])()
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
        setOpen(!isOpen)
        let queryBuilder = router.query

        queryBuilder = {
            ...queryBuilder,
            [key]: value
        }

        router.push(`/./${router?.locale}/search/?${new URLSearchParams(queryBuilder).toString()}`)
    }

    return (
        <Grid.Container direction="column">
            <Button color={'gradient'} icon={<Icon id="filter_list" color="white" />} onPress={()=>setOpen(!isOpen)} css={{"@sm": { d: "none" }}}>
                Filtros
            </Button>
            <Card css={{ h: "auto", "@smMax": { d: isOpen ? "none" : "" } }}>
                <Card.Header css={{"@smMax": { d: "none" }}}>
                    <Icon id="filter_list" />
                    <Text h3>Filtros</Text>
                </Card.Header>
                <Card.Body>
                    <Grid.Container direction="column" >
                        <Grid>
                            <Text h4>
                                Ordenar por
                            </Text>
                            <Dropdown>
                                <Dropdown.Button color="primary" css={{ color: "$white" }}>
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
                        <Text h4 css={{ mt: 10 }}>
                            Buscar por
                        </Text>
                        <Grid>
                            <Grid.Container justify="space-between">
                                <Grid>
                                    <Button auto
                                        icon={<Icon id="home" color='$black'/>}
                                        ghost={params.useBrand == "true"  /**should return false */}
                                        onPress={handleFilter("useBrand", false)}
                                        color="primary"
                                        css={{ color: "$black", mb: 5 }}>
                                        Producto
                                    </Button>
                                </Grid>
                                <Grid>
                                    <Button 
                                        auto
                                        icon={<Icon id="store" color='$black'/>}
                                        ghost={params.useBrand == "false" || params.useBrand == null/**should return false */}
                                        onPress={handleFilter("useBrand", true)}
                                        color="primary"
                                        css={{ color: "$black", mb: 5 }}>
                                        Marcas
                                    </Button>
                                </Grid>
                            </Grid.Container>
                        </Grid>
                        <Text h4 css={{ mt: 10 }}>
                            Categoria
                        </Text>
                        <Grid>
                            <Grid.Container gap={.2}>
                                {
                                    categories?.length > 0 && categories?.map((category, i) => (
                                        <Grid key={i}>
                                            <Button auto
                                                ghost={params?.category != category?.name || params?.category == null}
                                                onPress={handleFilter("category", category?.name)}
                                                color="primary"
                                                css={{ color: "$black" }}>
                                                {category?.name}
                                            </Button>
                                        </Grid>
                                    ))
                                }
                            </Grid.Container>
                        </Grid>
                    </Grid.Container>
                </Card.Body>
            </Card>
        </Grid.Container>

    )
}

export default SearchFilters