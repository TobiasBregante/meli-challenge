import { Button, Container, Table } from "@nextui-org/react"
import arg from "arg.js"
import { useRouter } from "next/router"
import Icon from "../../ui/icons"

const TransactionsList = ({ data }) => {
    const router = useRouter()

    const handleClick = e => {
        const user = data[Array.from(e)[0]]
        // router.push(`/./${router?.locale}/admin/user/${user._id}`)
    }

    const toWpp = e => window.open(e)
    
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
                    <Table.Column>WhatsApp</Table.Column>
                    <Table.Column>Calle</Table.Column>
                    <Table.Column>Altura</Table.Column>
                    <Table.Column>Ciudad</Table.Column>
                    <Table.Column>Provincia</Table.Column>
                    <Table.Column>País</Table.Column>
                    <Table.Column>CP</Table.Column>
                    <Table.Column>Fecha creación</Table.Column>
                </Table.Header>
                <Table.Body>
                    {
                        data?.length > 0 && data?.map((user, i) => (
                            <Table.Row key={i}>
                                <Table.Cell>{user?.transaction?.payer?.name}</Table.Cell>
                                <Table.Cell>{user?.transaction?.payer?.email}</Table.Cell>
                                <Table.Cell>{user?.transaction?.payer?.phone?.number}</Table.Cell>
                                <Table.Cell>{<Button size={'sm'} onClick={() => toWpp(`https://wa.me/${arg.phone.clean(user?.transaction?.payer?.phone?.number)}`)} rounded iconRight={<Icon id="/whatsappicon"/>}>WhatsApp</Button>}</Table.Cell>
                                <Table.Cell>{user?.transaction?.shipments?.receiver_address?.street_name}</Table.Cell>
                                <Table.Cell>{user?.transaction?.shipments?.receiver_address?.street_number}</Table.Cell>
                                <Table.Cell>{user?.transaction?.shipments?.receiver_address?.city_name}</Table.Cell>
                                <Table.Cell>{user?.transaction?.shipments?.receiver_address?.state_name}</Table.Cell>
                                <Table.Cell>{user?.transaction?.shipments?.receiver_address?.country_name}</Table.Cell>
                                <Table.Cell>{user?.transaction?.shipments?.receiver_address?.zip_code}</Table.Cell>
                                <Table.Cell>
                                    {
                                        user?.createdOn
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

export default TransactionsList