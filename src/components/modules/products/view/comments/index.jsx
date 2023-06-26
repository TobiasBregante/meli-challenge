import Icon from '@/src/components/ui/icons';
import Stars from '@/src/components/ui/stars';
import timeago from '@/src/utils/timeago';
import { useUserContext } from '@/src/utils/user/provider';
import { Avatar, Button, Card, Grid, Loading, Modal, Text } from '@nextui-org/react';
import { Fragment, useState } from 'react';
import WriteComment from './write';
import jsCookie from 'js-cookie'
import Post from '@/src/utils/hooks/post';
import { toast } from 'react-toastify';

const Comment = ({ data, canReply, productData, comments,setComments }) => {
    const user = useUserContext()
    const [isAnswering, setAnswering] = useState(false),
        [isSubmiting, setSubmiting] = useState(false)

    const removeById = () => {
        setSubmiting(true)
        Post(`products/product/${productData._id}/comment`, {
            removeBy_id: data._id
        }, {
            headers: { sldtoken: jsCookie.get('sldtoken') }
        }).then(res => {
            toast(res.data.msg)
            setSubmiting(false)
            setComments(comments.filter(comment => comment._id !== data._id))
        }).catch(err => {
            setSubmiting(false)
            if (err.response) {
                return toast(err.response.data.msg)
            }
            return toast("hubo un error de nuestro lado")
        })
    }

    const AnswerCommment = () => {
        if (canReply && !isAnswering) {
            return (
                <Button color="info-400" className="btn-nano me-1 px-2 text-white" onPress={() => setAnswering(true)}>
                    <Icon id="reply" className="fs-5 " />
                    Responder
                </Button>
            )
        }
        if (canReply && isAnswering) {
            return (
                <Grid xs={12}>
                    <WriteComment 
                    data={productData} 
                    css={{ mt: 20, }} 
                    isResponse={true} 
                    comment_id={data._id} 
                    setComments={setComments}
                    comments={comments}
                    />
                </Grid>
            )
        }
    }

    return (
        <Grid.Container direction="column" css={{ my: 10 }}>
            <Grid>
                <Grid.Container justify="space-between">
                    <Grid>
                        <Grid.Container>
                            <Avatar
                                src={`https://res.cloudinary.com/saladapp/${data?.user?.img === undefined ? "uO3wK0EqPoTvyU41rnxLTbuBYjy-k9bY" : data.user.img}`}
                            />
                            <Text weight="bold" css={{ ml: 10 }}>
                                {data?.user?.name}
                            </Text>
                        </Grid.Container>
                    </Grid>
                    <Text tag="small" className="text-gray-800 me-2" css={{ mr: 20 }}>
                        {timeago(data.createdAt)}
                    </Text>
                </Grid.Container>
            </Grid>
            <Grid>

                <Text >
                    {data.comment}
                </Text>
                <Grid.Container justify="flex-end">
                    <AnswerCommment />

                </Grid.Container>
                {
                    data.response &&
                    <Grid.Container justify="flex-end">
                        <Grid xs={11.6} css={{ bg: "$gray50", p: 10, borderRadius: 16 }}>
                            <Comment data={{
                                user: { img: productData?.brand?.img, name: productData.brand.brandName },
                                comment: data.response
                            }}
                                canReply={false}
                                productData={productData} />
                        </Grid>
                    </Grid.Container>
                }

            </Grid>
            <Grid.Container justify="flex-end">
                {
                    (productData.isOwnedBy == user._id && data.response != undefined) &&
                    <Button
                        disabled={isSubmiting}
                        icon={isSubmiting ? <Loading type="points" color="currentColor" /> : <Icon id="delete" color="white" />}
                        auto
                        color="error"
                        onPress={removeById}>
                        Eliminar comentario
                    </Button>
                }
            </Grid.Container>

        </Grid.Container>
    )
}


const ProductComments = ({ data }) => {
    const [limit, setLimit] = useState(3),
    [comments,setComments] = useState(data?.comments)
    const user = useUserContext()

    return (
        <Fragment>
            <Card id="comments">
                <Card.Body>
                    <Text tag="h3" className="d-flex flex-row">
                        <Icon id="forum" className="me-2 mt-01" />
                        Comentarios
                    </Text>
                    {
                        comments.slice(0, limit).map((comment, commentIndex) => (
                            <div className="my-2" key={commentIndex}>
                                <Comment

                                    data={comment}
                                    productData={data}
                                    canReply={comment?.response == undefined && data?.isOwnedBy == user?._id}
                                    setComments={setComments} 
                                    comments={comments}/>
                            </div>
                        ))
                    }
                    {
                        comments.length > 3 &&
                        <Grid.Container justify="center">
                            <Button color="gray" auto onClick={() => setLimit(limit == 3 ? 99999 : 3)}>
                                {
                                    limit == 3 ?
                                        <Fragment>
                                            <Icon id="arrow_drop_down" />
                                            Ver todos los comentarios
                                        </Fragment>
                                        :
                                        <Fragment>
                                            <Icon id="expand_less" />
                                            Ocultar comentarios
                                        </Fragment>
                                }
                            </Button>
                        </Grid.Container>
                    }
                    {
                        user &&
                        <WriteComment data={data} css={{ mt: 20 }} setComments={setComments} comments={comments}/>
                    }
                </Card.Body>
            </Card>
        </Fragment>
    )
}

export default ProductComments
