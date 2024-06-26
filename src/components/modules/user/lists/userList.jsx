import Icon from "@/src/components/ui/icons"
import timeago from "@/src/utils/timeago"
import { Badge, Container, Table } from "@nextui-org/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const UsersList = ({ data }) => {
    const router = useRouter()

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
                </Table.Header>
                <Table.Body>
                    {
                        data?.length > 0 && data?.map((user, i) => (
                            <Table.Row key={i}>
                                <Table.Cell>{user.name}</Table.Cell>
                                <Table.Cell>{user.email}</Table.Cell>
                                <Table.Cell>{user.cellPhone}</Table.Cell>
                            </Table.Row>
                        ))
                    }
                </Table.Body>
            </Table>
        </Container>
    )
}

export default UsersList