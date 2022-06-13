import Page from "@Page";
import ClaimBrand from "@/src/components/modules/user/auth/claimBrand";

const SignUpPage = () => {
    return (
        <Page title="SaladaApp - Reclamar puesto" >
            <ClaimBrand/>
        </Page>
    )
}


//CACHE PAGE
export async function getStaticProps(ctx){
    return {
        props:{}
    }
}

export default SignUpPage
