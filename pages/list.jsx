import Get from "@/src/utils/hooks/get"
import { Grid, Card, Text } from "@nextui-org/react"
import Image from "next/legacy/image"
import { Fragment } from "react"

const List = ({ popularProducts }) => {
    const getRandomImg = max => Math.floor(Math.random() * max);

    return (
        <Fragment>
            <Grid.Container gap={1}>
                {
                    popularProducts?.length > 0 && popularProducts?.map((data, i) => (
                        <Grid xs={2} key={i}>
                            <Card variant="flat" css={{ bg: "$white", }} isHoverable className={`productCard`}>
                                <div className='containProductImageCard'>
                                    <div className='productImageCard'>
                                        <Image
                                            style={{ display: 'block', margin: 'auto' }}
                                            src={data?.imgs[getRandomImg(data?.imgs?.length - 1)]}
                                            alt={data?.title}
                                            layout='fill'
                                            objectFit='cover'
                                        />
                                    </div>
                                </div>
                                <Card.Body css={{ pb: 0, overflow: "hidden" }} className='productInfo'>
                                    <Text>
                                        <p>
                                            {data?.title?.length > 95 ? `${data?.title?.slice(0, 95)}...` : data?.title}
                                        </p>
                                    </Text>
                                    <Text>
                                        <p className='stock'>
                                            {data?.stock > 0 ? `${data?.stock} unidades` : 'Consultar disponibilidad'}
                                        </p>
                                    </Text>
                                </Card.Body>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid.Container>
        </Fragment>
    )
}

export default List

export async function getServerSideProps(ctx) {
    return {
        props: {
            popularProducts: await Get(`/${ctx?.locale}/products/find/query?popular=true&limit=1000`).then(r => r.data).catch(() => []),
        }, // will be passed to the page component as props
    }
}