import Icon from '@/ui/icons';
import { Grid, Text } from '@nextui-org/react';
import BrandCard from '../card';

const CarouselTitle = ({ title, link }) => {
    return (
        <Grid.Container css={{ mt: 10 }}>
            <Text h3>
                {title}
            </Text>
            {
                link &&
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

const BrandsList = ({ title, data, breakpoints, link }) => {

    return (
        <>
            <CarouselTitle title={title}  link={link}/>
            <Grid.Container gap={1}>
                {
                    data.map((cardData, cardI) => (
                        <Grid key={cardI} xs={breakpoints?.xs ? breakpoints.xs : 12} sm={breakpoints?.sm ? breakpoints.sm : 6} md={breakpoints?.md ? breakpoints.md : 4} lg={breakpoints?.lg ? breakpoints.lg : 3}  >
                            <BrandCard data={cardData} />
                        </Grid>
                    ))
                }
            </Grid.Container>
        </>
    );
}

export default BrandsList;