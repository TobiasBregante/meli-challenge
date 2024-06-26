import { Button, Grid } from "@nextui-org/react";
import Icon from '../../ui/icons';
import { addToCart } from '@/src/context/cartContext';

const CheckoutPro = ({ data }) => {
    return (
        <Grid.Container>
            <Button
                size={'md'}
                auto
                shadow
                color={'gradient'}
                css={{ w: "100%", mb: 10 }}
                onPress={() => addToCart(data)}>
                Agregar al carro <Icon css={{ ml: 10 }} color='$white' id="shopping_cart" />
            </Button>
        </Grid.Container>
    )
}

export default CheckoutPro