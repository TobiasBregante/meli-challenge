import UnorderedList from '@/src/components/modules/products/list/unordered'
import { Grid } from '@nextui-org/react'
import BrandProfileMinimal from '../minimalProfile'

const BrandProfile = ({ data }) => {
    const content = data?.products?.map(e => ({
        ...e,
        brand: {
            location: data.location,
            brandName: data.brandName
        }
    }))

    return (
        <Grid.Container css={{ mt: 10 }} gap={1}>
            <Grid xs={12} md={4}>
                <BrandProfileMinimal data={data} hideFullProfile={true} />
            </Grid>
            <Grid xs={12} md={8}>
                <Grid.Container>
                    <UnorderedList data={content} breakpoints={{ lg: 4 }} />
                </Grid.Container>
            </Grid>
        </Grid.Container>
    )
}

export default BrandProfile