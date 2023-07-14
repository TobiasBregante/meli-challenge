import UserSideBar from "@/src/components/modules/user/chats/sideBar"
import Page from "@/src/components/wrapper/page"
import { Container, Grid, Text } from "@nextui-org/react"
import sampleChat from '@/utils/sampleChat'
import { useState } from "react"
import UserChat from "@/src/components/modules/user/chats/chat"
import Get from "@/src/utils/hooks/get"
import useSWR from "swr"
import jsCookie from 'js-cookie'
import { useRouter } from "next/router"

const fetcher = locale => Get(`/${locale}/chats/myChats`, {
    headers: {
        sldtoken: jsCookie.get("sldtoken")
    }
}).then(res => res.data)

const Chats = () => {
    const [chatSelected, setChatSelected] = useState(0)
    const router = useRouter()

    const { data, error } = useSWR('/', () => fetcher(router?.locale),{refreshInterval: 1000})

    if (!data) {
        return (
            <Page>
                <Container fluid>
                    <Grid.Container gap={1}>
                        <Grid xs={0} md={4} lg={3}>
                            <UserSideBar data={[]} chatSelected={chatSelected} setChatSelected={setChatSelected} />
                        </Grid>
                        <Grid xs={12} md={8} lg={9}>
                            <Text h2>
                                Cargando conversaciones
                            </Text>
                        </Grid>
                    </Grid.Container>
                </Container>
            </Page>
        )
    }

    return (
        <Page>
            <Container fluid>
                <Grid.Container gap={1}>
                    <Grid xs={0} md={4} lg={3}>
                        <UserSideBar data={data} chatSelected={chatSelected} setChatSelected={setChatSelected} />
                    </Grid>
                    <Grid xs={12} md={8} lg={9}>
                        <UserChat data={data[chatSelected]}/>
                    </Grid>
                </Grid.Container>
            </Container>
        </Page>
    )
}

export default Chats

export async function getServerSideProps(ctx) {
    return {
        props: {
            data: sampleChat()
        }
    }
}