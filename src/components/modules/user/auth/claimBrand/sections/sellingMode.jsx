import Text from '@/ui/texts'
import Checkbox from '@/src/components/ui/inputs/checkbox'

const SellingMode = ({isWholesaleAndRetail,onChange}) => {
    return (
        <>
            <Text tag="h5">
                ¿De que manera venderas?
            </Text>
            <div className="d-flex">
                <Checkbox
                    label="por menor"
                    size={6}
                    className="me-4"
                    checked={isWholesaleAndRetail==false}
                    onChange={onChange(false)} />

                <Checkbox
                    label="por mayor y menor"
                    size={6}
                    checked={isWholesaleAndRetail==true}
                    onChange={onChange(true)} />
            </div>
        </>
    )
}

export default SellingMode