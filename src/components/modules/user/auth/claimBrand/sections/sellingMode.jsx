import { Checkbox, Grid, Text } from "@nextui-org/react"
import { Fragment } from "react"


const SellingMode = ({ isWholesaleAndRetail, onChange }) => {
    return (
        <Fragment>
            <Text h4 >
                ¿De que manera venderas?
            </Text>
            <Grid.Container>
                <Checkbox
                    label="solo por mayor"
                    isSelected={isWholesaleAndRetail == false}
                    onChange={onChange(false)}
                    css={{mr:15}} />

                <Checkbox
                    label="por mayor y menor"
                    isSelected={isWholesaleAndRetail == true}
                    onChange={onChange(true)} />
            </Grid.Container>
        </Fragment>
    )
}

export default SellingMode