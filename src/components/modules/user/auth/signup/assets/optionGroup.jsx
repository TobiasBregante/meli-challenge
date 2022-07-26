import Icon from "@/src/components/ui/icons"
import { Card, Grid, Text } from "@nextui-org/react"

const OptionGroup = ({ value, text, icon, isSelected, onClick }) => (
    <Card onClick={() => onClick(value)} isPressable variant="flat" css={{bg:isSelected?"$primary":""}}>
        <Card.Body>
            <Grid.Container justify="center">
                <Icon id={icon} />
            </Grid.Container>
            <Text weight={600}>
                {text}
            </Text>
        </Card.Body>
    </Card>
)

export default OptionGroup