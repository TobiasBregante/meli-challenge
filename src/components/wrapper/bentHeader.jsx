import { useUserContext } from "@/src/utils/user/provider"
import { Avatar, Grid, Dropdown } from "@nextui-org/react"
import { useRouter } from "next/router"
import { Fragment, useEffect } from "react"
import jsCookie from 'js-cookie'
import Icon from "../ui/icons"
import Link from "@/src/utils/hooks/link";

const BentHeader = ({ bent }) => {
    const router = useRouter()
    const goToHome = () => router?.push(`/./${router?.locale}`)
    const goToBent = () => router?.push(`/./${router?.locale}/bent`)
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
        <Fragment>
            <Grid.Container className="headerBottomContain" css={{ '@smMin': { display: bent ? '' : 'none' } }}>
                <button className="bentHeader" onClick={goToHome} aria-label='To Home' >
                    <Icon id={'home'}/>
                </button>
                <button className="bentHeaderToBent" aria-label="To Bent" onClick={goToBent}>
                    B
                </button>
                <Dropdown>
                    {
                        user?.brand ? <Dropdown.Button 
                        size={'sm'} 
                            className='bentHeaderProfile'
                            icon={<Avatar 
                                css={{ m: 'auto' }} 
                                size={'md'} 
                                bordered 
                                color={'gradient'} 
                                src={`https://res.cloudinary.com/saladapp/f_auto,c_limit,w_64,q_auto/${user?.brand?.imgs?.principal || 'uO3wK0EqPoTvyU41rnxLTbuBYjy-k9bY'}`}
                            />}
                        /> : <Dropdown.Button 
                            className="bentHeader" 
                            size={'sm'}>
                                <Icon id="person"/>
                            </Dropdown.Button>
                    }
                    <Dropdown.Menu className='dropdownHeader' onAction={handleSelection}>
                        {
                            !user && <Dropdown.Item key="login" icon={<Icon id="login" />}>
                                <Link href={`/user/auth/signin`}>Ingresar</Link>
                            </Dropdown.Item>
                        }
                        <Dropdown.Item key="bent">
                            <Link href={`/bent`}>Bent</Link>
                        </Dropdown.Item>
                        {
                            user?.isAdmin &&
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
                        <Dropdown.Item key="subscriptions" withDivider icon={<Icon id="subscriptions" />}>
                            <Link href={`/docs/subscriptions`}>Suscripción</Link>
                        </Dropdown.Item>
                        <Dropdown.Item key="support" withDivider icon={<Icon id="support_agent" />}>Servicio al cliente</Dropdown.Item>
                        <Dropdown.Item key="faq" icon={<Icon id="quiz" />}>
                            <Link href={`/docs/faq`}>Preguntas frecuentes</Link>
                        </Dropdown.Item>
                        {user && <Dropdown.Item key="logout" icon={<Icon id="logout" />} >Cerrar sesión</Dropdown.Item>} 
                    </Dropdown.Menu>
                </Dropdown>
            </Grid.Container>
        </Fragment>
    )
}

export default BentHeader