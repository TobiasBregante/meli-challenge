import OptionGroup from '@/components/modules/user/auth/signup/assets/optionGroup';
import { Grid, Text } from '@nextui-org/react';
import { Fragment } from 'react';

const AccountType = ({ state, ...htmlProps }) => {
    return (
        <Fragment>
            <Text h3 weight="normal">
                ¿Qué te gustaria ser?
            </Text>
            <Grid.Container gap={2}>
                <Grid>
                    <OptionGroup
                        text="Comprador/a"
                        icon="shopping_cart"
                        isSelected={state.isSeller == false}
                        value={false}
                        {...htmlProps} />
                </Grid>
                <Grid>
                    <OptionGroup
                        text="Vendedor/a"
                        icon="store"
                        isSelected={state.isSeller == true}
                        value={true}
                        {...htmlProps} />
                </Grid>
            </Grid.Container>
        </Fragment>
    )
}

export default AccountType;