import { Button, Dropdown, Grid, Text } from "@nextui-org/react"
import { useMemo, useState } from "react"
import Icon from "@/ui/icons"
import categories from "@/src/utils/user/brand/categories"

const SearchFilters = () => {
    const [state, setState] = useState({
        orderBy: new Set(["Más popular"]),
        isWholeSale: null,
        category: null,
        isStore:null,
        location:new Set(["Todas las ubicaciones"])
    })

    const handleSelect = name=>e => {
        setState({
            ...state,
            [name]: e
        })
    }

    const orderBy = useMemo(
        () => Array.from(state.orderBy),
        [state.orderBy]
    );

    const location = useMemo(
        () => Array.from(state.location),
        [state.location]
    );

    const handleState = name => e => {
        setState({
            ...state,
            [name]: e.target.value
        })
    }

    return (
        <Grid.Container direction="column" >
            <Grid>
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
            <Grid css={{ mt: 10 }}>
                <Text h4>
                    Solo venta
                </Text>
            </Grid>
            <Grid>
                <Grid.Container justify="space-between">
                    <Grid>
                        <Button auto

                            icon={<Icon id="shopping_cart" />}
                            ghost={state.isWholeSale == true || state.isWholeSale == null}
                            onPress={() => handleState("isWholeSale")({ target: { value: false } })}
                            color="secondary"
                            css={{ color: "$black", mb: 5 }}>
                            por menor
                        </Button>
                    </Grid>
                    <Grid>
                        <Button auto

                            icon={<Icon id="local_shipping" />}
                            ghost={state.isWholeSale == false || state.isWholeSale == null}
                            onPress={() => handleState("isWholeSale")({ target: { value: true } })}
                            color="secondary"
                            css={{ color: "$black", mb: 5 }}>
                            por mayor
                        </Button>
                    </Grid>
                </Grid.Container>

            </Grid>
            <Grid>
                <Text h4 css={{mt:10}}>
                    Ubicación
                </Text>
                <Dropdown>
                    <Dropdown.Button color="secondary" css={{ color: "$black" }}>
                        {
                            location 
                        }
                    </Dropdown.Button>
                    <Dropdown.Menu
                        selectionMode="single"
                        selectedKeys={location}
                        onSelectionChange={handleSelect("location")}>
                        <Dropdown.Item key="Todas las ubicaciones" icon={<Icon id="pin_drop" />}>Todas las ubicaciones</Dropdown.Item>
                        <Dropdown.Item key="La salada" icon={<Icon id="pin_drop" />}>La salada</Dropdown.Item>
                        <Dropdown.Item key="Flores" icon={<Icon id="pin_drop" />}>Flores</Dropdown.Item>
                        <Dropdown.Item key="Online" icon={<Icon id="language" />}>Online</Dropdown.Item>
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
                            icon={<Icon id="checkroom" />}
                            ghost={state.isStore == true || state.isStore == null}
                            onPress={() => handleState("isStore")({ target: { value: false } })}
                            color="secondary"
                            css={{ color: "$black", mb: 5 }}>
                            Producto
                        </Button>
                    </Grid>
                    <Grid>
                        <Button auto

                            icon={<Icon id="store" />}
                            ghost={state.isStore == false || state.isStore == null}
                            onPress={() => handleState("isStore")({ target: { value: true } })}
                            color="secondary"
                            css={{ color: "$black", mb: 5 }}>
                            Tienda
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
                        categories.map((category, i) => (
                            <Grid key={i}>
                                <Button auto
                                    ghost={state.category != category || state.category == null}
                                    onPress={() => handleState("category")({ target: { value: category } })}
                                    color="secondary"
                                    css={{ color: "$black" }}>
                                    {category}
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