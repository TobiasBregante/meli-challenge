import ProductCard from '@/src/components/modules/products/cards/normal';
import Icon from '@/ui/icons';
import { useState } from 'react'
import { Grid, Text } from '@nextui-org/react';

const CarouselTitle = ({ title, showSeeMore, link }) => {
    return (
        <Grid.Container css={{ mt: 10 }}>
            <Text h3>
                {title}
            </Text>
            {
                showSeeMore &&
                <>
                    <a href={link || "/./"}>
                        <Text css={{ pt: 3, ml: 10 }} color="primary">
                            Ver mas
                        </Text>
                    </a>
                    <Icon id="chevron_right" css={{ pt: 8 }} color="primary" />
                </>
            }
        </Grid.Container>
    )

}

const UnorderedList = ({ title, data, showSeeMore, breakpoints, link }) => {

    return (
        <>
            <CarouselTitle title={title} showSeeMore={showSeeMore} link={link}/>
            <Grid.Container gap={1}>
                {
                    data.map((cardData, cardI) => (
                        <Grid key={cardI} xs={breakpoints?.xs ? breakpoints.xs : 6} sm={breakpoints?.sm ? breakpoints.sm : 4} md={breakpoints?.md ? breakpoints.md : 3} lg={breakpoints?.lg ? breakpoints.lg : 2}  >
                            <ProductCard data={cardData} />
                        </Grid>
                    ))
                }
            </Grid.Container>
        </>
    );
}

export default UnorderedList;