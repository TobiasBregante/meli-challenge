import Page from "@Page";
import SignUpModule from "@/src/components/modules/user/auth/signup";

const SignUpPage = () => {
    return (
        <Page title="SaladaApp - Registrarse" >
            <SignUpModule/>
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
