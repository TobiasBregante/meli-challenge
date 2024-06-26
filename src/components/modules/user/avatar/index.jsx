import { useUserContext } from "@/utils/user/provider"
import Icon from "@/src/components/ui/icons"
import { Fragment, useState } from "react";
import jsCookie from 'js-cookie'
import { useRouter } from "next/router";
import { Button, Dropdown } from "@nextui-org/react";
import Link from "@/src/utils/hooks/link";

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
            window.open("https://api.whatsapp.com/send?phone=541170895828&text=Hola%20tengo%20una%20problema%20con%20la%20app%20de%20Iwarket")
        }
    }


    return (
        <Fragment>
            <Dropdown>
                <Dropdown.Button size={'sm'} icon={<Icon id="person" css={{ mt: 0 }} />} css={{ bg: 'white' }} />
                <Dropdown.Menu className='dropdownHeader' onAction={handleSelection}>
                    <Dropdown.Item key="home" icon={<Icon id="home" />}>
                        <Link href={`/`}>Inicio</Link>
                    </Dropdown.Item>
                    {
                        (user?.isSeller || user?.isAdmin) &&
                        <Dropdown.Item key="panel" withDivider icon={<Icon id="person" />}>
                            <Link href={"/admin"}>Panel</Link>
                        </Dropdown.Item>
                    }
                    {
                        (user?.isSeller && user?.brand) &&
                        <Dropdown.Item key="profile" withDivider icon={<Icon id="person" />}>
                            <Link href={`/brand/${user.brand._id}`}>Mi perfil</Link>
                        </Dropdown.Item>
                    }
                    {
                        (user?.isSeller && user?.brand) &&
                        <Dropdown.Item key="products" withDivider icon={<Icon id="dashboard" />}>
                            <Link href={`/user/products?brand=${user.brand._id}`}>Mis productos</Link>
                        </Dropdown.Item>
                    }
                    {
                        (user?.isSeller && user?.brand) &&
                        <Dropdown.Item key="addProduct" icon={<Icon id="dashboard" />}>
                            <Link href={`/user/products/add`}>Añadir producto</Link>
                        </Dropdown.Item>
                    }
                    {
                        (user?.isSeller && !user?.brand) &&
                        <Dropdown.Item key="claimBrand" icon={<Icon id="dashboard" />}>
                            <Link href={`/user/claimBrand`}>Crear marca</Link>
                        </Dropdown.Item>
                    }
                    <Dropdown.Item withDivider key="logout" icon={<Icon id="logout" />} >Cerrar sesión</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Fragment>
    )
}

export default UserAvatar