import UnorderedList from '@/src/components/modules/products/list/unordered'
import BrandsList from '../brand/lists'
import { Card, Grid, Text } from '@nextui-org/react'
import Icon from '@/ui/icons'
import SearchFilters from './filters'

const SearchModule = ({ products, brands, query, categories, params }) => {

    console.log({ products, brands });
    return (
        <Grid.Container gap={2}>
            <Grid xs={12} sm={3.5} lg={3.5}>
                <Grid >
                    <Card css={{ h: "auto" }}>
                        <Card.Header>
                            <Icon id="filter_list" />
                            <Text h3>Filtros</Text>
                        </Card.Header>
                        <Card.Body>
                            <SearchFilters categories={categories} params={params} />
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid>
            <Grid xs={12} sm={8.5} lg={8.5}>
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