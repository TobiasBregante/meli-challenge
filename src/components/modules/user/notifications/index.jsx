import { useUserContext } from "@/utils/user/provider"
import Icon from "@/src/components/ui/icons"
import { useState } from "react";
import jsCookie from 'js-cookie'
import { useRouter } from "next/router";
import { Badge, Button, Collapse, Dropdown, Grid, Modal, Text } from "@nextui-org/react";
import timeago from "@/src/utils/timeago";
import Get from "@/src/utils/hooks/get";

const UserNotifications = () => {
    const router = useRouter()
    const [isOpen, setOpen] = useState(false)
    const user = useUserContext()

    if (!user || !user.notifications) {
        return null
    }

    
    const newNotifications = user.notifications.filter((notification) => notification.isReaded == false)

    const readNotifications = ()=>{
        Get("user/me/readNotifications",{
            headers: {
                sldtoken: jsCookie.get("sldtoken")
            }
        }).catch(err=>{
            console.log(err);
        })
    }
    
    const openNotifications = ()=>{
        setOpen(true)
        readNotifications()
    }

    const openLink = url=>()=>{
        router.push(url)
    }

    return (
        <>
            <Badge content={newNotifications.length} color="error" isInvisible={newNotifications.length === 0}>
                <Button auto
                    icon={<Icon id="notifications" css={{ mt: 0 }} />}
                    onPress={openNotifications}
                    css={{ bg: 'white' }} />
            </Badge>
            <Modal open={isOpen} onClose={() => setOpen(false)} width={600}>
                <Modal.Body>
                    {user?.notifications.map((notification) => (
                        <Collapse key={notification._id} title={notification.title} subtitle={timeago(notification.date)}>
                            <Text>
                                {notification.description}
                            </Text>
                            {
                                notification.link &&
                                <Grid.Container justify="flex-end">
                                    <Button auto iconRight={<Icon id="arrow_forward" color="white" />} onPress={openLink(notification.link)}>
                                        Ir
                                    </Button>
                                </Grid.Container>
                            }
                        </Collapse>
                    )).reverse()}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default UserNotifications