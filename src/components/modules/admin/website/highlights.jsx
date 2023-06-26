import Icon from "@/src/components/ui/icons"
import { Button, Card, Grid, Input, Loading, Text } from "@nextui-org/react"
import ImageSelector from './assets/images'
import { Fragment, useState } from "react"
import Post from "@/src/utils/hooks/post"
import jsCookie from 'js-cookie'
import { toast } from "react-toastify"

const HighLightForm = ({ website }) => {
    const [state, setState] = useState(website.highlights || []),
    [isSubmiting, setSubmiting] = useState(false)
    const handleImg = (i) => (e) => {
        setState(state.map((x, si) => {
            if (si == i) {
                x = {
                    ...x,
                    img: e
                }
            }
            return x
        }))
    }
    const handleLink = (i) => (e) => {
        setState(state.map((x, si) => {
            if (si == i) {
                x = {
                    ...x,
                    link: e.target.value
                }
            }
            return x
        }))
    }
    const removeHighlight = (i) => () => {
        setState(state.filter((x, si) => si != i))
    }
    const addHighlight = () => {
        setState([...state, { link: "/", img: [] }])
    }


    const submit = () => {

        setSubmiting(true)
        const imgs = state.filter(x => typeof x.img === "object").map(async img => {
            let formImage = new FormData();
            formImage.append("file", img.img)

            return Post("products/addImage", formImage, {
                headers: {
                    sldtoken: jsCookie.get("sldtoken"),
                    "Content-Type": "multipart/form-data"
                }
            }).then(res => {
                return {
                    ...img,
                    img: res.data.img_id
                }
            })
                .catch(err => {
                    console.error(err);
                    setSubmiting(false)
                    toast("Ocurrio un error de nuestro lado al subir las imagenes")
                    return false
                })
        })

        Promise.all(imgs).then(data=>{
            Post("website/update", {
                highlights: [...state.filter(x => typeof x.img !== "object"),...data]
            }, {
                headers: {
                    sldtoken: jsCookie.get("sldtoken")
                }
            }).then(res => {
                toast(res.data.msg)
                setSubmiting(false)
            }).catch(err => {
                if (err.response) {
                    return toast(err.response.data.msg)
                }
                setSubmiting(false)
                return toast("Ocurrio un error de nuestro lado")
            })
        })
        .catch(err=>{
            console.error(err);
            setSubmiting(false)
            toast("Ocurrio un error de nuestro lado")
        })

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
                {
                    state.map((item, i) => (
                        <Fragment key={i}>
                            <Text b css={{ mt: 20 }}>
                                Banner {i + 1}
                            </Text>
                            <Input
                                label="Link"
                                placeholder="Pega aqui una url"
                                contentLeft={<Icon id="link" />}
                                value={item.link}
                                onChange={handleLink(i)}
                                css={{ mb: 20 }} />
                            <ImageSelector state={item.img} setState={handleImg(i)} single />
                            <Button color="error" icon={<Icon id="delete" color="white" />} onPress={removeHighlight(i)}>
                                Borrar
                            </Button>
                        </Fragment>
                    ))
                }
                <Button color="success" icon={<Icon id="add" color="white" />} css={{ mt: 20 }} onPress={addHighlight}>
                    Añadir nuevo banner
                </Button>
            </Card.Body>
            <Card.Footer>
                <Grid.Container justify="flex-end">
                    <Button 
                    auto 
                    icon={isSubmiting ? <Loading type="points" color="currentColor"/>:<Icon id="upgrade" color="white" />}
                    disabled={isSubmiting} 
                    onPress={submit}>
                        Actualizar
                    </Button>
                </Grid.Container>
            </Card.Footer>
        </Card>
    )
}

export default HighLightForm