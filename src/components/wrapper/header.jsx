import Icon from "@/ui/icons";
import UserHeaderMenu from "@/src/components/modules/user/avatar/userHeaderMenu";
import Image from "next/legacy/image";
import { useEffect, useState } from 'react'
import { Button, Card, Container, Grid, Input, Text, Dropdown } from "@nextui-org/react";
import { useRouter } from "next/router";
import UserNotifications from "../modules/user/notifications";
import uniqid from 'uniqid'
import Get from "@/src/utils/hooks/get";
import Link from "@/src/utils/hooks/link";
import { useUserContext } from "@/src/utils/user/provider";
import userLevel from "../modules/user/level";

const Header = ({ contentful }) => {
    const [isSearchOpen, openSearchBar] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [categories, setCategories] = useState({})
    const router = useRouter()
    const user = useUserContext()
    const [level, setLevel] = useState(0)

    const getCategories = async () => {
        await Get(`/${router?.locale}/website`).then(r => {
            setCategories(r?.data?.categories)
        }).catch(() => {
            setCategories({})
        })
    }
    
    const getUser = async () => {
        const userProducts = await Get(`/${router?.locale}/products/find/query?brand_id=${user?.brand?._id}&level=true`).then(r => r?.data?.count).catch(() => ({}))
        setLevel(userLevel({ countProducts: userProducts }))
    }
    useEffect(() => {
        user?.brand?._id && getUser()
    }, [router, user])

    {/* eslint-disable-line */ }
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
            <Container xl>
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
                                aria-labelledby={contentful?.header?.headerSearch?.ariaLabel}
                                placeholder={contentful?.header?.headerSearch?.mobile}
                                contentRight={<Icon id="search" className="text-dark" />}
                                contentLeft={<Icon id="arrow_back" onClick={() => openSearchBar(false)} css={{ m: 10 }} />}
                                contentLeftStyling={false}
                            />
                        </Grid.Container>
                        :
                        <Grid.Container css={{ my: 10 }} justify="space-between">
                            <Grid css={{ cursor: 'pointer' }}>
                                {categories?.length > 0 && (
                                    <Dropdown>
                                        <Dropdown.Button className="btn" size={'sm'} css={{ bg: 'transparent', color: '$white' }} flat>
                                            {/* eslint-disable-line */}
                                            <img
                                                width={50}
                                                height={50}
                                                src={'/img/navbar.svg'}
                                                alt="Iwarket-navbar"
                                            />
                                        </Dropdown.Button>
                                        <Dropdown.Menu aria-labelledby="Dynamic Actions" items={categories}>
                                            {(item) => (
                                                <Dropdown.Item
                                                    key={uniqid()}
                                                    color={'primary'}
                                                >
                                                    <Link className="linkCategoryHeader" href={`/category/${item?.name}`}>
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
                                                    width={90}
                                                    height={50}
                                                    src="/janunnme7gl0kym8qqd0.png"
                                                    objectFit='contain'
                                                    alt="Iwarket-logo" />
                                            </div>
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
                                    aria-labelledby={contentful?.header?.headerSearch?.ariaLabel}
                                    placeholder={contentful?.header?.headerSearch?.desktop}
                                    contentRight={<Icon id="search" className="iconSearch" />}
                                />
                            </Grid>
                            <Grid>
                                <Grid.Container>
                                    <Grid css={{ '@smMax': { display: 'none' } }}>
                                        <Button className="levelHeader" size={'md'} color={'gradient'}>
                                            {user?.brand?._id ? `Nivel ${level}` : '¡Hay envíos a tu localidad!'} <Icon css={{ ml: 5, color: '$white' }} id={'rocket_launch'}/>
                                        </Button>
                                    </Grid>
                                </Grid.Container>
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