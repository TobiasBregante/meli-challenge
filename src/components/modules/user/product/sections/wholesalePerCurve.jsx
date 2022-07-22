import Icon from '@/ui/icons/'
import { Grid, Input, Text } from '@nextui-org/react'
import currency from 'currency.js'

const WholesalePerDozen = ({ state, handleState }) => {

    const total = () => {
        const price = parseInt(state.pricePerCurve.value, 10)
        const unitsInCurve = parseInt(state.sizesPerCurve.value, 10)
        const curves = parseInt(state.minPerCurve.value, 10)

        const quantity = unitsInCurve * curves
        const total = quantity * price

        if (isNaN(total)) {
            return 0
        }
        return total
    }
    const totalBigCurve = () => {
        const price = parseInt(state.pricePerBigCurve.value, 10)
        const unitsInCurve = parseInt(state.sizesPerCurve.value, 10)
        const curves = parseInt(state.minPerBigCurve.value, 10)

        const quantity = unitsInCurve * curves
        const total = quantity * price

        if (isNaN(total)) {
            return 0
        }
        return total
    }
    return (
        <>
            <Grid.Container gap={2}>
                <Grid>
                    <Input
                        type="number"
                        label="Cantidad de talles que tiene una curva"
                        placeholder="Escribe aqui"
                        helperText={state.sizesPerCurve.error}
                        helperColor="error"
                        status={state.sizesPerCurve.error ? "error" : "default"}
                        contentLeft={<Icon id="filter_none" />}
                        value={state.sizesPerCurve.value}
                        onChange={handleState("sizesPerCurve")}
                        clearable />
                </Grid>
                <Grid>
                    <Input
                        type="number"
                        label="Cantidad minima de curvas para envios"
                        placeholder="Escribe aqui"
                        helperText={state.minPerCurve.error}
                        helperColor="error"
                        status={state.minPerCurve.error ? "error" : "default"}
                        contentLeft={<Icon id="filter_none" />}
                        value={state.minPerCurve.value}
                        onChange={handleState("minPerCurve")}
                        clearable />
                </Grid>
                <Grid>
                    <Input
                        type="number"
                        label="Precio para ventas por mayor por cada unidad en la curva"
                        className="mt-2"
                        placeholder="Escribe aqui"
                        helperText={state.pricePerCurve.error}
                        helperColor="error"
                        status={state.pricePerCurve.error ? "error" : "default"}
                        labelLeft="$"
                        value={state.pricePerCurve.value}
                        onChange={handleState("pricePerCurve")}
                        clearable />
                </Grid>
                <Grid>
                    <Input
                        label={`Precio total por ${state.minPerCurve.value} curvas`}
                        labelLeft="$"
                        value={total()}
                        readOnly />
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
                        label="Coloque aquí la cantidad de curvas para ventas en cantidad"
                        className="mt-2"
                        placeholder="Escribe aqui"
                        helperText={state.minPerBigCurve.error}
                        helperColor="error"
                        status={state.minPerBigCurve.error ? "error" : "default"}
                        contentLeft={<Icon id="filter_none" />}
                        value={state.minPerBigCurve.value}
                        onChange={handleState("minPerBigCurve")}
                        clearable />
                </Grid>
                <Grid>
                    <Input
                        type="number"
                        label={`Precio para ventas por gran cantidad por cada unidad en la curva`}
                        className="mt-2"
                        placeholder={`el precio debe ser menor a ${state.pricePerCurve.value}`}
                        helperText={state.pricePerBigCurve.error}
                        helperColor="error"
                        status={state.pricePerBigCurve.error ? "error" : "default"}
                        labelLeft="$"
                        value={state.pricePerBigCurve.value}
                        onChange={handleState("pricePerBigCurve")}
                        clearable />
                </Grid>
                <Grid>
                    <Input
                        label={`Precio total por gran cantidad por ${state.minPerBigCurve.value} curvas`}
                        labelLeft="$"
                        value={totalBigCurve()}
                        readOnly />
                </Grid>
            </Grid.Container>
        </>
    )
}
export default WholesalePerDozen