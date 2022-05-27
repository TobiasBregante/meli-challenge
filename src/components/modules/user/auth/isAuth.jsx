import Icon from "@/ui/icons"
import Button from "@/ui/buttons"
import Text from "@/ui/texts"
import Link from "next/link"
import {useUserContext} from "@/utils/user/provider"

const IsAuth = () => {
    if (useUserContext()) {
        return null
    }
    return (
        <Link href="/./user/auth/signin" passHref>
            <a className="text-decoration-none">
                <Button color="white">
                    <Text className="d-none d-sm-block">
                        Ingresar
                    </Text>
                    <Icon id="person" />
                </Button>
            </a>
        </Link>
    )

}

export default IsAuth