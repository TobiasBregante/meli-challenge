import { Grid, Input } from '@nextui-org/react'
import Icon from '@/ui/icons'
import ProductTable from '../products/list/table'
import fuse from 'fuse.js'
import { useState } from 'react'


const SearchBrands = ({ data, isSeller }) => {
    const [value, setValue] = useState("")
    const [state, setState] = useState(data)

    const handleChange = (e) => {
        setValue(e.target.value)
        if (e.target.value.length == 0) {
            console.log(data);
            return setState(data)
        }
        const searchEngine = new fuse(data, {
            keys: ["title", "brand.brandName", "brand.location.zone"],
            threshold:0.2
        })
        setState(searchEngine.search(e.target.value).map(p => p.item))

    }
    return (
        <Grid.Container direction="column">
            <Input
                css={{ mb: 10, "& label": { bg: "$white" } }}
                placeholder="Escribe aqui para buscar"
                contentLeft={<Icon id="inventory" />}
                value={value}
                onChange={handleChange} />
            <ProductTable data={state} isSeller={isSeller}/>
        </Grid.Container>
    )

}

export default SearchBrands