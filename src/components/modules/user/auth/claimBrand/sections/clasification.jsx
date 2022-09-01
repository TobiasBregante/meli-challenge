import Icon from "@/src/components/ui/icons";
import categories from "@/src/utils/user/brand/categories"
import { Checkbox, Dropdown, Grid, Input, Text } from "@nextui-org/react"
import { useMemo, useState } from "react";


const Clasification = ({ state, onChange, website }) => {
    const [categoryState, setCategory] = useState(""),
        [shippingBy, setShippingBy] = useState(""),
        [payMethod, setPayMethod] = useState([])

    const handleCategory = e => {
        setCategory(e)
        if (Object.values(e)[0] !== undefined) {
            onChange("category")({ target: { value: Object.values(e)[0] } })
        } else {
            onChange("category")({ target: { value: "" } })
        }

    }
    const handleShippingBy = e => {
        setShippingBy(e)
        if (Object.values(e)[0] !== undefined) {
            onChange("shippingBy")({ target: { value: Object.values(e)[0] } })
        } else {
            onChange("shippingBy")({ target: { value: "" } })
        }

    }
    const handlePaymethod = e => {
        setPayMethod(e)
        onChange("payMethod")({ target: { value: Array.from(e) } })
    }

    return (
        <>
            <Text h4 >
                Datos administrativos
            </Text>
            <Grid.Container gap={1}>
                <Grid>
                    <Text>
                        Categoria
                    </Text>
                    <Dropdown>
                        <Dropdown.Button flat color="$gray">
                            {
                                state.category.value.length == 0 ? "Eligé una categoria" : state.category.value
                            }
                        </Dropdown.Button>
                        <Dropdown.Menu
                            selectionMode="single"
                            selectedKeys={categoryState}
                            onSelectionChange={handleCategory}
                        >
                            {
                                website?.categories?.length > 0 && website?.categories?.map(category => (
                                    <Dropdown.Item key={category.name}>{category.name}</Dropdown.Item>
                                ))
                            }
                        </Dropdown.Menu>

                    </Dropdown>
                    <Text small color="error">
                        {state.category.error}
                    </Text>
                </Grid>

                <Grid>
                    <Text>
                        Medio de envio
                    </Text>
                    <Dropdown>
                        <Dropdown.Button flat color="$gray">
                            {
                                state.shippingBy.value.length == 0 ? "Eligé un medio " : state.shippingBy.value
                            }
                        </Dropdown.Button>
                        <Dropdown.Menu
                            selectionMode="single"
                            selectedKeys={shippingBy}
                            onSelectionChange={handleShippingBy}
                        >
                            <Dropdown.Item key="Correo">Correo</Dropdown.Item>
                            <Dropdown.Item key="Moto">Moto</Dropdown.Item>
                        </Dropdown.Menu>

                    </Dropdown>
                    <Text small color="error">
                        {state.shippingBy.error}
                    </Text>
                </Grid>
                <Grid>
                    <Input
                        clearable
                        label="Alcanze del envio"
                        placeholder="Escribe aqui"
                        helperText={state.shippingRange.error}
                        helperColor="error"
                        status={state.shippingRange.error ? "error" : "default"}
                        onChange={onChange("shippingRange")}
                        value={state.shippingRange.value}
                        css={{ w: "100%" }} />
                </Grid>
                <Grid>
                    <Text>
                        Metodos de pago
                    </Text>
                    <Dropdown>
                        <Dropdown.Button flat color="$gray">
                            {
                                state.payMethod.value.length == 0 ? "Eligé un metodo" : Array.from(state.payMethod.value).join(", ").replaceAll("_", " ")
                            }
                        </Dropdown.Button>
                        <Dropdown.Menu
                            selectionMode="multiple"
                            selectedKeys={payMethod}
                            onSelectionChange={handlePaymethod}
                        >
                            <Dropdown.Item key="efectivo" description="Puedes elegir más de uno">Efectivo</Dropdown.Item>
                            <Dropdown.Item key="mercadopago" description="Puedes elegir más de uno">Mercadopago</Dropdown.Item>
                            <Dropdown.Item key="transferencia" description="Puedes elegir más de uno">Transferencia</Dropdown.Item>
                        </Dropdown.Menu>

                    </Dropdown>
                    <Text small color="error">
                        {state.payMethod.error}
                    </Text>
                </Grid>
            </Grid.Container>
        </>
    )
}

export default Clasification