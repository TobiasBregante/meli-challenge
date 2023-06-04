import Icon from "@/src/components/ui/icons"
import { Card, Grid, Text, Image as UiImage } from "@nextui-org/react"
import Image from "next/image"
import { FileUploader } from "react-drag-drop-files"

const ImagesSection = ({ state, setState, hideLabel }) => {
    const addImg = (e) => {

        const flArray = Array.from(e)

        setState(flArray[0])
    }

    const removeImg = () => {
        setState("")
    }

    return (
        <Grid.Container direction="column">
            {
                hideLabel == undefined &&
                <Grid>
                    <Grid.Container>
                        <Icon id="image" />
                        <Text h4>
                            Imagenes
                        </Text>
                    </Grid.Container>
                </Grid>
            }
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
                            state != "" && (
                                <Grid className="rounded-12 animate__animated animate__bounceIn" >
                                    {
                                        typeof state === "object" ?
                                            <UiImage
                                                src={URL.createObjectURL(state)}
                                                width={100}
                                                height={100}
                                                className="rounded-16"
                                                alt="a" />
                                            :
                                            <Image
                                                src={`/${state}`}
                                                width={100}
                                                height={100}
                                                className="rounded-16"
                                                alt="a" />
                                    }
                                    <Icon id="delete" css={{ position: "absolute", zIndex: 999, right: 5, top: 5, cursor: "pointer", bg: "white" }} className="rounded-8" onClick={removeImg} />
                                </Grid>)
                        }
                    </Grid.Container>
                </Card.Body>
            </Card>
        </Grid.Container>
    )
}

export default ImagesSection