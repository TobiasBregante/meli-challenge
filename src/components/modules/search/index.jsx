import UnorderedList from '@/src/components/modules/products/list/unordered'
import BrandsList from '../brand/lists'
import { Card, Grid, Text, Input } from '@nextui-org/react'
import Icon from '@/ui/icons'
import { useMemo, useState } from "react"
import SearchFilters from './filters'

const SearchModule = ({ products, brands, query, categories, params }) => {

    const [productFind, setProductFind] = useState(products)

    const productChange = (e) => {
        const parsedZone = Array.from(e) 
        if (!parsedZone?.length) return; 
       const filterProducts = products.length && products?.filter(p => parsedZone.includes(p?.brand?.location?.zone)) || []
        setProductFind(filterProducts)
    }

    return (
        <Grid.Container gap={2}>
            <Grid xs={12} sm={3.5} >
                <SearchFilters productChange={productChange} categories={categories} params={params} products={products} />
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
                        <UnorderedList data={productFind} breakpoints={{ lg: 3 }} />
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