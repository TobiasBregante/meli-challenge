import Icon from "@/src/components/ui/icons"
import { Grid, Input } from "@nextui-org/react"

const PerTasksPrices = ({ state, handlePrices }) => {

    return (
        <Grid.Container gap={1}>
            <Grid>
                <Input
                    type="number"
                    clearable
                    label="Apartir de cuantas curvas vendes para hacer envíos"
                    placeholder="Escribe aqui la cantidad"
                    helperColor="error"
                    helperText={state.prices.minPerCurve.error}
                    status={state.prices.minPerCurve.error ? "error" : "default"}
                    contentLeft={<Icon id="inventory" />}
                    value={state.prices.minPerCurve.value}
                    onChange={handlePrices("minPerCurve")} />
            </Grid>
            <Grid>
                <Input
                    type="number"
                    clearable
                    label="Precio total por mayor por curva"
                    placeholder="Escribe aqui el precio total por mayor por curva"
                    helperColor="error"
                    helperText={state.prices.perCurve.error}
                    status={state.prices.perCurve.error ? "error" : "default"}
                    contentLeft={<Icon id="attach_money" />}
                    value={state.prices.perCurve.value}
                    onChange={handlePrices("perCurve")} />
            </Grid>

        </Grid.Container>
    )
}


export default PerTasksPrices