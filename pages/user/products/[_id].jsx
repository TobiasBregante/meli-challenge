import Page from "@Page";
import ManageProduct from "@/src/components/modules/user/product/add";
import Get from "@/src/utils/hooks/get";
import { Container, Grid } from "@nextui-org/react";
import SideBar from "@/src/components/modules/admin/sidebar";

const EditProductPage = ({ website, data }) => {
    return (
        <Page>
            <Container lg >
                <Grid.Container gap={2} justify="center">
                    <Grid xs={12} sm={9} >
                        <ManageProduct website={website} data={data} />
                    </Grid>
                </Grid.Container>

            </Container>
        </Page>
    )
}


//CACHE PAGE
export async function getServerSideProps(ctx) {

    return {
        props: {
            website: await Get("website").then(r => r.data).catch(() => ({})),
            data: await Get(`products/product/${ctx.params._id}?withBrand=true`).then(r => r.data).catch(() => ({}))
        }
    }
}

export default EditProductPage
