import Icon from "@/src/components/ui/icons"
import SetStars from "@/src/components/ui/stars/set"
import { Button, Grid, Loading, Modal, Text, Textarea } from "@nextui-org/react"
import { useState } from "react"
import jsCookie from 'js-cookie'
import { toast } from 'react-toastify'
import Post from "@/src/utils/hooks/post"

const WriteReview = ({ data, open, close }) => {
    const [rating, setRating] = useState(1),
        [review, setReview] = useState(""),
        [isSubmiting, setSubmiting] = useState(false)

    const handleOnChangeRating = (star) => {
        setRating(star + 1)
    }
    const handleOnChangeReview = (e) => {
        setReview(e.target.value)
    }

    const submit = () => {
        setSubmiting(true)
        Post(`products/product/${data._id}/review`, {
            rating: rating,
            review: review
        }, {
            headers: { sldtoken: jsCookie.get('sldtoken') }
        }).then(res => {
            toast(res.data.msg)
            setSubmiting(false)
            close()
        }).catch(err => {
            setSubmiting(false)
            if (err.response) {
                return toast(err.response.data.msg)
            }
            return toast("hubo un error de nuestro lado")
        })
    }
    return (
        <Modal open={open} onClose={close} width="600px">
            <Modal.Header>
                <Text h4>
                    Escribe tu opinion acerca de este producto
                </Text>
            </Modal.Header>
            <Modal.Body>
                <Grid.Container>
                    <SetStars rating={rating} onChange={handleOnChangeRating} />
                </Grid.Container>
                <Textarea
                    value={review}
                    onChange={handleOnChangeReview}
                    placeholder="Escribe aqui tu reseña" />

                <Grid.Container justify="flex-end">
                    <Button
                        auto
                        disabled={isSubmiting}
                        iconRight={isSubmiting ? <Loading type="points" color="currentColor" /> : <Icon id="cloud_upload" color="white" />}
                        onPress={submit}>
                        Publicar
                    </Button>
                </Grid.Container>
            </Modal.Body>
        </Modal>
    )
}

export default WriteReview