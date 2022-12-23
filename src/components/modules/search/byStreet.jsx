import { Grid, Input } from '@nextui-org/react'
import Icon from '@/ui/icons'
import BrandTable from '../brand/lists/table'


const SearchByStreetModule = ({ data, state, setState }) => {

    const handleChange = (e) => {
        setState(data.filter(brand => brand.location.street.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1))
    }
    return (
        <Grid.Container direction="column">
            <Input
                css={{ mb: 10, "& label": { bg: "$white" } }}
                placeholder="Escribe aqui una calle buscar"
                contentLeft={<Icon id="store" />}
                onChange={handleChange} />
            <BrandTable data={state} />
        </Grid.Container>
    )

}

export default SearchByStreetModule