import Text from "@/ui/texts";
import OptionGroup from '@/components/modules/user/auth/signup/assets/optionGroup';

const SellLocation = ({zone,...htmlProps}) => {

    return (
        <>
            <Text tag="h5">
                ¿Donde planeas vender?
            </Text>
            <div className="d-flex mb-4">
                <OptionGroup
                    text="La salada"
                    icon="pin_drop"
                    isSelected={zone == "la salada"}
                    value={"la salada"}
                    {...htmlProps} />
                <OptionGroup
                    text="Flores"
                    icon="pin_drop"
                    isSelected={zone == "flores"}
                    value={"flores"}
                    {...htmlProps} />
                <OptionGroup
                    text="Online"
                    icon="language"
                    isSelected={zone == "online"}
                    value={"online"}
                    {...htmlProps} />
            </div>
        </>
    )
}

export default SellLocation