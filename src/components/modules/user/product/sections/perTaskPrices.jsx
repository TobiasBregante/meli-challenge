import Icon from "@/src/components/ui/icons"
import { Grid, Input } from "@nextui-org/react"

const PerTasksPrices = ({ state, handlePrices }) => {

    return (
        <Grid.Container gap={1}>
            <Grid>
                <Input
                    type="number"
                    clearable
                    label="Apartir de cuantas tareas vendes para hacer envíos"
                    placeholder="Escribe aqui la cantidad"
                    helperColor="error"
                    helperText={state.prices.minPerTask.error}
                    status={state.prices.minPerTask.error ? "error" : "default"}
                    contentLeft={<Icon id="inventory" />}
                    value={state.prices.minPerTask.value}
                    onChange={handlePrices("minPerTask")} />
            </Grid>
            <Grid>
                <Input
                    type="number"
                    clearable
                    label="Precio por mayor por una tarea"
                    placeholder="Escribe aqui el precio total por mayor por tarea"
                    helperColor="error"
                    helperText={state.prices.perTask.error}
                    status={state.prices.perTask.error ? "error" : "default"}
                    contentLeft={<Icon id="attach_money" />}
                    value={state.prices.perTask.value}
                    onChange={handlePrices("perTask")} />
            </Grid>

        </Grid.Container>
    )
}


export default PerTasksPrices