import { Dropdown } from "@nextui-org/react";
import { useRouter } from "next/router"
import { SVGFlag } from 'use-flags'

const LocaleSwitcher = ({ fixed }) => {
    const router = useRouter()

    return (
        <Dropdown>
            <Dropdown.Button color={'light'} size='xs' flat className={`${fixed ? 'localeSwitcherBtn' : 'localeSwitcherBtnNoFixed'}`}>{<SVGFlag country={router?.locale} fileType='webp' flagWidth='20' />}</Dropdown.Button>
            <Dropdown.Menu aria-label="Static Actions">
                {router?.locales?.length > 0 && router?.locales?.map(((obj, i) => {
                    return <Dropdown.Item className="localeLink" key={i}>
                        <a href={`/${obj}/`}><SVGFlag country={obj} fileType='webp' flagWidth='30' /></a>
                    </Dropdown.Item>
                }))}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default LocaleSwitcher