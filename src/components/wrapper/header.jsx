import Icon from "@/ui/icons";
import UserHeaderMenu from "@/src/components/modules/user/avatar/userHeaderMenu";
import Image from "next/image";
import { useEffect, useState } from 'react'
import { Button, Card, Container, Grid, Input, Text, Dropdown } from "@nextui-org/react";
import { useRouter } from "next/router";
import UserNotifications from "../modules/user/notifications";
import uniqid from 'uniqid'
import Get from "@/src/utils/hooks/get";
import Link from "@/src/utils/hooks/link";

const Header = () => {
    const [isSearchOpen, openSearchBar] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [categories, setCategories] = useState({})
    const router = useRouter()

    const getCategories = async () => {
        await Get(`/${router?.locale}/website`).then(r => {
            setCategories(r?.data?.categories)
        }).catch(() => {
            setCategories({})
        })
    }

    useEffect(() => {
        getCategories()
    }, [])

    const handleSearch = (e) => {
        setSearchValue(e.target.value)
    }

    const handleEnter = (e) => {
        if (e.key == "Enter" && searchValue.length > 0) {
            router.push(`/./${router?.locale}/search?text=${searchValue}`)
        }
    }

    return (
        <Card variant="flat" css={{ borderRadius: 0, bg: "#fff" }}>
            <Container lg>
                {
                    isSearchOpen ?
                        <Grid.Container css={{ my: 10, }} justify="center">
                            <Input
                                clearable
                                css={{ w: "100%" }}
                                value={searchValue}
                                onChange={handleSearch}
                                onKeyUp={handleEnter}
                                id="headerSearch"
                                aria-label="Busqueda"
                                placeholder="Buscalo acá"
                                contentRight={<Icon id="search" className="text-dark" />}
                                contentLeft={<Icon id="arrow_back" onClick={() => openSearchBar(false)} css={{ m: 10 }} />}
                                contentLeftStyling={false}
                            />
                        </Grid.Container>
                        :
                        <Grid.Container css={{ my: 10, }} justify="space-between">
                            <Grid css={{ cursor: 'pointer' }}>
                                {categories?.length > 0 && (
                                    <Dropdown>
                                        <Dropdown.Button className="btn" size={'sm'} css={{ bg: 'transparent', color: '$white' }} flat>
                                            <img
                                                width={50}
                                                height={50}
                                                src={'/img/navbar.svg'}
                                                alt="Salada-navbar"
                                            />
                                        </Dropdown.Button>
                                        <Dropdown.Menu aria-label="Dynamic Actions" items={categories}>
                                            {(item) => (
                                                <Dropdown.Item
                                                    key={uniqid()}
                                                    color={'primary'}
                                                >
                                                    <Link className="linkCategoryHeader" href={`/page/category/${item?.name}`}>
                                                        {item.name}
                                                    </Link>
                                                </Dropdown.Item>
                                            )}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                )}
                                <Link href={`/`}>
                                    <Grid.Container direction="row">
                                        <Grid className="branding">
                                            <div>
                                                <Image
                                                    width={50}
                                                    height={50}
                                                    src="/logo2.png"
                                                    objectFit='contain'
                                                    alt="Salada-app-logo" />
                                            </div>
                                        </Grid>
                                        <Grid className="brandingText">
                                            <Text h4 css={{ marginLeft: 6 }}>
                                                <span style={{ display: 'block', marginBottom: -15 }}>
                                                    salada
                                                </span>
                                                <span style={{ display: 'block' }}>
                                                    app
                                                </span>
                                            </Text>
                                        </Grid>
                                    </Grid.Container>
                                </Link>
                            </Grid>
                            <Grid className='searchEngineHeader' css={{ "@smMax": { display: "none" } }}>
                                <Input
                                    color="white"
                                    clearable
                                    value={searchValue}
                                    onChange={handleSearch}
                                    onKeyUp={handleEnter}
                                    id="headerSearch"
                                    aria-label="Busqueda"
                                    placeholder="Buscá indumentaria, calzado, accesorios y más..."
                                    contentRight={<Icon id="search" className="iconSearch" />}
                                />
                            </Grid>
                            <Grid>
                                <Grid.Container gap={.5}>
                                    <Grid css={{ "@sm": { display: "none" } }}>
                                        <Button size={'sm'} auto css={{ bg: "$white", color: "$black" }} icon={<Icon id="search" />} onClick={() => openSearchBar(true)} />
                                    </Grid>
                                    <Grid>
                                        <UserNotifications />
                                    </Grid>
                                    <Grid>
                                        <UserHeaderMenu />
                                    </Grid>
                                </Grid.Container>
                            </Grid>
                        </Grid.Container>
                }
            </Container>
        </Card>
    )
}

export default Header;