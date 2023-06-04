import { useUserContext } from "@/utils/user/provider"
import Icon from "@/src/components/ui/icons"
import { useState } from "react";
import jsCookie from 'js-cookie'
import { useRouter } from "next/router";
import { Button, Dropdown } from "@nextui-org/react";

const UserAvatar = () => {
    const router = useRouter()
    const user = useUserContext()

    const logout = () => {
        jsCookie.remove("sldtoken")
        router.reload()
    }

    const handleSelection = (e) => {
        if (e == "logout") {
            logout()
        }
        if (e == "support") {
            window.open("https://api.whatsapp.com/send?phone=541170895828&text=Hola%20tengo%20una%20problema%20con%20la%20app%20de%20saladaapp")
        }
    }


    return (
        <>
            <Dropdown>
                <Dropdown.Button size={'sm'} icon={<Icon id="person" css={{ mt: 0 }} />} css={{ bg: 'white' }} />
                <Dropdown.Menu className='dropdownHeader' onAction={handleSelection}>
                    <Dropdown.Item key="home" icon={<Icon id="home" />}>
                        <a href={`/`}>Inicio</a>
                    </Dropdown.Item>
                    {
                        user.isAdmin &&
                        <Dropdown.Item key="panel" withDivider icon={<Icon id="person" />}>
                            <a href={"/admin"}>Panel</a>
                        </Dropdown.Item>
                    }
                    {
                        (user.isSeller && user.brand) &&
                        <Dropdown.Item key="profile" withDivider icon={<Icon id="person" />}>
                            <a href={`/brand/${user.brand._id}`}>Mi perfil</a>
                        </Dropdown.Item>
                    }
                    {
                        (user.isSeller && user.brand) &&
                        <Dropdown.Item key="products" withDivider icon={<Icon id="dashboard" />}>
                            <a href={`/user/products?brand=${user.brand._id}`}>Mis productos</a>
                        </Dropdown.Item>
                    }
                    {
                        (user.isSeller && user.brand) &&
                        <Dropdown.Item key="addProduct" icon={<Icon id="dashboard" />}>
                            <a href={`/user/products/add`}>Añadir producto</a>
                        </Dropdown.Item>
                    }
                    {
                        (user.isSeller && !user.brand) &&
                        <Dropdown.Item key="claimBrand" icon={<Icon id="dashboard" />}>
                            <a href={`/user/claimBrand`}>Crear marca</a>
                        </Dropdown.Item>
                    }
                    {
                        user.isSeller &&
                        <Dropdown.Item key="subscriptions" withDivider icon={<Icon id="subscriptions" />}>
                            <a href={`/docs/subscriptions`}>Suscripción</a>
                        </Dropdown.Item>
                    }
                    <Dropdown.Item key="support" withDivider icon={<Icon id="support_agent" />}>Servicio al cliente</Dropdown.Item>
                    <Dropdown.Item key="faq" icon={<Icon id="quiz" />}>
                        <a href={`/docs/faq`}>Preguntas frecuentes</a>
                    </Dropdown.Item>
                    {/* <Dropdown.Item key="blog" withDivider icon={<Icon id="rss_feed" />}>Blog</Dropdown.Item> */}
                    <Dropdown.Item key="logout" icon={<Icon id="logout" />} >Cerrar sesión</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown></>
    )
}

export default UserAvatar