import Icon from "@/src/components/ui/icons"
import { Grid, Input } from "@nextui-org/react"

const PerDozenPrices = ({state,handlePrices}) => {
    return (
        <Grid.Container gap={1}>
            <Grid>
                <Input
                    type="number"
                    clearable
                    label="Apartir de cuantas docenas vendes para hacer envios"
                    placeholder="Escribe aqui la cantidad"
                    helperColor="error"
                    helperText={state.prices.minPerDozen.error}
                    status={state.prices.minPerDozen.error ? "error" : "default"}
                    contentLeft={<Icon id="inventory" />}
                    value={state.prices.minPerDozen.value}
                    onChange={handlePrices("minPerDozen")} />
            </Grid>
            <Grid>
                <Input
                    type="number"
                    clearable
                    label="Precio por mayor por una docena"
                    placeholder="Escribe aqui el precio por docena"
                    helperColor="error"
                    helperText={state.prices.perDozen.error}
                    status={state.prices.perDozen.error ? "error" : "default"}
                    contentLeft={<Icon id="attach_money" />}
                    value={state.prices.perDozen.value}
                    onChange={handlePrices("perDozen")} />
            </Grid>
            

        </Grid.Container>
    )
}


export default PerDozenPrices