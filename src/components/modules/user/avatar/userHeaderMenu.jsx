import Icon from "@/ui/icons"
import Link from "next/link"
import { useUserContext } from "@/utils/user/provider"
import { useRouter } from 'next/router'
import UserAvatar from "@/components/modules/user/avatar"
import { Button, Text } from "@nextui-org/react"

const IsAuth = () => {
    const router = useRouter()
    if (useUserContext()) {
        return <UserAvatar />
    }

    return (
        <Link href={`/./user/auth/signin?redirect=${router.asPath}`} passHref>
            <Button auto css={{ bg: "$white", color: "$black" }}>
                <Text css={{ "@smMax": { display: "none" } }}>
                    Ingresar
                </Text>
                <Icon id="person" />
            </Button>
        </Link>
    )

}

export default IsAuth