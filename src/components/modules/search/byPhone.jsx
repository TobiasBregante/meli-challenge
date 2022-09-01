import { Card, Grid, Input, Text } from '@nextui-org/react'
import Icon from '@/ui/icons'
import UsersList from '../user/lists/userList'

const SearchByPhoneModule = ({ data, state, setState }) => {

    const handleChange = (e) => {
        setState(data.filter(user => user.cellPhone.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1))
    }
    return (
        <Grid.Container direction="column">
            <Input
                css={{ mb: 10, "& label": { bg: "$white" } }}
                placeholder="Escribe aqui un email para buscar"
                contentLeft={<Icon id="mail" />}
                onChange={handleChange} />
            <UsersList data={state} />
        </Grid.Container>
    )

}

export default SearchByPhoneModule