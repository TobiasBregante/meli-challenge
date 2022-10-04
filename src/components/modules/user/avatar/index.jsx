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
        if (e == "home") {
            router.push(`/./`)
        }
        if (e == "logout") {
            logout()
        }
        if (e == "panel") {
            router.push(`/./admin`)
        }
        if (e == "profile") {
            router.push(`/./brand/${user.brand._id}`)
        }
        if (e == "products") {
            router.push(`/./user/products?brand=${user.brand._id}`)
        }
        if (e == "addProduct") {
            router.push(`/./user/products/add`)
        }
        if (e == "claimBrand") {
            router.push(`/./user/claimBrand`)
        }
        if (e == "subscriptions") {
            router.push(`/./docs/subscriptions`)
        }
        if (e == "faq") {
            router.push(`/./docs/faq`)
        }
        if (e == "support") {
            window.open("https://api.whatsapp.com/send?phone=541170895828&text=Hola%20tengo%20una%20problema%20con%20la%20app%20de%20saladaapp")
        }
    }


    return (
        <>
            <Dropdown>
                <Dropdown.Button icon={<Icon id="person" css={{ mt: 0 }} />} css={{ bg: 'white' }} />
                <Dropdown.Menu onAction={handleSelection}>
                    <Dropdown.Item key="home" icon={<Icon id="home" />}>Inicio</Dropdown.Item>
                    {
                        user.isAdmin &&
                        <Dropdown.Item key="panel" withDivider icon={<Icon id="person" />}>Panel</Dropdown.Item>
                    }
                    {
                        (user.isSeller && user.brand) &&
                        <Dropdown.Item key="profile" withDivider icon={<Icon id="person" />}>Mi perfil</Dropdown.Item>
                    }
                    {
                        (user.isSeller && user.brand) &&
                        <Dropdown.Item key="products" withDivider icon={<Icon id="dashboard" />}>Mis productos</Dropdown.Item>
                    }
                    {
                        (user.isSeller && user.brand) &&
                        <Dropdown.Item key="addProduct" icon={<Icon id="dashboard" />}>Añadir producto</Dropdown.Item>
                    }
                    {
                        (user.isSeller && !user.brand) &&
                        <Dropdown.Item key="claimBrand" icon={<Icon id="dashboard" />}>Crear marca</Dropdown.Item>
                    }
                    {
                        user.isSeller &&
                        <Dropdown.Item key="subscriptions" withDivider icon={<Icon id="subscriptions" />}>Suscripción</Dropdown.Item>
                    }
                    <Dropdown.Item key="support" withDivider icon={<Icon id="support_agent" />}>Servicio al cliente</Dropdown.Item>
                    <Dropdown.Item key="faq" icon={<Icon id="quiz" />}>Preguntas frecuentes</Dropdown.Item>
                    <Dropdown.Item key="blog" withDivider icon={<Icon id="rss_feed" />}>Blog</Dropdown.Item>
                    <Dropdown.Item key="logout" icon={<Icon id="logout" />} >Cerrar sesión</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown></>
    )
}

export default UserAvatar