import ProductCard from '@/src/components/modules/products/cards/normal';
import Icon from '@/ui/icons';
import { useState } from 'react'
import { Grid, Text } from '@nextui-org/react';

const CarouselTitle = ({ title }) => {
    return (
        <Grid.Container css={{ mt: 10 }}>
            <Text h3>
                {title}
            </Text>
            <Text css={{ pt: 3, ml: 10 }} color="primary">
                Ver mas

            </Text>
            <Icon id="chevron_right" css={{ pt: 8 }} color="primary" />
        </Grid.Container>
    )

}

const UnorderedList = ({ title, data }) => {

    return (
        <>
            <CarouselTitle title={title} />
            <Grid.Container gap={1}>
                {
                    data.map((cardData, cardI) => (
                        <Grid key={cardI} lg={2} >
                            <ProductCard data={cardData} />
                        </Grid>
                    ))
                }
            </Grid.Container>
        </>
    );
}

export default UnorderedList;