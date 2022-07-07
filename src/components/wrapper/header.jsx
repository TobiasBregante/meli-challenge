import Link from "next/link";
import Icon from "@/ui/icons";
import UserHeaderMenu from "@/src/components/modules/user/avatar/userHeaderMenu";
import Image from "next/image";
import { useState } from 'react'
import { Button, Card, Container, Grid, Input, Text } from "@nextui-org/react";

const Header = () => {
    const [isSearchBarOpen, openSearchBar] = useState(false),
        [searchValue, setSearchValue] = useState("")

    const handleSearch = (e) => {
        setSearchValue(e.target.value)
    }

    return (
        <Card css={{ borderRadius: 0, bg: "$primary" }}>
            <Container>
                <Grid.Container css={{ my: 10, }} justify="space-between">
                    <Grid>
                        <Link href="/./" passHref>
                            <Grid.Container direction="row">
                                <Grid>
                                    <Image
                                        src="/logo.png"
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
                        </Link>
                    </Grid>
                    <Grid>
                        <Grid.Container gap={.3}>
                            <Grid css={{ "@smMax": { display: "none" } }}>
                                <Input
                                    color="white"
                                    clearable
                                    value={searchValue}
                                    onChange={handleSearch}
                                    placeholder="Busca entre cientos de productos"
                                    contentRight={<Icon id="search" className="text-dark" />}
                                />
                            </Grid>
                            <Grid css={{ "@sm": { display: "none" } }}>
                                <Button auto css={{ bg: "$white", color: "$black" }}>
                                    <Icon id="search" />
                                </Button>
                            </Grid>
                            <Grid>
                                <UserHeaderMenu />
                            </Grid>

                        </Grid.Container>
                    </Grid>
                </Grid.Container>
            </Container>
        </Card>
    )
}

export default Header;