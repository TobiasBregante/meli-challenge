import Page from "@Page";
import AddProduct from "@/src/components/modules/user/product/add";
import Get from "@/src/utils/hooks/get";
import { Grid } from "@nextui-org/react";

const AddProductPage = ({ website }) => {
    return (
        <Page title="SaladaApp - Añadir producto" >
            <Grid.Container justify="center">
                <Grid xs={12} sm={6}>
                    <AddProduct website={website} />
                </Grid>
            </Grid.Container>
        </Page>
    )
}


//CACHE PAGE
export async function getStaticProps(ctx) {

    return {
        props: {
            website: await Get("website").then(r => r.data).catch(() => ({}))
        }
    }
}

export default AddProductPage
