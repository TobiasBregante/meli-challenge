import Text from "@/ui/texts";
import OptionGroup from '@/components/modules/user/auth/signup/assets/optionGroup';

const AccountType = ({state,...htmlProps}) => {
    return (
        <>
            <Text tag="h4">
                ¿Qué te gustaria ser?
            </Text>
            <div className="d-flex mb-4">
                <OptionGroup
                    text="Comprador/a"
                    icon="shopping_cart"
                    isSelected={state.isSeller == false}
                    value={false}
                    {...htmlProps} />
                <OptionGroup
                    text="Vendedor/a"
                    icon="store"
                    isSelected={state.isSeller == true}
                    value={true}
                    {...htmlProps} />
            </div>
        </>
    )
}

export default AccountType;