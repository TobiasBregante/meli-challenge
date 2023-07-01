import { Table } from "@nextui-org/react"
import { useRouter } from "next/router"

const ProductsTable = ({ data, isSeller }) => {
    const router = useRouter()
    const handleClick = e =>{
        const product = data[Array.from(e)[0]]
        if (isSeller) {
            return router.push(`user/products/${product?._id}`)
        }
        router.push(`admin/product/${product?._id}`)
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
                <Table.Column>Titulo</Table.Column>
                <Table.Column>Marca</Table.Column>
                <Table.Column>Ubicación</Table.Column>
            </Table.Header>
            <Table.Body>
                {
                    data?.length > 0 && data.map((product, i) => (
                        <Table.Row key={i}>
                            <Table.Cell>{product?.title}</Table.Cell>
                            <Table.Cell>{product?.brand?.brandName}</Table.Cell>
                            <Table.Cell>{product?.brand?.location?.zone}</Table.Cell>
                        </Table.Row>
                    ))
                }
            </Table.Body>
        </Table>
    )
}

export default ProductsTable