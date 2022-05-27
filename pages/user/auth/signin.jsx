import Page from "@Page";
import SignInModule from "@/src/components/modules/user/auth/signin";

const SignInPage = () => {
    return (
        <Page>
            <SignInModule/>
        </Page>
    )
}


//CACHE PAGE
export async function getStaticProps(ctx){
    return {
        props:{}
    }
}

export default SignInPage
