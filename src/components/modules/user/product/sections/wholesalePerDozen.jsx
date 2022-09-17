import { useUserContext } from '@/src/utils/user/provider'
import Icon from '@/ui/icons/'
import { Checkbox, Grid, Input, Text, Tooltip } from '@nextui-org/react'

const WholesalePerDozen = ({ state, handleState, data }) => {
    const user = useUserContext()
    const total = () => {
        const price = parseInt(state.pricePerDozen.value, 10)
        const unitsInDozen = 12
        const dozens = parseInt(state.minPerDozen.value, 10)

        const quantity = unitsInDozen * dozens
        const total = quantity * price

        if (isNaN(total)) {
            return 0
        }
        return total
    }

    const totalBigDozen = () => {
        const price = parseInt(state.pricePerBigDozen.value, 10)
        const unitsInDozen = 12
        const dozens = parseInt(state.minPerBigDozen.value, 10)

        const quantity = unitsInDozen * dozens
        const total = quantity * price

        if (isNaN(total)) {
            return 0
        }
        return total
    }

    const handlePerDozenTalk = (e) => {
        handleState("perDozenTalk")({ target: { value: e } })
    }

    return (
        <>
            <Grid.Container css={{ mt: 20 }}>
                <Checkbox label="Precio a coversar" isSelected={state.perDozenTalk.value} onChange={handlePerDozenTalk} />
            </Grid.Container>
            {
                state.perDozenTalk.value == false &&
                <>
                    <Grid.Container gap={2}>
                        <Grid>
                            <Input
                                type="number"
                                label="Cantidad minima de docenas para envios"
                                placeholder="Escribe aqui"
                                helperText={state.minPerDozen.error}
                                helperColor="error"
                                status={state.minPerDozen.error ? "error" : "default"}
                                contentLeft={<Icon id="filter_none" />}
                                value={state.minPerDozen.value}
                                onChange={handleState("minPerDozen")}
                                clearable />
                        </Grid>
                        <Grid>
                            <Input
                                type="number"
                                label="Precio por unidad en la docena para por mayor"
                                className="mt-2"
                                placeholder="Escribe aqui"
                                helperText={state.pricePerDozen.error}
                                helperColor="error"
                                status={state.pricePerDozen.error ? "error" : "default"}
                                labelLeft="$"
                                value={state.pricePerDozen.value}
                                onChange={handleState("pricePerDozen")}
                                clearable />
                        </Grid>
                        <Grid>
                            <Input
                                label={`Precio total por ${state.minPerDozen.value} docenas`}
                                labelLeft="$"
                                value={total()}
                                readOnly />
                        </Grid>
                    </Grid.Container>
                    {
                        (data?.brand?.isPremiun || user.status.isPremiun) &&
                        <Grid.Container gap={2} direction="column">
                            <Grid>
                                <Text h4>
                                    Ventas por mayor de gran cantidad
                                </Text>
                            </Grid>
                            <Grid>
                                <Input
                                    type="number"
                                    label="Cantidad de docenas para ventas en cantidad"
                                    className="mt-2"
                                    placeholder="Escribe aqui"
                                    helperText={state.minPerBigDozen.error}
                                    helperColor="error"
                                    status={state.minPerBigDozen.error ? "error" : "default"}
                                    contentLeft={<Icon id="filter_none" />}
                                    value={state.minPerBigDozen.value}
                                    onChange={handleState("minPerBigDozen")}
                                    clearable />
                            </Grid>
                            <Grid>
                                <Tooltip content={`El precio debe ser menor a ${state.pricePerDozen.value}`}>
                                    <Input
                                        type="number"
                                        label={
                                            <Text small>
                                                Precio por unidad en docena para ventas en cantidad
                                            </Text>
                                        }
                                        className="mt-2"
                                        placeholder={`el precio debe ser menor a ${state.pricePerDozen.value}`}
                                        helperText={state.pricePerBigDozen.error}
                                        helperColor="error"
                                        status={state.pricePerBigDozen.error ? "error" : "default"}
                                        labelLeft="$"
                                        value={state.pricePerBigDozen.value}
                                        onChange={handleState("pricePerBigDozen")}
                                        clearable />
                                </Tooltip>
                            </Grid>
                            <Grid>
                                <Input
                                    label={`Precio total por gran cantidad por ${state.minPerBigDozen.value} docenas`}
                                    labelLeft="$"
                                    value={totalBigDozen()}
                                    readOnly />
                            </Grid>
                        </Grid.Container>
                    }
                </>
            }
        </>
    )
}
export default WholesalePerDozen