import Icon from "@/ui/icons";
import UserHeaderMenu from "@/src/components/modules/user/avatar/userHeaderMenu";
import Image from "next/image";
import { useState } from 'react'
import { Button, Card, Container, Grid, Input, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import UserNotifications from "../modules/user/notifications";

const Header = () => {
    const [isSearchOpen, openSearchBar] = useState(false),
        [searchValue, setSearchValue] = useState("")

    const router = useRouter()

    const handleSearch = (e) => {
        setSearchValue(e.target.value)
    }

    const handleEnter = (e) => {
        if (e.key == "Enter" && searchValue.length > 0) {
            router.push(`/./search?text=${searchValue}`)
        }
    }

    return (
        <Card css={{ borderRadius: 0, bg: "$primary" }}>
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
                                placeholder="Busca entre cientos de productos"
                                contentRight={<Icon id="search" className="text-dark" />}
                                contentLeft={<Icon id="arrow_back" onClick={() => openSearchBar(false)} css={{ m: 10 }} />}
                                contentLeftStyling={false}
                            />
                        </Grid.Container>
                        :
                        <Grid.Container css={{ my: 10, }} justify="space-between">
                            <Grid css={{cursor: 'pointer'}}>
                                <a href="/./">
                                    <Grid.Container direction="row">
                                        <Grid>
                                            <Image
                                                src="/logo2"
                                                width={50}
                                                height={50}
                                                alt="salada-app-logo" />
                                        </Grid>
                                        <Grid>
                                            <Grid.Container direction="column" justify="center">
                                                <Grid.Container css={{ my: "auto" }}>
                                                    <Text h2 weight="bold" >
                                                        Salada
                                                    </Text>
                                                    <Text h2 color="black" weight="normal" >
                                                        App
                                                    </Text>
                                                </Grid.Container>
                                            </Grid.Container>
                                        </Grid>
                                    </Grid.Container>
                                </a>
                            </Grid>
                            <Grid>
                                <Grid.Container gap={1}>
                                    <Grid css={{ "@smMax": { display: "none" } }}>
                                        <Input
                                            color="white"
                                            clearable
                                            value={searchValue}
                                            onChange={handleSearch}
                                            onKeyUp={handleEnter}
                                            id="headerSearch"
                                            aria-label="Busqueda"
                                            placeholder="Busca entre cientos de productos"
                                            contentRight={<Icon id="search" className="text-dark" />}
                                        />
                                    </Grid>
                                    <Grid css={{ "@sm": { display: "none" } }}>
                                        <Button auto css={{ bg: "$white", color: "$black" }} icon={<Icon id="search" />} onClick={() => openSearchBar(true)} />
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