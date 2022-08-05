import { useUserContext } from "@/utils/user/provider"
import Icon from "@/src/components/ui/icons"
import { useState } from "react";
import jsCookie from 'js-cookie'
import { useRouter } from "next/router";
import { Button, Dropdown } from "@nextui-org/react";

const UserAvatar = () => {
    const router = useRouter()
    const [isOpen, setOpen] = useState(false)
    const user = useUserContext()

    const logout = () => {
        jsCookie.remove("sldtoken")
        router.reload()
    }

    const handleSelection = (e) => {
        if (e == "logout") {
            logout()
        }
    }


    return (
        <Dropdown>
            <Dropdown.Button icon={<Icon id="person" css={{ mt: 0 }} />} css={{ bg: 'white' }} />
            <Dropdown.Menu onAction={handleSelection}>
                <Dropdown.Item key="profile" icon={<Icon id="person" />}>Mi perfil</Dropdown.Item>
                {
                    user.isSeller &&
                    <Dropdown.Item key="subscriptions" icon={<Icon id="subscriptions" />}>Suscripción</Dropdown.Item>
                }
                <Dropdown.Item key="clientService" icon={<Icon id="support_agent" />}>Servicio al cliente</Dropdown.Item>
                <Dropdown.Item key="faq" icon={<Icon id="quiz" />}>Preguntas frecuentes</Dropdown.Item>
                <Dropdown.Item key="blog" icon={<Icon id="rss_feed" />}>Blog</Dropdown.Item>
                <Dropdown.Item key="logout" icon={<Icon id="logout" />} >Cerrar sesión</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default UserAvatar