import Page from "@Page";
import AddProduct from "@/src/components/modules/user/product/add";
import { Grid } from "@nextui-org/react";

const AddProductPage = () => {
    return (
        <Page title="Iwarket - Añadir producto" >
            <Grid.Container justify="center">
                <Grid xs={12} sm={6}>
                    <AddProduct />
                </Grid>
            </Grid.Container>
        </Page>
    )
}

export default AddProductPage
