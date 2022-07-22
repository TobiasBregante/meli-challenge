import Icon from '@/ui/icons/'
import { Grid, Input, Text } from '@nextui-org/react'

const WholesalePerUnit = ({ state, handleState }) => {
    return (
        <>
            <Grid.Container gap={2}>
                <Grid>
                    <Input
                        type="number"
                        label="Cantidad minima para envios"
                        placeholder="Escribe aqui"
                        helperText={state.minPerUnit.error}
                        helperColor="error"
                        status={state.minPerUnit.error ? "error" : "default"}
                        contentLeft={<Icon id="filter_none" />}
                        value={state.minPerUnit.value}
                        onChange={handleState("minPerUnit")}
                        clearable />
                </Grid>
                <Grid>
                    <Input
                        type="number"
                        label="Precio para ventas por mayor"
                        className="mt-2"
                        placeholder="Escribe aqui"
                        helperText={state.pricePerUnit.error}
                        helperColor="error"
                        status={state.pricePerUnit.error ? "error" : "default"}
                        labelLeft="$"
                        value={state.pricePerUnit.value}
                        onChange={handleState("pricePerUnit")}
                        clearable />
                </Grid>
            </Grid.Container>
            <Grid.Container gap={2}>
                <Grid>
                    <Text h4>
                        Ventas por mayor de gran cantidad
                    </Text>
                </Grid>
                <Grid>
                    <Input
                        type="number"
                        label="Coloque aquí la cantidad de dozenas para ventas en cantidad"
                        className="mt-2"
                        placeholder="Escribe aqui"
                        helperText={state.minPerBigUnit.error}
                        helperColor="error"
                        status={state.minPerBigUnit.error ? "error" : "default"}
                        contentLeft={<Icon id="filter_none" />}
                        value={state.minPerBigUnit.value}
                        onChange={handleState("minPerBigUnit")}
                        clearable />
                </Grid>
                <Grid>
                    <Input
                        type="number"
                        label={`Precio para ventas por gran cantidad por cada unidad en la dozena`}
                        className="mt-2"
                        placeholder={`el precio debe ser menor a ${state.pricePerUnit.value}`}
                        helperText={state.pricePerBigUnit.error}
                        helperColor="error"
                        status={state.pricePerBigUnit.error ? "error" : "default"}
                        labelLeft="$"
                        value={state.pricePerBigUnit.value}
                        onChange={handleState("pricePerBigUnit")}
                        clearable />
                </Grid>
            </Grid.Container>
        </>
    )
}
export default WholesalePerUnit