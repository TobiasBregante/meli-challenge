import Icon from '@/src/components/ui/icons';
import sheds from '@/src/utils/user/brand/sheds';
import { Grid, Text } from '@nextui-org/react';
import LocationBuilder from '../../locationBuilder';

const ProductLocation = ({ data }) => {
    

    const MapGenerator = () => {
        if (data.zone == "la salada") {
            const shedFinder = sheds.find(e => e.shed == data.shed).map
            return <iframe src={shedFinder} width="100%" height="500px" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        }
        return null
    }
    return (
        <Grid.Container direction="column">
            <div id="location"></div>
            <Text tag="h3" className="d-flex flex-row p-3">
                <Icon id="pin_drop" className="me-2 mt-01" />
                Ubicación
            </Text>
            <Grid>
                <LocationBuilder data={data} />
            </Grid>
            
            <MapGenerator/>
            
        </Grid.Container>
    )
}

export default ProductLocation
