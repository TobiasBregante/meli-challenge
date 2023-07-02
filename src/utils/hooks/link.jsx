import { useRouter } from "next/router"
import { Fragment } from "react"

const Link = ({ href, children, style, className, target }) => {
    const router = useRouter()

    const path = `/${router?.locale}`

    return (
        <Fragment>
            <a target={target} style={style} className={className} href={`${path}${href}`}>{children}</a>
        </Fragment>
    )
}

export default Link