import Page from "@Page";
import ClaimBrand from "@/src/components/modules/user/auth/claimBrand";
import Get from "@/src/utils/hooks/get";

const SignUpPage = ({ website }) => {
    return (
        <Page title="Iwarket - Reclamar puesto" >
            <ClaimBrand website={ website }/>
        </Page>
    )
}


//CACHE PAGE
export async function getStaticProps(ctx){
    return {
        props:{
            website: await Get(`/${ctx?.locale}/website`).then(r => r.data).catch(() => ({ }))
        }
    }
}

export default SignUpPage
