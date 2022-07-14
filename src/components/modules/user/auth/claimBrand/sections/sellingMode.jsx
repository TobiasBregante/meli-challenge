import { Checkbox, Grid, Text } from "@nextui-org/react"


const SellingMode = ({ isWholesaleAndRetail, onChange }) => {
    return (
        <>
            <Text tag="h5">
                ¿De que manera venderas?
            </Text>
            <Grid.Container>
                <Checkbox
                    label="por menor"
                    checked={isWholesaleAndRetail == false}
                    onChange={onChange(false)}
                    css={{mr:15}} />

                <Checkbox
                    label="por mayor y menor"
                    checked={isWholesaleAndRetail == true}
                    onChange={onChange(true)} />
            </Grid.Container>
        </>
    )
}

export default SellingMode