import { useRouter } from "next/router"
import { Fragment } from "react"
import Icon from "../ui/icons"

const BentHeader = ({ bent }) => {
    const router = useRouter()
    const goToHome = () => router?.push(`/./${router?.locale}`)
    const goToBent = () => router?.push(`/./${router?.locale}/bent`)

    return (
        <Fragment>
            {
                !bent ? (
                    <button className="bentHeaderToBent" onClick={goToBent}>
                        B
                    </button>
                ) : (
                    <button className="bentHeader" onClick={goToHome}>
                        <Icon id={'home'}/>
                    </button>
                )
            }
        </Fragment>
    )
}

export default BentHeader