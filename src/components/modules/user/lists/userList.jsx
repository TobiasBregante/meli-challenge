import Icon from "@/src/components/ui/icons"
import timeago from "@/src/utils/timeago"
import { Badge, Button, Container, Table } from "@nextui-org/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const UsersList = ({ data }) => {
    const router = useRouter()

    const [premiumCount, setPremiumCount] = useState(0)
    const [noPremiumCount, setNoPremiumCount] = useState(0)

    useEffect(() => {
        const premium = data?.length > 0 && data?.filter(user => user?.status?.isPremiun)?.length
        const noPremium = data?.length > 0 && data?.filter(user => !user?.status?.isPremiun)?.length
        setNoPremiumCount(noPremium)
        setPremiumCount(premium)
    }, [data])

    const handleClick = e => {
        const user = data[Array.from(e)[0]]
        router.push(`/./${router?.locale}/admin/user/${user._id}`)
    }
    return (
        <Container className="tableUsers">
            <Table
                css={{ bg: "$white" }}
                shadow={false}
                selectionMode="single"
                onSelectionChange={handleClick}
                disallowEmptySelection
            >
                <Table.Header>
                    <Table.Column>Nombre</Table.Column>
                    <Table.Column>Email</Table.Column>
                    <Table.Column>Telefono</Table.Column>
                    <Table.Column>
                        Premium
                        <Badge enableShadow disableOutline color={'success'} css={{ ml: 5 }}>
                            {premiumCount}
                        </Badge>
                        <Badge enableShadow disableOutline color={'error'} css={{ ml: 5 }}>
                            {noPremiumCount}
                        </Badge>
                    </Table.Column>
                    <Table.Column>Vendedor</Table.Column>
                    <Table.Column>Premiun vence</Table.Column>
                </Table.Header>
                <Table.Body>
                    {
                        data?.length > 0 && data?.map((user, i) => (
                            <Table.Row key={i}>
                                <Table.Cell>{user.name}</Table.Cell>
                                <Table.Cell>{user.email}</Table.Cell>
                                <Table.Cell>{user.cellPhone}</Table.Cell>
                                <Table.Cell>
                                    <Badge css={{ w: 150 }} color={user.status.isPremiun ? "success" : "error"} >
                                        {user.status.isPremiun ? "Es premiun" : "No es premiun"}
                                    </Badge>
                                </Table.Cell>
                                <Table.Cell>
                                    <Badge color={user.isSeller ? "success" : "error"} >
                                        {user.isSeller ? "Es vendedor" : "No es vendedor"}
                                    </Badge>
                                </Table.Cell>
                                <Table.Cell>
                                    {
                                        user.status.isPremiunUntil ? timeago(user.status.isPremiunUntil) : "Aun no fue premiun"
                                    }
                                </Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
        </Container>
    )
}

export default UsersList