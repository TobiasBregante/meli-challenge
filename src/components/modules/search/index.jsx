import UnorderedList from '@/src/components/modules/products/list/unordered'
import { Button, Card, Grid, Text } from '@nextui-org/react'
import Icon from '@/ui/icons'
import SearchFilters from './filters'
import { useState } from 'react'

const SearchModule = ({ products, brands, query, categories, params }) => {
    const [open, setOpen] = useState(false)
    const [btnText, setBtnText] = useState('Filtrar')

    const handlerOpenFilter = () => {
        setOpen(!open)
        setBtnText(btnText === 'Filtrar' ? 'Ocultar' : 'Filtrar')
    }

    return (
        <Grid.Container gap={2}>
            {
                open && <Grid xs={12} sm={3.5} >
                    <SearchFilters categories={categories} params={params} />
                </Grid>
            }
            <Grid xs={12} sm={0} >
                <SearchFilters categories={categories} params={params} />
            </Grid>
            <Grid xs={12} sm={open ? 8.5 : 12} >
                <Grid.Container direction="column">
                    {
                        query &&
                        <Text h3>
                            <Button className='btnSearchFilterDesktop' css={{ d: 'inline-flex', marginRight: 5 }} size={'xs'} flat color={'$primary'} onClick={handlerOpenFilter}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="currentColor" className="bi bi-sort-alpha-up" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z"/>
                                    <path d="M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zm-8.46-.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z"/>
                                </svg>
                            </Button> 
                            Resultados para: {query}
                        </Text>
                    }
                    {
                        products &&
                        <UnorderedList data={products} />
                    }
                    {
                        (products && products.length == 0) &&
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