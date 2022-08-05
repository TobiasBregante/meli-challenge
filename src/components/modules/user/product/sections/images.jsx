import Icon from "@/src/components/ui/icons"
import { Card, Grid, Image, Text } from "@nextui-org/react"
import { FileUploader } from "react-drag-drop-files"

const ImagesSection = ({ state, setState }) => {

    const addImg = (e) => {

        const flArray = Array.from(e)

        //TRELLO: Add limit of 5 photos for non-premiun users
        setState({
            ...state,
            imgs: {
                error: "",
                value: [...state.imgs.value, ...flArray].slice(0,5)
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
                <FileUploader handleChange={addImg} multiple={true} name="file" types={["jpg", "png"]} >
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
                                    <Image
                                        src={URL.createObjectURL(img)}
                                        width={100}
                                        height={100}
                                        className="rounded-16"
                                        alt="a" />
                                    <Icon id="delete" css={{position: "absolute", zIndex:999, right:5, top:5, cursor: "pointer",bg:"white"}} className="rounded-8"  onClick={removeImg(i)} />
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