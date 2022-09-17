import Icon from "@/src/components/ui/icons"
import timeago from "@/src/utils/timeago"
import { Badge, Button, Table } from "@nextui-org/react"
import { useRouter } from "next/router"

const UsersList = ({ data }) => {
    const router = useRouter()
    const handleClick = e =>{
        const user = data[Array.from(e)[0]]
        router.push(`/./admin/user/${user._id}`)
    }
    return (
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
                <Table.Column>Premiun</Table.Column>
                <Table.Column>Vendedor</Table.Column>
                <Table.Column>Premiun vence</Table.Column>
            </Table.Header>
            <Table.Body>
                {
                    data.map((user, i) => (
                        <Table.Row key={i}>
                            <Table.Cell>{user.name}</Table.Cell>
                            <Table.Cell>{user.email}</Table.Cell>
                            <Table.Cell>{user.cellPhone}</Table.Cell>
                            <Table.Cell>
                                <Badge color={user.status.isPremiun ? "success" : "error"} >
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
                                    user.status.isPremiunUntil ? timeago(user.status.isPremiunUntil):"Aun no fue premiun"
                                }
                            </Table.Cell>
                        </Table.Row>
                    ))
                }
            </Table.Body>
        </Table>
    )
}

export default UsersList