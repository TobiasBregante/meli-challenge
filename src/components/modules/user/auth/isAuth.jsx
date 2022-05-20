import Icon from "@/ui/icons"
import Button from "@/ui/buttons"
import Text from "@/ui/texts"
const IsAuth = ({user})=>{
    if (user) {
        return null
    }
    return (
        <Button color="white">
            <Text className="d-none d-sm-block">
                Ingresar
            </Text>
            <Icon id="person"/>
        </Button>
    )

}

export default IsAuth