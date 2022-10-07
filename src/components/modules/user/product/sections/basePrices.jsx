import Icon from "@/src/components/ui/icons"
import { useUserContext } from "@/src/utils/user/provider"
import { Grid, Input } from "@nextui-org/react"

const BasePrices = ({state,handlePrices}) => {
    const user = useUserContext()
    return (
        <Grid.Container gap={1}>
            {
                user.brand.isWholesaleAndRetail &&
                <Grid>
                    <Input
                        type="number"
                        clearable
                        label="Precio por menor"
                        placeholder="Escribe aqui el precio por menor"
                        helperColor="error"
                        helperText={state.prices.retail.error}
                        status={state.prices.retail.error ? "error" : "default"}
                        contentLeft={<Icon id="attach_money" />}
                        value={state.prices.retail.value}
                        onChange={handlePrices("retail")} />
                </Grid>
            }
            <Grid>
                <Input
                    type="number"
                    clearable
                    label="Precio por mayor"
                    placeholder="Escribe aqui el precio por mayor"
                    helperColor="error"
                    helperText={state.prices.wholesale.error}
                    status={state.prices.wholesale.error ? "error" : "default"}
                    contentLeft={<Icon id="attach_money" />}
                    value={state.prices.wholesale.value}
                    onChange={handlePrices("wholesale")} />
            </Grid>
            <Grid>
                <Input
                    type="number"
                    clearable
                    label="Apartir de cuantos productos vendes para hacer envios"
                    placeholder="Escribe aqui la cantidad"
                    helperColor="error"
                    helperText={state.prices.minPerWholesale.error}
                    status={state.prices.minPerWholesale.error ? "error" : "default"}
                    contentLeft={<Icon id="inventory" />}
                    value={state.prices.minPerWholesale.value}
                    onChange={handlePrices("minPerWholesale")} />
            </Grid>
        </Grid.Container>
    )
}


export default BasePrices