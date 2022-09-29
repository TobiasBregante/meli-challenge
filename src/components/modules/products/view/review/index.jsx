import Icon from '@/src/components/ui/icons';
import Stars from '@/src/components/ui/stars';
import timeago from '@/src/utils/timeago';
import { useUserContext } from '@/src/utils/user/provider';
import { Avatar, Button, Card, Grid, Loading, Modal, Text } from '@nextui-org/react';
import { useState } from 'react';
import WriteComment from './write';
import jsCookie from 'js-cookie'
import Post from '@/src/utils/hooks/post';
import { toast } from 'react-toastify';

const Review = ({ data, canReply, productData, reviews, setReviews }) => {
    const user = useUserContext()
    const [isSubmiting, setSubmiting] = useState(false)

    const removeById = () => {
        setSubmiting(true)
        Post(`products/product/${productData._id}/review`, {
            removeBy_id: data._id
        }, {
            headers: { sldtoken: jsCookie.get('sldtoken') }
        }).then(res => {
            toast(res.data.msg)
            setSubmiting(false)
            setReviews(reviews.filter(review => review._id !== data._id))
        }).catch(err => {
            setSubmiting(false)
            if (err.response) {
                return toast(err.response.data.msg)
            }
            return toast("hubo un error de nuestro lado")
        })
    }


    return (
        <Grid.Container direction="column" css={{ my: 10 }}>
            <Grid>
                <Grid.Container justify="space-between">
                    <Grid>
                        <Grid.Container>
                            <Avatar
                                src={`https://res.cloudinary.com/salada/${data.user?.img === undefined ? "avatar" : data.user.img}`}
                            />
                            <Text weight="bold" css={{ ml: 10 }}>
                                {data.user?.name}
                            </Text>
                            <Grid css={{ml:20}}>
                                <Stars rating={data.rating} />
                            </Grid>
                        </Grid.Container>

                    </Grid>

                    <Text tag="small" className="text-gray-800 me-2" css={{ mr: 20 }}>
                        {timeago(data.createdAt)}
                    </Text>
                </Grid.Container>
            </Grid>
            <Grid>

                <Text >
                    {data.review}
                </Text>

            </Grid>
            <Grid.Container justify="flex-end">
                {
                    (productData.isOwnedBy == user._id) &&
                    <Button
                        disabled={isSubmiting}
                        icon={isSubmiting ? <Loading type="points" color="currentColor" /> : <Icon id="delete" color="white" />}
                        auto
                        color="error"
                        onPress={removeById}>
                        Eliminar review
                    </Button>
                }
            </Grid.Container>

        </Grid.Container>
    )
}


const ProductReviews = ({ data }) => {
    const [limit, setLimit] = useState(3),
        [reviews, setReviews] = useState(data.reviews)
    const user = useUserContext()

    return (
        <>
            <Card id="reviews">
                <Card.Body>
                    <Text tag="h3" className="d-flex flex-row">
                        <Icon id="forum" className="me-2 mt-01" />
                        Reviews
                    </Text>
                    {
                        reviews.slice(0, limit).map((review, reviewIndex) => (
                            <div className="my-2" key={reviewIndex}>
                                <Review
                                    data={review}
                                    productData={data}
                                    setReviews={setReviews}
                                    reviews={reviews} />
                            </div>
                        ))
                    }
                    {
                        reviews.length > 3 &&
                        <Grid.Container justify="center">
                            <Button color="gray" auto onClick={() => setLimit(limit == 3 ? 99999 : 3)}>
                                {
                                    limit == 3 ?
                                        <>
                                            <Icon id="arrow_drop_down" />
                                            Ver todos los opiniones
                                        </>
                                        :
                                        <>
                                            <Icon id="expand_less" />
                                            Ocultar opiniones
                                        </>
                                }
                            </Button>
                        </Grid.Container>
                    }
                </Card.Body>
            </Card>
        </>
    )
}

export default ProductReviews
