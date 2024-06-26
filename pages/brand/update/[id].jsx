import Page from "@Page";
import UpdateBrand from "@/src/components/updateBrand";
import Get from "@/src/utils/hooks/get";

const UpdateBrandPage = ({ data }) => {
    return (
        <Page title="Iwarket - Reclamar puesto" >
            <UpdateBrand data={data}/>
        </Page>
    )
}

//CACHE PAGE
export async function getServerSideProps(ctx){
    return {
        props:{
            data: await Get(`/${ctx?.locale}/brands/brand/${ctx.params.id}?withProducts=true`).then(r => r.data).catch(err => err.response.data),
        }
    }
}

export default UpdateBrandPage
