import Icon from "@/ui/icons"
import Button from "@/ui/buttons"
import Text from "@/ui/texts"
import Link from "next/link"
import {useUserContext} from "@/utils/user/provider"
import {useRouter} from 'next/router'
import UserAvatar from "@/components/modules/user/avatar"

const IsAuth = () => {
    const router = useRouter()
    if (useUserContext()) {
        return <UserAvatar/>
    }
  
    return (
        <Link href={`/./user/auth/signin?redirect=${router.asPath}`} passHref>
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