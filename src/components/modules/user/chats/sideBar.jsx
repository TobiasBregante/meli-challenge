import timeago from "@/src/utils/timeago"
import { useUserContext } from "@/src/utils/user/provider"
import { Card, Grid, Text } from "@nextui-org/react"
import Image from "next/image"

const UserSideBar = ({ data, chatSelected, setChatSelected }) => {

    const user = useUserContext()

    const dataSorted = data.sort((a,b)=>new Date(a[a?.messages?.length -1 ]?.date) - new Date(b[b?.messages?.length -1 ]?.date))

    return (
        <Card>
            <Grid.Container css={{ overflowY: "auto", height:"90vh", overflowX:"hidden" }}>
                {
                    dataSorted.map((chat, i) => (
                        <Grid xs={12} key={i}>
                            <Grid.Container  gap={1} css={{
                                py: 10,
                                px: 10,
                                bg: i == chatSelected ? "$gray300" : "",
                                cursor: "pointer"
                            }} onClick={() => setChatSelected(i)}>
                                <Grid>
                                    <div>
                                        <Image
                                            src={`/img/${chat.user.img}.jpg`}
                                            width={50}
                                            height={50}
                                            alt="bg"
                                            className="rounded-circle " />
                                    </div>
                                </Grid>

                                <Grid >
                                    <Grid.Container direction="column" >
                                        <Text h4 weight="light">
                                            {
                                            chat.user._id == user._id ? chat.user.name : chat.brand.brandName}
                                        </Text>
                                        <Text small>
                                            {timeago(chat.messages[chat.messages.length - 1].date)}
                                        </Text>
                                    </Grid.Container>
                                </Grid>
                            </Grid.Container>
                        </Grid>
                    ))
                }
            </Grid.Container>
        </Card>
    )
}


export default UserSideBar