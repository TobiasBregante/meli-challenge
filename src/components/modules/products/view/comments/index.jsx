import Button from '@/src/components/ui/buttons';
import Card from '@/src/components/ui/cards';
import Icon from '@/src/components/ui/icons';
import Modal from '@/src/components/ui/modals';
import Stars from '@/src/components/ui/stars';
import timeago from '@/src/utils/timeago';
import Text from '@/ui/texts'
import Image from 'next/image';
import { useState } from 'react';

const Comment = ({ data, canReply }) => {

    return (
        <div className="d-flex flex-row ">

            <div className="me-3">
                <Image
                    src={`/img/avatars/${data.user.img}`}
                    className="rounded-circle"
                    width={100}
                    height={100}
                    alt={data.user.name} />
            </div>
            <div className="d-flex flex-column">
                <div className="d-flex flex-row justify-content-between flex-wrap">
                    <div>
                        <Text weight={500} className="text-dark me-2">
                            {data.user.name}
                        </Text>
                        <Text tag="small" className="text-gray-800 me-2">
                            {timeago(data.createdAt)}
                        </Text>
                    </div>
                    <div>
                        {
                            data.rating &&
                            <Stars rating={data.rating} />
                        }
                    </div>
                </div>
                <Text tag="small">
                    {data.text}
                </Text>
                <div className="d-flex flex-row justify-content-end">
                    {
                        (canReply) &&
                        <Button color="info-400" className="btn-nano me-1 px-2 text-white">
                            <Icon id="reply" className="fs-5 " />
                            Responder
                        </Button>
                    }
                    <Button color="danger-500" className="btn-nano text-white">
                        <Icon id="report" className="fs-5" />
                    </Button>
                </div>
                {
                    data.response &&
                    <Comment data={data.response} canReply={false} />
                }

            </div>

        </div>
    )
}


const AllProductComments = ({ data, isVisible, close }) => {
    return (
        <Modal isVisible={isVisible} close={close} outSideHide={true}>
            <Card className="overflow-auto mx-auto col-12 col-lg-6 flex-initial">
                    <div className="d-flex flex-column p-3">
                        <div className="d-flex flex-row justify-content-between">
                            <Text tag="h3" className="d-flex flex-row">
                                <Icon id="forum" className="me-2 mt-01" />
                                Comentarios
                            </Text>
                            <Icon id="close" onClick={() => close(false)} className="pointer" />
                        </div>
                        <div >
                            {
                                data.map((comment, commentIndex) => (
                                    <div className="my-2" key={commentIndex}>
                                        <Comment data={comment} canReply={comment.response == undefined} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </Card>
        </Modal>
    )
}


const ProductComments = ({ data }) => {
    const comments = [{
        user: {
            name: "Juan pedro garcia",
            img: "1.png"
        },
        createdAt: "Wed Jun 15 2022 19:11:47 GMT-0300 (Argentina Standard Time)",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo pariatur commodi sequi dicta minus, tempora necessitatibus tenetur vel alias nisi ullam exercitationem maiores velit assumenda quaerat esse. Ipsa, minus neque.",
        rating: 5,
        response: {
            user: {
                name: "Importaciones ambar",
                img: "3.jpg"
            },
            createdAt: "Wed Jun 15 2022 23:11:47 GMT-0300 (Argentina Standard Time)",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo pariatur commodi sequi dicta minus, tempora necessitatibus tenetur vel alias nisi ullam exercitationem maiores velit assumenda quaerat esse. Ipsa, minus neque.",
        }
    },
    {
        user: {
            name: "Carlos",
            img: "2.png"
        },
        createdAt: "Wed Jun 15 2022 12:11:47 GMT-0300 (Argentina Standard Time)",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo pariatur commodi sequi dicta minus, tempora necessitatibus tenetur vel alias nisi ullam exercitationem maiores velit assumenda quaerat esse. Ipsa, minus neque.",
        rating: 3,
    },
    {
        user: {
            name: "Carlos",
            img: "2.png"
        },
        createdAt: "Wed Jun 15 2022 12:11:47 GMT-0300 (Argentina Standard Time)",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo pariatur commodi sequi dicta minus, tempora necessitatibus tenetur vel alias nisi ullam exercitationem maiores velit assumenda quaerat esse. Ipsa, minus neque.",
        rating: 3,
    },
    {
        user: {
            name: "Carlos",
            img: "1.png"
        },
        createdAt: "Wed Jun 15 2022 12:11:47 GMT-0300 (Argentina Standard Time)",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo pariatur commodi sequi dicta minus, tempora necessitatibus tenetur vel alias nisi ullam exercitationem maiores velit assumenda quaerat esse. Ipsa, minus neque.",
        rating: 3,
    },
    {
        user: {
            name: "Carlos",
            img: "1.png"
        },
        createdAt: "Wed Jun 15 2022 12:11:47 GMT-0300 (Argentina Standard Time)",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo pariatur commodi sequi dicta minus, tempora necessitatibus tenetur vel alias nisi ullam exercitationem maiores velit assumenda quaerat esse. Ipsa, minus neque.",
        rating: 3,
    },
    {
        user: {
            name: "Juan pedro garcia",
            img: "1.png"
        },
        createdAt: "Wed Jun 15 2022 19:11:47 GMT-0300 (Argentina Standard Time)",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo pariatur commodi sequi dicta minus, tempora necessitatibus tenetur vel alias nisi ullam exercitationem maiores velit assumenda quaerat esse. Ipsa, minus neque.",
        rating: 5,
        response: {
            user: {
                name: "Importaciones ambar",
                img: "3.jpg"
            },
            createdAt: "Wed Jun 15 2022 23:11:47 GMT-0300 (Argentina Standard Time)",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo pariatur commodi sequi dicta minus, tempora necessitatibus tenetur vel alias nisi ullam exercitationem maiores velit assumenda quaerat esse. Ipsa, minus neque.",
        }
    },
    {
        user: {
            name: "Carlos",
            img: "1.png"
        },
        createdAt: "Wed Jun 15 2022 12:11:47 GMT-0300 (Argentina Standard Time)",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo pariatur commodi sequi dicta minus, tempora necessitatibus tenetur vel alias nisi ullam exercitationem maiores velit assumenda quaerat esse. Ipsa, minus neque.",
        rating: 3,
    },
    {
        user: {
            name: "Carlos",
            img: "1.png"
        },
        createdAt: "Wed Jun 15 2022 12:11:47 GMT-0300 (Argentina Standard Time)",
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo pariatur commodi sequi dicta minus, tempora necessitatibus tenetur vel alias nisi ullam exercitationem maiores velit assumenda quaerat esse. Ipsa, minus neque.",
        rating: 3,
    }]

    const [isShowingAllComment, setAllCommentState] = useState(false)

    return (
        <>
            <AllProductComments data={comments} isVisible={isShowingAllComment} close={setAllCommentState} />
            <div className="d-flex flex-column p-3">
                <Text tag="h3" className="d-flex flex-row">
                    <Icon id="forum" className="me-2 mt-01" />
                    Comentarios
                </Text>
                {
                    comments.slice(0, 3).map((comment, commentIndex) => (
                        <div className="my-2" key={commentIndex}>
                            <Comment data={comment} canReply={comment.response == undefined} />
                        </div>
                    ))
                }
                <div className="d-flex flex-row justify-content-center">
                    <Button color="primary-500" className="text-white" onClick={() => setAllCommentState(true)}>
                        <Icon id="arrow_drop_down" />
                        Ver todos los comentarios
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ProductComments
