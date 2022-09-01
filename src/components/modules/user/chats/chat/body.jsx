import timeago from "@/src/utils/timeago"
import { useUserContext } from "@/src/utils/user/provider"

const { Grid, Button, Text, Card } = require("@nextui-org/react")

const UserChatBody = ({ data, globalData }) => {
    const SortByDate = data.sort((a, b) => new Date(a.date) - new Date(b.date))
    const user = useUserContext()

    const isMyMsg = (is) => {
        //is the brand view ?
        if (globalData.user._id != user._id) {
            //the msg is from the brand ?
            if (is) {
                return true
            } else {
                return false
            }
        }
        //the msg is from the brand ?
        if (is) {
            return false
        } else {
            return true
        }
    }

    return (
        <Grid.Container css={{ maxH: "67vh", maxW: "100%", overflowY: "scroll" }}>
            {
                SortByDate.map((message, i) => (
                    <Grid key={i} xs={12}>
                        <Grid.Container justify={isMyMsg(message.isFromBrand) ? "flex-end" : "flex-start"} css={{ my: 5, }}>
                            <Text variant="flat" auto css={{
                                maxW: "80%",
                                whiteSpace: "pre-wrap",
                                bg: isMyMsg(message.isFromBrand) ? "$primary" : "$blue500",
                                p: 10,
                                borderRadius: 16,
                                color: "white"
                            }}>
                                {message.message}
                                <Grid.Container justify="flex-end">
                                    <Text color="white">
                                        {
                                            timeago(message.date)
                                        }
                                    </Text>
                                </Grid.Container>
                            </Text>
                        </Grid.Container>
                    </Grid>
                ))
            }
        </Grid.Container>
    )
}

export default UserChatBody