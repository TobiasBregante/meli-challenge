import Page from "@Page";
import ClaimPositionModule from "@/src/components/modules/user/auth/claimPosition";

const SignUpPage = () => {
    return (
        <Page title="SaladaApp - Reclamar puesto" >
            <ClaimPositionModule/>
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
