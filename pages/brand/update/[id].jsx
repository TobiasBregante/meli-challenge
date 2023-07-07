import Page from "@Page";
import UpdateBrand from "@/src/components/updateBrand";
import Get from "@/src/utils/hooks/get";

const UpdateBrandPage = ({ website, data }) => {
    return (
        <Page title="SaladaApp - Reclamar puesto" >
            <UpdateBrand website={ website } data={data}/>
        </Page>
    )
}

//CACHE PAGE
export async function getServerSideProps(ctx){
    return {
        props:{
            website: await Get(`/${ctx?.locale}/website`).then(r => r.data).catch(() => ({ })),
            data: await Get(`/${ctx?.locale}/brands/brand/${ctx.params.id}?withProducts=true`).then(r => r.data).catch(err => err.response.data),
        }
    }
}

export default UpdateBrandPage
