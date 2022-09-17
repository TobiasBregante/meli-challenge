import { Card, Grid, Input, Text } from '@nextui-org/react'
import Icon from '@/ui/icons'
import BrandTable from '../brand/lists/table'


const SearchBrands = ({ data, state, setState }) => {

    const handleChange = (e) => {
        setState(data.filter(brand => brand.brandName.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1))
    }
    return (
        <Grid.Container direction="column">
            <Input
                css={{ mb: 10, "& label": { bg: "$white" } }}
                placeholder="Escribe aqui un nombre para buscar"
                contentLeft={<Icon id="store" />}
                onChange={handleChange} />
            <BrandTable data={state} />
        </Grid.Container>
    )

}

export default SearchBrands