import Icon from "@/src/components/ui/icons"
import { Grid, Input } from "@nextui-org/react"
import currency from "currency.js"

const PerQuantityByDozenOrCurvePrices = ({ state, handlePrices }) => {
    const total = () => {
        const x = parseInt(state.prices.minPerQuantityByDozenOrCurve.value) * parseInt(state.prices.perQuantityByDozenOrCurve.value)
       
        return currency(x, { decimal: ",", separator: "." }).format()
    }
    return (
        <Grid.Container gap={1}>
            <Grid>
                <Input
                    type="number"
                    clearable
                    label="Apartir de cuantas docenas o curva vendes por cantidad para hacer envios"
                    placeholder="Escribe aqui la cantidad"
                    helperColor="error"
                    helperText={state.prices.minPerQuantityByDozenOrCurve.error}
                    status={state.prices.minPerQuantityByDozenOrCurve.error ? "error" : "default"}
                    contentLeft={<Icon id="inventory" />}
                    value={state.prices.minPerQuantityByDozenOrCurve.value}
                    onChange={handlePrices("minPerQuantityByDozenOrCurve")} />
            </Grid>
            <Grid>
                <Input
                    type="number"
                    clearable
                    label="Precio por mayor por docena o curva"
                    placeholder="Escribe aqui el precio por docena o curva"
                    helperColor="error"
                    helperText={state.prices.perQuantityByDozenOrCurve.error}
                    status={state.prices.perQuantityByDozenOrCurve.error ? "error" : "default"}
                    contentLeft={<Icon id="attach_money" />}
                    value={state.prices.perQuantityByDozenOrCurve.value}
                    onChange={handlePrices("perQuantityByDozenOrCurve")} />
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


export default PerQuantityByDozenOrCurvePrices