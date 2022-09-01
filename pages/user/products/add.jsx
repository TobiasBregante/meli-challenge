import Page from "@Page";
import AddProduct from "@/src/components/modules/user/product/add";
import Get from "@/src/utils/hooks/get";

const AddProductPage = ({ website }) => {
    return (
        <Page title="SaladaApp - Añadir producto" >
            <AddProduct website={ website }/>
        </Page>
    )
}


//CACHE PAGE
export async function getStaticProps(ctx){

    return {
        props:{
            website:await Get("website").then(r => r.data).catch(() => ({ }))
        }
    }
}

export default AddProductPage
