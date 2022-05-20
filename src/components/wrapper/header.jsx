import Link from "next/link";
import Text from '@/ui/texts'
import Input from '@/ui/inputs'
import Icon from "@/ui/icons";
import IsAuth from "@/components/modules/user/auth/isAuth";
import Image from "next/image";

const Header = () => {
    return (
        <nav className="navbar bg-primary-500">
            <div className="container d-flex justify-content-between">
                <div className="d-flex">
                    <Image
                        src="/logo.png"
                        width={50}
                        height={50} 
                        alt="salada-app-logo"/>
                    <div className="d-none d-sm-block">

                        <Text color="black" weight="900" size="2">
                            Salada
                        </Text>
                        <Text color="black" size="2">
                            App
                        </Text>
                    </div>
                </div>
                <div className="d-flex">
                    <Input
                        color="white"
                        clearable
                        icon={<Icon id="search" />} 
                        className="me-2"/>
                    <IsAuth/>
                </div>
            </div>
        </nav>
    )
};

export default Header;