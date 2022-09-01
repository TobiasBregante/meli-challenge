import Icon from "@/src/components/ui/icons"
import Post from "@/src/utils/hooks/post"
import { Button, Grid, Loading, Text, Textarea } from "@nextui-org/react"
import { useState } from "react"
import jsCookie from 'js-cookie'
import { toast } from "react-toastify"

const WriteComment = ({ data, isResponse, comment_id, ...htmlProps }) => {
    const [state, setState] = useState(""),
        [isSubmiting, setSubmiting] = useState(false)

    const publish = () => {
        const body = {}
        setSubmiting(true)
        if (isResponse) {
            body.response = state.response
            body.comment_id = comment_id
        }else{
            body.comment = state
        }
        Post(`products/product/${data._id}/comment`, body, {
            headers: { sldtoken: jsCookie.get('sldtoken') }
        }).then(res => {
            toast(res.data.msg)
            setState("")
            setSubmiting(false)
        }).catch(err => {
            setSubmiting(false)
            if (err.response) {
                return toast(err.response.data.msg)
            }
            return toast("hubo un error de nuestro lado")
        })
    }

    return (
        <>
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
                iconRight={isSubmiting ? <Loading type="points" /> : <Icon id="send" color="white" />}
                onPress={publish}>
                    Enviar
                </Button>
            </Grid.Container>
        </>
    )
}
export default WriteComment