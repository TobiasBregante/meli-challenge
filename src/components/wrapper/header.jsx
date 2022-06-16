import Link from "next/link";
import Text from '@/ui/texts'
import Input from '@/ui/inputs'
import Icon from "@/ui/icons";
import IsAuth from "@/components/modules/user/auth/isAuth";
import Image from "next/image";
import Button from '@/ui/buttons'
import { useState } from 'react'
const Header = () => {
    const [isSearchBarOpen, openSearchBar] = useState(false),
        [searchValue, setSearchValue] = useState("")

    const handleSearch = (e) => {
        setSearchValue(e.target.value)
    }

    return (
        <nav className="navbar bg-primary-500">
            {
                isSearchBarOpen &&
                <div className="container d-flex flex-row">
                    <Input
                        color="white"
                        clearable
                        value={searchValue}
                        placeholder="Busca entre cientos de productos"
                        icon={<Icon id="search" />}
                        iconRight={<Icon id="close" onClick={() => openSearchBar(false)} />}
                        onChange={handleSearch}
                    />
                </div>
            }
            {
                !isSearchBarOpen &&
                <div className="container d-flex justify-content-between">
                    <Link href="/./" passHref>
                        <div className="d-flex pointer">
                            <Image
                                src="/logo.png"
                                width={50}
                                height={50}
                                alt="salada-app-logo" />
                            <div className="">

                                <Text color="black" weight="900" size="2">
                                    Salada
                                </Text>
                                <Text color="black" size="2">
                                    App
                                </Text>
                            </div>
                        </div>
                    </Link>
                    <div className="d-flex">
                        <Input
                            color="white"
                            clearable
                            value={searchValue}
                            onChange={handleSearch}
                            placeholder="Busca entre cientos de productos"
                            icon={<Icon id="search" className="text-dark"/>}
                            className="me-2 d-none d-sm-block" />

                        <Button color="white" className="me-2 d-block d-sm-none" onClick={() => openSearchBar(true)}>
                            <Icon id="search" />
                        </Button>
                        <IsAuth />

                    </div>
                </div>
            }
        </nav>
    )
};

export default Header;