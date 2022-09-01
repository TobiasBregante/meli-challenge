import Page from "@Page";
import AddProduct from "@/src/components/modules/user/product/add";

const AddProductPage = () => {
    return (
        <Page title="SaladaApp - Añadir producto" >
            <AddProduct/>
        </Page>
    )
}


//CACHE PAGE
export async function getStaticProps(ctx){
    return {
        props:{}
    }
}

export default AddProductPage
