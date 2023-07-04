import ProductCard from '@/src/components/modules/products/cards/normal';
import Icon from '@/ui/icons';
import { Fragment, useState } from 'react'
import { Grid, Text } from '@nextui-org/react';
import Link from '@/src/utils/hooks/link';

const CarouselTitle = ({ title, showSeeMore, link }) => {
    return (
        <Grid.Container css={{ mt: 10 }}>
            <Text h3>
                {title}
            </Text>
            {
                showSeeMore &&
                <Fragment>
                    <Link href={link || "/"}>
                        <Text css={{ pt: 3, ml: 10 }} color="primary">
                            Ver mas
                        </Text>
                    </Link>
                    <Icon id="chevron_right" css={{ pt: 8 }} color="primary" />
                </Fragment>
            }
        </Grid.Container>
    )

}

const UnorderedList = ({ title, data, showSeeMore, link }) => {

    return (
        <Fragment>
            <CarouselTitle title={title} showSeeMore={showSeeMore} link={link}/>
            <Grid.Container gap={1}>
                {
                    data?.length > 0 && data?.map((cardData, cardI) => (
                        <Grid className='productCardFather' key={cardI} xs={12} sm={'auto'} md={'auto'} lg={'auto'}>
                            <ProductCard className='unorderedCard' data={cardData} />
                        </Grid>
                    ))
                }
            </Grid.Container>
        </Fragment>
    );
}

export default UnorderedList;