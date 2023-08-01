import Page from '@Page'
import { Container, Grid } from '@nextui-org/react'
import SideBar from '@/src/components/modules/admin/sidebar'
import SearchByEmailModule from '@/src/components/modules/search/byEmail'
import { useState } from 'react'
import Get from '@/src/utils/hooks/get'
import ShouldLogin from '@/src/components/modules/user/errors/shouldLogin'
import { useUserContext } from '@/src/utils/user/provider'

const SearchByEmailComponent = ({ data }) => {
    const [state, setState] = useState(data)
    const user = useUserContext()

    if (!user) {
        return (
            <Container xl css={{ mb: "$10" }}>
                <ShouldLogin />
            </Container>
        )
    }

    return (
        <Container xl css={{ mb: "$10" }}>
            <Grid.Container gap={2}>
                <Grid xs={12} md={3} >
                    <SideBar selected="searchByEmail" />
                </Grid>
                <Grid xs={12} md={9}>
                    <SearchByEmailModule data={data} state={state} setState={setState} />
                </Grid>
            </Grid.Container>
        </Container>
    )
}

const SearchByEmailPage = ({ data }) => {
    return (
        <Page>
            <SearchByEmailComponent data={data}/>
        </Page>
    )
}

export default SearchByEmailPage

export async function getServerSideProps(ctx) {
    return {
        props: {
            data: await Get(`/${ctx?.locale}/user/find?limit=100000`).then(r => r.data).catch(() => [])
        }
    }
}