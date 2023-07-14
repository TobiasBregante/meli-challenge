import Page from "@Page";
import AddProduct from "@/src/components/modules/user/product/add";
import Get from "@/src/utils/hooks/get";
import { Container, Grid } from "@nextui-org/react";
import SideBar from "@/src/components/modules/admin/sidebar";

const EditProductPage = ({ website, data }) => {
    return (
        <Page>
            <Container xl>
                <Grid.Container gap={2}>
                    <Grid xs={12} md={3} >
                        <SideBar selected="products" />
                    </Grid>
                    <Grid xs={12} md={9}>
                        <AddProduct website={website} data={data} />
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
            website: await Get(`/${ctx?.locale}/website`).then(r => r.data).catch(() => ({})),
            data: await Get(`/${ctx?.locale}/products/product/${ctx.params._id}?withBrand=true`).then(r => r.data).catch(() => ({}))
        }
    }
}

export default EditProductPage
