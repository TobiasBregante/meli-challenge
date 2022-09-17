import UnorderedList from '@/src/components/modules/products/list/unordered'
import BrandsList from '../brand/lists'
import { Card, Grid, Text } from '@nextui-org/react'
import Icon from '@/ui/icons'
import SearchFilters from './filters'

const SearchModule = ({ products, brands, query, categories, params }) => {

    console.log({ products, brands });
    return (
        <Grid.Container gap={2}>
            <Grid xs={12} sm={3.5} >
                <SearchFilters categories={categories} params={params} />
            </Grid>
            <Grid xs={12} sm={8.5} >
                <Grid.Container direction="column">
                    {
                        query &&
                        <Text h3>
                            Resultados para: {query}
                        </Text>
                    }
                    {
                        products &&
                        <UnorderedList data={products} breakpoints={{ lg: 3 }} />
                    }
                    {
                        brands &&
                        <BrandsList data={brands} breakpoints={{ lg: 4, }} />
                    }
                    {
                        ((brands && brands.length == 0) || (products && products.length == 0)) &&
                        <Text h2>
                            Sin resultados
                        </Text>
                    }
                </Grid.Container>
            </Grid>
        </Grid.Container>
    )

}

export default SearchModule