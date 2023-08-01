import Page from '@Page'
import { Container, Grid } from '@nextui-org/react'
import SideBar from '@/src/components/modules/admin/sidebar'
import SearchByPhoneModule from '@/src/components/modules/search/byPhone'
import { useEffect, useState } from 'react'
import Get from '@/src/utils/hooks/get'
import ShouldLogin from '@/src/components/modules/user/errors/shouldLogin'
import { useUserContext } from '@/src/utils/user/provider'

const SearchByPhoneComponent = ({ data }) => {
    const [state, setState] = useState([])
    const user = useUserContext()
    
    useEffect(() => {
        setState(data)
    }, [user])

    useEffect(() => {
        setState(data)
    }, [data])


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
                    <SideBar selected="searchByPhone" />
                </Grid>
                <Grid xs={12} md={9}>
                    <SearchByPhoneModule data={data} state={state} setState={setState} />
                </Grid>
            </Grid.Container>

        </Container>
    )
}

const SearchByPhonePage = ({ data }) => {
    return (
        <Page>
            <SearchByPhoneComponent data={data}/>
        </Page>
    )
}

export default SearchByPhonePage

export async function getServerSideProps(ctx) {
    return {
        props: {
            data: await Get(`/${ctx?.locale}/user/find?limit=100000`).then(r => r.data).catch(() => [])
        }
    }
}