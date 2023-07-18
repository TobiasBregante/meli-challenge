import { useUserContext } from "@/src/utils/user/provider"
import { Avatar, Grid, Dropdown, Button } from "@nextui-org/react"
import { useRouter } from "next/router"
import { Fragment, useEffect, useState } from "react"
import jsCookie from 'js-cookie'
import Icon from "../ui/icons"
import Link from "@/src/utils/hooks/link";

const BentHeader = ({ bent }) => {
    const router = useRouter()
    const goToHome = () => router?.push(`/./${router?.locale}`)
    const goToBent = () => router?.push(`/./${router?.locale}/bent`)
    const user = useUserContext()
    const [showNavbarList, setShowNavbarList] = useState(false)

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

    const handlerShowNabvarList = () => setShowNavbarList(!showNavbarList)

    useEffect(() => {
        setShowNavbarList(false)
    }, [router])

    return (
        <Fragment>
            <Grid.Container className="headerBottomContain" css={{ '@smMin': { display: bent ? '' : 'none' } }}>
                <button className="bentHeader" onClick={goToHome} aria-label='To Home' >
                    <Icon id={'home'} />
                </button>
                <button className="bentHeaderToBent" aria-label="To Bent" onClick={goToBent}>
                    B
                </button>
                {
                    showNavbarList && (
                        <Fragment>
                            <button className="btnNavbarListBottom" onClick={handlerShowNabvarList}>
                                <Icon id={'close'} />
                            </button>
                            <div className="navbarListBottom">
                                {
                                    !user && <Button key="login" icon={<Icon id="login" />}>
                                        <Link href={`/user/auth/signin`}>Ingresar</Link>
                                    </Button>
                                }
                                <Button key="bent">
                                    <Link href={`/bent`}>Bent</Link>
                                </Button>
                                {
                                    user?.isAdmin &&
                                    <Button key="panel" iconRight={<Icon id="person" />}>
                                        <Link href={"/admin"}>Panel</Link>
                                    </Button>
                                }
                                {
                                    (user?.isSeller && user?.brand) &&
                                    <Button key="profile" iconRight={<Icon id="person" />}>
                                        <Link href={`/brand/${user.brand._id}`}>Mi perfil</Link>
                                    </Button>
                                }
                                {
                                    (user?.isSeller && user?.brand) &&
                                    <Button key="products" iconRight={<Icon id="dashboard" />}>
                                        <Link href={`/user/products?brand=${user.brand._id}`}>Mis productos</Link>
                                    </Button>
                                }
                                {
                                    (user?.isSeller && user?.brand) &&
                                    <Button key="addProduct" iconRight={<Icon id="dashboard" />}>
                                        <Link href={`/user/products/add`}>Añadir producto</Link>
                                    </Button>
                                }
                                {
                                    (user?.isSeller && !user?.brand) &&
                                    <Button key="claimBrand" iconRight={<Icon id="dashboard" />}>
                                        <Link href={`/user/claimBrand`}>Crear marca</Link>
                                    </Button>
                                }
                                <Button key="subscriptions" iconRight={<Icon id="subscriptions" />}>
                                    <Link href={`/docs/subscriptions`}>Suscripción</Link>
                                </Button>
                                <Button onPress={() => {
                                    window.open(`https://api.whatsapp.com/send?text=Hola! Necesito soporte en SaladaApp&phone=5491124767008`)
                                }} key="support" iconRight={<Icon id="support_agent" />}>Servicio al cliente</Button>
                                <Button key="faq" iconRight={<Icon id="quiz" />}>
                                    <Link href={`/docs/faq`}>Preguntas frecuentes</Link>
                                </Button>
                                {user && <Button key="logout" iconRight={<Icon id="logout" />} >Cerrar sesión</Button>}
                            </div>
                        </Fragment>
                    )
                }
                <button className='bentHeaderProfile' onClick={handlerShowNabvarList}>
                    {
                        user?.brand ? <Avatar
                            css={{ m: 'auto' }}
                            size={'sm'}
                            bordered
                            color={'gradient'}
                            src={`https://res.cloudinary.com/saladapp/f_auto,c_limit,w_64,q_auto/${user?.brand?.imgs?.principal || 'uO3wK0EqPoTvyU41rnxLTbuBYjy-k9bY'}`} />
                            : <Icon id="person"
                            />
                    }
                </button>
            </Grid.Container>
        </Fragment>
    )
}

export default BentHeader