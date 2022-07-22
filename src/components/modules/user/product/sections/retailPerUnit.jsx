import Icon from '@/ui/icons/'
import { Grid, Input } from '@nextui-org/react'

const RetailPerUnit = ({ state, handleState }) => {
    return (
        <Grid.Container direction="column" gap={1.5}>
            <Grid>
                <Input
                    type="number"
                    label="Cantidad minima de unidades para ventas por menor"
                    placeholder="Escribe aqui"
                    helperText={state.minPerUnit.error}
                    helperColor="error"
                    status={state.minPerUnit.error?"error":"default"}
                    contentLeft={<Icon id="filter_none" />}
                    value={state.minPerUnit.value}
                    onChange={handleState("minPerUnit")}
                    clearable />
            </Grid>
            <Grid>
                <Input
                    type="number"
                    label="Precio para ventas por menor"
                    className="mt-2"
                    placeholder="Escribe aqui"
                    helperText={state.pricePerUnit.error}
                    helperColor="error"
                    status={state.pricePerUnit.error?"error":"default"}
                    labelLeft="$"
                    value={state.pricePerUnit.value}
                    onChange={handleState("pricePerUnit")}
                    clearable />
            </Grid>
        </Grid.Container>
    )
}
export default RetailPerUnit