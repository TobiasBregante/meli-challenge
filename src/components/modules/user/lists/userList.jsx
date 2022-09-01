import Icon from "@/src/components/ui/icons"
import { Table } from "@nextui-org/react"

const UsersList = ({data}) => {
    return (
        <Table
            css={{bg: "$white"}}
            shadow={false}
        >
            <Table.Header>
                <Table.Column>Nombre</Table.Column>
                <Table.Column>Email</Table.Column>
                <Table.Column>Telefono</Table.Column>
                <Table.Column>Es vendedor</Table.Column>
            </Table.Header>
            <Table.Body>
                {
                    data.map((user,i) => (
                        <Table.Row key={i}>
                            <Table.Cell>{user.name}</Table.Cell>
                            <Table.Cell>{user.email}</Table.Cell>
                            <Table.Cell>{user.cellPhone}</Table.Cell>
                            <Table.Cell>
                                <Icon id={user.isSeller ? "done":"close"}/>
                            </Table.Cell>
                        </Table.Row>
                    ))
                }
            </Table.Body>
        </Table>
    )
}

export default UsersList