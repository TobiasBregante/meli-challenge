import Icon from "@/src/components/ui/icons"
import { Button, Card, Grid, Input, Loading, Text } from "@nextui-org/react"
import ImageSelector from './assets/images'
import { useState } from "react"
import Post from "@/src/utils/hooks/post"
import jsCookie from 'js-cookie'
import { toast } from "react-toastify"

const   PopupForm = ({ website }) => {
    const [state, setState] = useState({
        link: website.popup.link,
        img: website.popup.img
    }),
        [isSubmiting, setSubmiting] = useState(false)
    const handleImg = (e) => {
        setState({
            ...state,
            img: e
        })
    }
    const handleLink = (e) => {
        setState({
            ...state,
            link: e.target.value
        })
    }

    const submit = () => {

        const update = (img_id) => {
            Post("website/update", {
                popup: {
                    link: state.link,
                    img: img_id
                }
            }, {
                headers: {
                    sldtoken: jsCookie.get("sldtoken")
                }
            }).then(res => {
                toast(res.data.msg)
            }).catch(err => {
                if (err.response) {
                    return toast(err.response.data.msg)
                }
                return toast("Ocurrio un error de nuestro lado")
            })
        }

        if (typeof state.img === "object") {
            let formImage = new FormData();
            formImage.append("file", state.img)

            Post("products/addImage", formImage, {
                headers: {
                    sldtoken: jsCookie.get("sldtoken"),
                    "Content-Type": "multipart/form-data"
                }
            }).then(res => {
                return update(res.data.img_id)
            })
                .catch(err => {
                    console.error(err);
                    setSubmiting(false)
                    toast("Ocurrio un error de nuestro lado al subir las imagenes")
                    return false
                })
        } else {
            update(state.img)
        }

    }
    return (
        <Card>
            <Card.Header>
                <Grid.Container justify="center">
                    <Text h3>
                        Cambiar PopUp de la pagina de inicio
                    </Text>
                </Grid.Container>
            </Card.Header>
            <Card.Body>
                <Input
                    label="Link"
                    placeholder="Pega aqui una url"
                    contentLeft={<Icon id="link" />}
                    value={state.link}
                    onChange={handleLink}
                    css={{ mb: 20 }} />
                <ImageSelector state={state.img} setState={handleImg} single />
            </Card.Body>
            <Card.Footer>
                <Grid.Container justify="flex-end">
                    <Button auto
                        icon={isSubmiting ? <Loading type="points" color="currentColor" /> : <Icon id="upgrade" color="white" />}
                        disabled={isSubmiting}
                        onPress={submit}>
                        Actualizar
                    </Button>
                </Grid.Container>
            </Card.Footer>
        </Card>
    )
}

export default PopupForm