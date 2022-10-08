import Icon from "@/src/components/ui/icons"
import { Dropdown, Grid, Input, Text } from "@nextui-org/react"
import currency from "currency.js"
import { useMemo, useState } from "react"

const PerQuantityPrices = ({ state, handlePrices }) => {
    const [type, setType] = useState(new Set([state.prices.typePerQuantity.value]));

    const typeSelected = useMemo(
        () => Array.from(type)[0],
        [type]
    );
    const handleType = (e) => {
        setType(e)
        handlePrices("typePerQuantity")({ target: { value: Array.from(e)[0] } })
    }
    const total = () => {
        let multiplyBy = 1
        if (typeSelected === "docenas") {
            multiplyBy = 12
        }
        if (typeSelected === "par") {
            multiplyBy = 2
        }
        const x = parseInt(state.prices.minPerQuantity.value) * parseInt(state.prices.perQuantity.value) * multiplyBy

        return currency(x, { decimal: ",", separator: "." }).format()
    }
    return (
        <Grid.Container gap={1} direction="column">
            <Grid>
                <Text>
                    Como venderas tu producto en cantidad:
                </Text>
                <Dropdown>
                    <Dropdown.Button flat >
                        {typeSelected || "Elije una opción"}
                    </Dropdown.Button>
                    <Dropdown.Menu
                        aria-label="Como venderas tu producto por cantidad"
                        color="secondary"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={type}
                        onSelectionChange={handleType}
                    >
                        <Dropdown.Item key="docenas">docenas</Dropdown.Item>
                        <Dropdown.Item key="curvas">curvas</Dropdown.Item>
                        <Dropdown.Item key="par">par</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Text small color="error">
                    {state.prices.typePerQuantity.error}
                </Text>
            </Grid>
            <Grid>
                <Input
                    type="number"
                    clearable
                    label="Precio normal que vendes tu producto por mayor"
                    placeholder="Escribe aqui la precio"
                    helperColor="error"
                    helperText={state.prices.wholesale.error}
                    status={state.prices.wholesale.error ? "error" : "default"}
                    contentLeft={<Icon id="inventory" />}
                    value={state.prices.wholesale.value}
                    onChange={handlePrices("wholesale")} />
            </Grid>
            <Grid>
                <Input
                    type="number"
                    clearable
                    label={`Coloque aquí el precio para venta por cantidad`}
                    placeholder="Escribe aqui la precio"
                    helperColor="error"
                    helperText={state.prices.perQuantity.error}
                    status={state.prices.perQuantity.error ? "error" : "default"}
                    contentLeft={<Icon id="inventory" />}
                    value={state.prices.perQuantity.value}
                    onChange={handlePrices("perQuantity")} />
            </Grid>
            <Grid>
                <Input
                    type="number"
                    clearable
                    label={`Coloque aquí  el mínimo que vendes por cantidad por ${typeSelected ? typeSelected : ""}`}
                    placeholder="Escribe aqui la cantidad "
                    helperColor="error"
                    helperText={state.prices.minPerQuantity.error}
                    status={state.prices.minPerQuantity.error ? "error" : "default"}
                    contentLeft={<Icon id="attach_money" />}
                    value={state.prices.minPerQuantity.value}
                    onChange={handlePrices("minPerQuantity")} />
            </Grid>
            <Grid>
                <Input
                    value={total()}
                    readOnly
                    label="TOTAL" />
            </Grid>

        </Grid.Container>
    )
}


export default PerQuantityPrices