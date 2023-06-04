import Icon from "@/src/components/ui/icons"
import { useUserContext } from "@/src/utils/user/provider"
import { Grid, Input } from "@nextui-org/react"

const BasePrices = ({state,handlePrices, data}) => {
    const user = useUserContext()
    
    return (
        <Grid.Container gap={1}>
            {
                (user?.brand || data?.brand) &&
                <Grid>
                    <Input
                        type="number"
                        clearable
                        label="Precio"
                        placeholder="Escribe aqui el precio"
                        helperColor="error"
                        helperText={state.prices.retail.error}
                        status={state.prices.retail.error ? "error" : "default"}
                        contentLeft={<Icon id="attach_money" />}
                        value={state.prices.retail.value}
                        onChange={handlePrices("retail")} />
                </Grid>
            }
        </Grid.Container>
    )
}


export default BasePrices