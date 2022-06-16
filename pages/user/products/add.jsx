import Page from "@Page";
import AddProduct from "@/src/components/modules/user/product/add";

const AddProductPage = () => {
    return null
    return (
        <Page title="SaladaApp - Reclamar puesto" >
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
