import { useRouter } from "next/router"
import { Fragment, useEffect } from "react"
import LinkNext from 'next/link';

const Link = ({ href, children, style, className, target }) => {
    const router = useRouter()

    const path = `/${router?.locale}`

    return (
        <Fragment>
            {
                (href?.search('https') != (-1) && href?.search('http') != (-1)) ? (<a target={target} style={style} className={className} href={`${href}`}>{children}</a>)
                : (<LinkNext target={target} style={style} className={className} href={`${path}${href}`}>{children}</LinkNext>)
            }
        </Fragment>
    )
}

export default Link