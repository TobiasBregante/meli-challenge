import Button from '@/src/components/ui/buttons'
import Icon from '@/src/components/ui/icons'
import Text from '@/ui/texts'
const ShouldLogin = () => (
    <div className="d-flex flex-column mt-4">
        <div className="container d-flex  justify-content-center">
            <Text tag="h2">
                Debes iniciar sesión para ver esto
            </Text>
        </div>
        <div className="d-flex justify-content-center">
            <Button color="light">
                Ingresar
                <Icon id="person" />
            </Button>
        </div>
    </div>
)
export default ShouldLogin