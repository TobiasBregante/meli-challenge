import Text from '@/ui/texts'
import Checkbox from '@/src/components/ui/inputs/checkbox'

const SellingMode = ({isRetail,isWholesale,onChange}) => {
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
                    checked={isRetail}
                    onChange={onChange("retail")} />

                <Checkbox
                    label="por mayor"
                    size={6}
                    checked={isWholesale}
                    onChange={onChange("wholesale")} />
            </div>
        </>
    )
}

export default SellingMode