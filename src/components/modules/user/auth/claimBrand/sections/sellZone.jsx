import OptionGroup from '@/components/modules/user/auth/signup/assets/optionGroup';
import { Grid, Text } from "@nextui-org/react";

const SellZone = ({ zone, ...htmlProps }) => {

    return (
        <>
            <Text h4>
                ¿Donde planeas vender?
            </Text>
            <Grid.Container gap={2}>
                <Grid>
                    <OptionGroup
                        text="Online"
                        icon="language"
                        isSelected={zone.value == "online"}
                        value={"online"}
                        {...htmlProps} />
                </Grid>

            </Grid.Container>
            <Text small color="error">
                {zone.error}
            </Text>
        </>
    )
}

export default SellZone