import UnorderedList from '@/src/components/modules/products/list/unordered'
import { Card, Grid, Text } from '@nextui-org/react'
import Icon from '@/ui/icons'
import SearchFilters from './filters'

const SearchModule = ({ data, query }) => {

    return (
        <Grid.Container gap={2}>
            <Grid xs={3.5} lg={3.5}>
                <Grid >
                    <Card css={{ h: "auto" }}>
                        <Card.Header>
                            <Icon id="filter_list" />
                            <Text h3>Filtros</Text>
                        </Card.Header>
                        <Card.Body>
                            <SearchFilters />
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid>
            <Grid xs={12} lg={8.5}>
                <Grid.Container direction="column">
                    <Text h3>
                        Resultados para: {query}
                    </Text>
                    <UnorderedList data={data} breakpoints={{ lg: 3 }} />
                </Grid.Container>
            </Grid>
        </Grid.Container>
    )

}

export default SearchModule