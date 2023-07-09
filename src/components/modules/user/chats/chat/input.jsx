import Icon from "@/src/components/ui/icons"
import { Button, Grid, Input } from "@nextui-org/react"
import Post from '@/utils/hooks/post'
import { useUserContext } from "@/src/utils/user/provider"
import { useState } from "react"
import { toast } from "react-toastify"
import jsCookie from 'js-cookie'
import { useRouter } from "next/router"

const UserChatInput = ({ data }) => {
    const user = useUserContext()
    const [state, setState] = useState("")
    const router = useRouter()

    if (user == false) {
        return null
    }
    const sendMessage = () => {
        setState("")
        const body = {
            brand: data.brand._id,
            message: state
        }
        if (user.brand != undefined && user.brand._id == data.brand._id) {
            body.user = data.user._id
        }
        Post(`/${router?.locale}/chats/send`, body, {
            headers: {
                sldtoken: jsCookie.get("sldtoken")
            }
        })
            .then(res => {
                toast(res.data.msg)
            })
            .catch(err => {
                if (err.response) {
                    return toast(err.response.data.msg)
                }
                toast("Hubo un error")
            })
    }
    const handleEnter = (e) => {
        if (e.key == "Enter") {
            sendMessage()
        }
    }
    return (
        <Grid.Container gap={1}>
            <Grid xs={10} md={11.2}>
                <Input
                    placeholder="Escribe aqui tu mensaje"
                    value={state}
                    onChange={e => setState(e.target.value)}
                    css={{ w: "100%" }}
                    onKeyUp={handleEnter}
                />
            </Grid>
            <Grid xs={2} md={.8}>
                <Button
                    auto
                    iconRight={<Icon id="send" color="$white" />}
                    onPress={sendMessage}
                />
            </Grid>
        </Grid.Container>
    )
}

export default UserChatInput