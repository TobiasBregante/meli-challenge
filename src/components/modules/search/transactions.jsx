import { Grid, Input } from '@nextui-org/react'
import Icon from '@/ui/icons'
import TransactionsList from '../transactions/transactionList'

const SearchTransactionModule = ({ data, state, setState }) => {

    const handleChange = (e) => {
        setState(data.filter(transaction => transaction?.transaction?.payer?.phone?.number?.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1))
    }
    return (
        <Grid.Container direction="column">
            <Input
                css={{ mb: 10, "& label": { bg: "$white" } }}
                placeholder="Escribe aqui un teléfono para buscar"
                contentLeft={<Icon id="phone" />}
                onChange={handleChange} />
            <TransactionsList data={state}/>
        </Grid.Container>
    )

}

export default SearchTransactionModule