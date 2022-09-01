import { Card, Grid } from "@nextui-org/react"
import UserChatBody from "./body"
import UserChatHeader from "./header"
import UserChatInput from "./input"

const UserChat = ({ data}) => {
    return (
        <Card variant="flat" css={{ bg: "$white" }}>
            <Card.Header>
                <UserChatHeader data={data} />
            </Card.Header>
            <Card.Divider/>
            <Card.Body >
                <UserChatBody data={data.messages} globalData={data} />
            </Card.Body>
            <Card.Divider/>
            <Card.Footer>
                <UserChatInput data={data}/>
            </Card.Footer>
        </Card>
    )
}

export default UserChat