import Icon from '@/ui/icons/'
import { Grid, Input } from '@nextui-org/react'

const RetailPerDozen = ({ state, handleState }) => {
    return (
        <Grid.Container direction="column" gap={1.5}>
            <Grid>
                <Input
                    type="number"
                    label="Cantidad minima de docenas para ventas por menor"
                    placeholder="Escribe aqui"
                    helperText={state.minPerDozen.error}
                    helperColor="error"
                    status={state.minPerDozen.error?"error":"default"}
                    contentLeft={<Icon id="filter_none" />}
                    value={state.minPerDozen.value}
                    onChange={handleState("minPerDozen")}
                    clearable />
            </Grid>
            <Grid>
                <Input
                    type="number"
                    label="Precio de cada unidad en la docena"
                    className="mt-2"
                    placeholder="Escribe aqui"
                    helperText={state.pricePerDozen.error}
                    helperColor="error"
                    status={state.pricePerDozen.error?"error":"default"}
                    labelLeft="$"
                    value={state.pricePerDozen.value}
                    onChange={handleState("pricePerDozen")}
                    clearable />
            </Grid>
        </Grid.Container>
    )
}
export default RetailPerDozen