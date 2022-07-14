import Icon from "@/ui/icons"
import Link from "next/link"
import { useUserContext } from "@/utils/user/provider"
import UserAvatar from "@/components/modules/user/avatar"
import { Button } from "@nextui-org/react"

const IsAuth = () => {
    const user = useUserContext()
    if (user) {
        return <UserAvatar />
    }

    return (
        <Link href={`/./user/auth/signin`}>
            <a>
                <Button auto css={{ bg: "$white", color: "$black", "@smMax": { display: "none" } }} icon={<Icon id="person" />} >
                    Ingresar
                </Button>
                <Button auto css={{ bg: "$white", color: "$black", "@sm": { display: "none" } }} icon={<Icon id="person" />} />
            </a>
        </Link>
    )

}

export default IsAuth