import Icon from "@/src/components/ui/icons"
import Post from "@/src/utils/hooks/post"
import { Button, Grid, Loading, Text, Textarea } from "@nextui-org/react"
import { useState } from "react"
import jsCookie from 'js-cookie'
import { toast } from "react-toastify"
import { useUserContext } from "@/src/utils/user/provider"
import { useRouter } from "next/router"

const WriteComment = ({ data, isResponse, comment_id, comments, setComments, ...htmlProps }) => {
    const [state, setState] = useState("")
    const [isSubmiting, setSubmiting] = useState(false)
    const user = useUserContext()
    const router = useRouter()

    const publish = () => {
        const body = {}
        setSubmiting(true)
        if (isResponse) {
            body.response = state
            body.comment_id = comment_id
        } else {
            body.comment = state
        }

        Post(`/${router?.locale}/products/product/${data?._id}/comment`, body, {
            headers: { sldtoken: jsCookie.get('sldtoken') }
        }).then(res => {
            toast(res.data.msg)
            setState("")
            setSubmiting(false)

            if (isResponse) {
                setComments(comments.map(c => {
                    if (c?._id === comment_id) {
                        c.response = state
                    }
                    return c
                }))

            } else {
                setComments([...comments, {
                    comment: state,
                    createdAt: new Date(),
                    user: {
                        _id: user._id,
                        name: user.name
                    }
                }])
            }
        }).catch(err => {
            setSubmiting(false)
            if (err.response) {
                return toast(err.response.data.msg)
            }
            return toast("hubo un error de nuestro lado")
        })
    }

    return (
        <Grid.Container direction="column">
            <Textarea
                label={<Text weight="bold">
                    {
                        isResponse ? "Responde el comentario" : "Escribe un comentario"
                    }
                </Text>}
                placeholder={isResponse ? "Escribe aqui tu respuesta" : "Escribe aqui cualquier consulta que tengas al vendedor"}
                value={state}
                onChange={(e) => setState(e.target.value)}
                {...htmlProps}
            />
            <Grid.Container justify="flex-end" css={{ mt: 10 }}>
                <Button
                    auto
                    disabled={isSubmiting}
                    iconRight={isSubmiting ? <Loading type="points" color="currentColor" /> : <Icon id="send" color="white" />}
                    onPress={publish}>
                    {isResponse ? "Responder" : "Enviar"}
                </Button>
            </Grid.Container>
        </Grid.Container>
    )
}
export default WriteComment