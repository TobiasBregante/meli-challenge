import Icon from "@/src/components/ui/icons"
import timeago from "@/src/utils/timeago"
import { Badge, Button, Table } from "@nextui-org/react"
import { useRouter } from "next/router"

const BrandTable = ({ data }) => {
    const router = useRouter()
    const handleClick = e =>{
        const brand = data[Array.from(e)[0]]
        router.push(`admin/brand/${brand._id}`)
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
                <Table.Column>Marca</Table.Column>
                <Table.Column>Zona</Table.Column>
                <Table.Column>Es publica</Table.Column>
                <Table.Column>Publica hasta</Table.Column>
            </Table.Header>
            <Table.Body>
                {
                    data.map((brand, i) => (
                        <Table.Row key={i}>
                            <Table.Cell>{brand.brandName}</Table.Cell>
                            <Table.Cell>{brand.location.zone}</Table.Cell>
                            <Table.Cell>
                                <Badge color={brand.isActive?"success":"error"}>
                                    {
                                        brand.isActive ? "Si es publica":"No es publica"
                                    }
                                </Badge>
                            </Table.Cell>
                            <Table.Cell>
                                <Badge color={brand.isActive?"success":"error"}>
                                    {
                                        timeago(brand.isActiveUntil)
                                    }
                                </Badge>
                            </Table.Cell>
                        </Table.Row>
                    ))
                }
            </Table.Body>
        </Table>
    )
}

export default BrandTable