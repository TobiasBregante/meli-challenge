import Icon from "@/src/components/ui/icons"
import { useUserContext } from "@/src/utils/user/provider"
import { Card, Grid, Text, Image as UiImage } from "@nextui-org/react"
import Image from "next/image"
import { FileUploader } from "react-drag-drop-files"
import { toast } from "react-toastify"

const ImagesSection = ({ state, setState }) => {
    const user = useUserContext()
    const addImg = (e) => {

        const flArray = Array.from(e)

        //TRELLO: Add limit of 5 photos for non-premiun users
        const images = user.status.isPremiun ? [...state.imgs.value, ...flArray].slice(0,10) : [...state.imgs.value, ...flArray].slice(0, 5)

        if (user.status.isPremiun){
            if ([...state.imgs.value, ...flArray].length > 9) {
                toast("Solo puedes subir 10 imagenes")
            }
        } else {
            if ([...state.imgs.value, ...flArray].length > 4) {
                toast(<a href="docs/subscriptions">
                    Pasate a premiun para subir mas fotos, hace click aca
                </a>)
            }
        }

        setState({
            ...state,
            imgs: {
                error: "",
                value: images
            }
        })
    }
    const removeImg = (id) => () => {
        setState({
            ...state,
            imgs: {
                error: "",
                value: state.imgs.value.filter((x, xI) => xI !== id)
            }
        })
    }

    return (
        <Grid.Container direction="column">
            <Grid>
                <Grid.Container>
                    <Icon id="image" />
                    <Text h4>
                        Imagenes
                    </Text>
                </Grid.Container>
            </Grid>
            <Grid css={{ border: "dashed 2px", p: "$10", textAlign: "center" }} className="rounded-16">
                <FileUploader handleChange={addImg} multiple={true} name="file" types={["jpg", "png", "jpeg", "avif", "webp", "jiff"]} >
                    <Text>
                        Arrastra y suelta tus fotos aqui o presiona aqui
                    </Text>
                </FileUploader>
            </Grid>
            <Card css={{ mt: 10 }} variant="flat">
                <Card.Body>
                    <Grid.Container gap={1}>
                        {
                            state.imgs.value.map((img, i) => (
                                <Grid key={i} className="rounded-12 animate__animated animate__bounceIn" >
                                    {
                                        typeof img === "object" ?
                                            <UiImage
                                                src={URL.createObjectURL(img)}
                                                width={100}
                                                height={100}
                                                className="rounded-16"
                                                alt="a" />
                                            :
                                            <div>
                                                <Image
                                                    src={`/${img}`}
                                                    width={100}
                                                    height={100}
                                                    className="rounded-16"
                                                    alt="a" />
                                            </div>
                                    }
                                    <Icon id="delete" css={{ position: "absolute", zIndex: 999, right: 5, top: 5, cursor: "pointer", bg: "white" }} className="rounded-8" onClick={removeImg(i)} />
                                </Grid>
                            ))
                        }
                    </Grid.Container>
                </Card.Body>
            </Card>
        </Grid.Container>
    )
}

export default ImagesSection