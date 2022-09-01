import Icon from '@/src/components/ui/icons';
import Stars from '@/src/components/ui/stars';
import timeago from '@/src/utils/timeago';
import { useUserContext } from '@/src/utils/user/provider';
import { Avatar, Button, Card, Grid, Modal, Text } from '@nextui-org/react';
import Image from 'next/image';
import { useState } from 'react';
import WriteComment from './write';

const Comment = ({ data, canReply }) => {

    return (
        <Grid.Container direction="column" css={{my:10}}>
            <Grid>
                <Grid.Container justify="space-between">
                    <Grid>
                        <Grid.Container>
                            <Avatar
                                src={`https://res.cloudinary.com/lightweightpipeline/${data.user.img === undefined ? "avatar" : data.user.img}`}
                            />
                            <Text weight="bold" css={{ ml: 10 }}>
                                {data.user.name}
                            </Text>
                        </Grid.Container>
                    </Grid>
                    <Text tag="small" className="text-gray-800 me-2">
                        {timeago(data.createdAt)}
                    </Text>
                </Grid.Container>
            </Grid>
            <Grid>

                <Text >
                    {data.comment}
                </Text>
                <Grid.Container justify="flex-end">
                    {
                        (canReply && data.isOwnedBy == user._id) &&
                        <Button color="info-400" className="btn-nano me-1 px-2 text-white">
                            <Icon id="reply" className="fs-5 " />
                            Responder
                        </Button>
                    }
                </Grid.Container>
                {
                    data.response &&
                    <Comment data={data.response} canReply={false} />
                }

            </Grid>

        </Grid.Container>
    )
}


const ProductComments = ({ data }) => {
    const [limit, setLimit] = useState(3)
    const user = useUserContext()

    return (
        <>
            <Card>
                <Card.Body>
                    <Text tag="h3" className="d-flex flex-row">
                        <Icon id="forum" className="me-2 mt-01" />
                        Comentarios
                    </Text>
                    {
                        data.comments.slice(0, limit).map((comment, commentIndex) => (
                            <div className="my-2" key={commentIndex}>
                                <Comment data={comment} canReply={comment.response == undefined && data.isOwnedBy == user._id} />
                            </div>
                        ))
                    }
                    {
                        data.comments.length > 3 &&
                        <Grid.Container justify="center">
                            <Button color="gray" auto onClick={() => setLimit(limit == 3 ? 99999 : 3)}>
                                {
                                    limit == 3 ?
                                        <>
                                            <Icon id="arrow_drop_down" />
                                            Ver todos los comentarios
                                        </>
                                        :
                                        <>
                                            <Icon id="expand_less" />
                                            Ocultar comentarios
                                        </>
                                }
                            </Button>
                        </Grid.Container>
                    }
                    {
                        user &&
                        <WriteComment data={data} css={{mt:20}} />
                    }
                </Card.Body>
            </Card>
        </>
    )
}

export default ProductComments
